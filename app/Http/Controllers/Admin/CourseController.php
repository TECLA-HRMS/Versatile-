<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Program;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with('program')->ordered();
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('program_id') && $request->program_id !== '') {
            $query->where('program_id', $request->program_id);
        }

        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $courses = $query->paginate(10)->withQueryString();
        $programs = Program::select('id', 'name')->get();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'programs' => $programs,
            'filters' => $request->only(['search', 'program_id', 'status'])
        ]);
    }

    public function create()
    {
        $programs = Program::active()->get();
        return Inertia::render('Admin/Courses/Create', [
            'programs' => $programs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:courses',
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:5120',
            'stats' => 'nullable|array',
            'competencies' => 'nullable|array',
            'advantages' => 'nullable|array',
            'eligibility' => 'nullable|array',
            'entrance_test' => 'nullable|array',
            'placements' => 'nullable|array',
            'brochure_file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'university_name' => 'nullable|string',
            'university_logo' => 'nullable|image|max:2048',
            'duration' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('university_logo')) {
            $path = $request->file('university_logo')->store('university_logos', 'public');
            $validated['university_logo'] = '/storage/' . $path;
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('course_banners', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('course_thumbnails', 'public');
            $validated['thumbnail'] = '/storage/' . $path;
        }

        if ($request->hasFile('brochure_file')) {
            $path = $request->file('brochure_file')->store('course_brochures', 'public');
            $validated['brochure_file'] = '/storage/' . $path;
        }

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        $programs = Program::active()->get();
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'programs' => $programs
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:courses,slug,' . $course->id,
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'stats' => 'nullable|array',
            'competencies' => 'nullable|array',
            'advantages' => 'nullable|array',
            'eligibility' => 'nullable|array',
            'entrance_test' => 'nullable|array',
            'placements' => 'nullable|array',
            'university_name' => 'nullable|string',
            'duration' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if ($request->hasFile('university_logo')) {
            $request->validate(['university_logo' => 'image|max:2048']);
            $path = $request->file('university_logo')->store('university_logos', 'public');
            $validated['university_logo'] = '/storage/' . $path;
        } else {
            unset($validated['university_logo']);
        }

        if ($request->hasFile('banner_image')) {
            $request->validate(['banner_image' => 'image|max:5120']);
            $path = $request->file('banner_image')->store('course_banners', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_image']);
        }

        if ($request->hasFile('thumbnail')) {
            $request->validate(['thumbnail' => 'image|max:5120']);
            $path = $request->file('thumbnail')->store('course_thumbnails', 'public');
            $validated['thumbnail'] = '/storage/' . $path;
        } else {
            unset($validated['thumbnail']);
        }

        if ($request->hasFile('brochure_file')) {
            $request->validate(['brochure_file' => 'file|mimes:pdf,doc,docx|max:10240']);
            $path = $request->file('brochure_file')->store('course_brochures', 'public');
            $validated['brochure_file'] = '/storage/' . $path;
        } else {
            unset($validated['brochure_file']);
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $course->update($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function toggleStatus(Course $course)
    {
        $course->update(['is_active' => !$course->is_active]);
        return redirect()->back()->with('success', 'Course status updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}
