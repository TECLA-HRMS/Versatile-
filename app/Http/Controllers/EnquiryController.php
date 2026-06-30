<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Enquiry;
use App\Models\Course;
use Illuminate\Support\Facades\Mail;
use App\Mail\BrochureDownloadMail;
use App\Mail\AdminNotificationMail;
use App\Models\Setting;
use App\Services\RecaptchaService;
use Inertia\Inertia;

class EnquiryController extends Controller
{
    public function storeBrochure(Request $request)
    {
        // Verify reCAPTCHA if enabled
        if (RecaptchaService::isEnabled()) {
            if (!RecaptchaService::verify($request->input('g-recaptcha-response'))) {
                return back()->withErrors([
                    'g-recaptcha-response' => 'reCAPTCHA verification failed. Please tick the checkbox and try again.',
                ])->withInput();
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'course_id' => 'required|exists:courses,id',
        ]);

        $enquiry = Enquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'course_id' => $validated['course_id'],
            'type' => 'brochure_download',
        ]);

        $course = Course::findOrFail($validated['course_id']);

        try {
            Mail::to($enquiry->email)->send(new BrochureDownloadMail($course));

            $adminEmails = \App\Models\NotificationEmail::where('is_active', true)->pluck('email');
            if ($adminEmails->count() > 0) {
                Mail::to($adminEmails)->send(new AdminNotificationMail('New Brochure Download', [
                    'Applicant Name' => $enquiry->name,
                    'Email Address' => $enquiry->email,
                    'Phone Number' => $enquiry->phone,
                    'Course' => $course->name,
                    'Date' => $enquiry->created_at->toDateTimeString()
                ]));
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail error: ' . $e->getMessage());
        }

        return back()->with('success', 'Brochure sent successfully to your email!');
    }

    public function storeContact(Request $request)
    {
        // Verify reCAPTCHA if enabled
        if (RecaptchaService::isEnabled()) {
            if (!RecaptchaService::verify($request->input('g-recaptcha-response'))) {
                return back()->withErrors([
                    'recaptcha' => 'reCAPTCHA verification failed. Please tick the checkbox and try again.',
                ])->withInput();
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'course_id' => 'required|exists:courses,id',
            'message' => 'required|string',
        ]);

        $fullName = trim($validated['name'] . ' ' . ($validated['lastName'] ?? ''));

        $enquiry = Enquiry::create([
            'name' => $fullName,
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? '',
            'course_id' => $validated['course_id'],
            'message' => $validated['message'],
            'type' => 'contact_request',
        ]);

        $course = Course::find($validated['course_id']);
        
        try {
            $adminEmails = \App\Models\NotificationEmail::where('is_active', true)->pluck('email');
            if ($adminEmails->count() > 0) {
                Mail::to($adminEmails)->send(new AdminNotificationMail('New Contact Request', [
                    'Name' => $enquiry->name,
                    'Email Address' => $enquiry->email,
                    'Phone Number' => $enquiry->phone,
                    'Interested Course' => $course ? $course->name : 'N/A',
                    'Message' => $enquiry->message,
                    'Date' => $enquiry->created_at->toDateTimeString()
                ]));
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail error: ' . $e->getMessage());
        }

        return back()->with('success', 'Your message has been sent successfully! We will get back to you soon.');
    }
}
