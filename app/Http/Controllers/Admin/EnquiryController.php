<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Course;

class EnquiryController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'brochure_download');

        $query = Enquiry::with('course')
            ->where('type', $type);

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('phone', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $enquiries = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => $enquiries,
            'activeTab' => $type,
            'courses' => Course::active()->get(['id', 'name']),
            'filters' => $request->only(['search', 'course_id', 'date']),
        ]);
    }

    public function destroy(Enquiry $enquiry)
    {
        $enquiry->delete();

        return back()->with('success', 'Enquiry deleted successfully.');
    }
}
