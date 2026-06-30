<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Program;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::withCount('courses')->ordered();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $programs = $query->paginate(10)->withQueryString();
        
        return Inertia::render('Admin/Programs/Index', [
            'programs' => $programs,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Programs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:programs',
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'level' => 'nullable|string',
            'format' => 'nullable|string',
            'duration' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        Program::create($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Program created successfully.');
    }

    public function edit(Program $program)
    {
        return Inertia::render('Admin/Programs/Edit', [
            'program' => $program
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:programs,slug,' . $program->id,
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'level' => 'nullable|string',
            'format' => 'nullable|string',
            'duration' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $program->update($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Program updated successfully.');
    }

    public function toggleStatus(Program $program)
    {
        $program->update(['is_active' => !$program->is_active]);
        return redirect()->back()->with('success', 'Program status updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('admin.programs.index')->with('success', 'Program deleted successfully.');
    }
}
