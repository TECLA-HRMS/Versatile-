<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Program;
use App\Models\Course;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::active()
            ->with(['courses' => function ($query) {
                $query->active()->ordered();
            }])
            ->ordered()
            ->get();

        return Inertia::render('Program/Index', [
            'programs' => $programs
        ]);
    }

    public function show($programSlug, $courseSlug)
    {
        $program = Program::where('slug', $programSlug)->active()->firstOrFail();
        
        $course = Course::where('program_id', $program->id)
            ->where('slug', $courseSlug)
            ->active()
            ->firstOrFail();

        return Inertia::render('Program/Details', [
            'program' => $program,
            'course' => $course
        ]);
    }
}
