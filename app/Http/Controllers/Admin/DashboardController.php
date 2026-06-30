<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Program;
use App\Models\Course;
use App\Models\Application;
use App\Models\Enquiry;
use App\Models\Banner;
use App\Models\Popup;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'programs' => Program::count(),
            'courses' => Course::count(),
            'applications' => Application::count(),
            'enquiries' => Enquiry::count(),
            'banners' => Banner::count(),
            'popups' => Popup::count(),
            'users' => User::count(),
            'roles' => Role::count(),
        ];

        // Application stats
        $applicationStats = [
            'total' => Application::count(),
            'today' => Application::whereDate('created_at', Carbon::today())->count(),
            'this_week' => Application::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'this_month' => Application::whereMonth('created_at', Carbon::now()->month)->whereYear('created_at', Carbon::now()->year)->count(),
        ];

        // Enquiry stats
        $enquiryStats = [
            'total' => Enquiry::count(),
            'today' => Enquiry::whereDate('created_at', Carbon::today())->count(),
            'this_week' => Enquiry::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'this_month' => Enquiry::whereMonth('created_at', Carbon::now()->month)->whereYear('created_at', Carbon::now()->year)->count(),
            'brochure_downloads' => Enquiry::where('type', 'brochure_download')->count(),
            'contact_requests' => Enquiry::where('type', 'contact_request')->count(),
        ];

        // Fetch recent records
        $recentApplications = Application::with('course')->latest()->take(5)->get();
        $recentEnquiries = Enquiry::with('course')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard/Index', [
            'metrics' => $metrics,
            'applicationStats' => $applicationStats,
            'enquiryStats' => $enquiryStats,
            'recentApplications' => $recentApplications,
            'recentEnquiries' => $recentEnquiries,
        ]);
    }
}
