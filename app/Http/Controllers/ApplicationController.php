<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'name2' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'gender' => 'required|string',
            'course_id' => 'required|exists:courses,id',
            'undergrad_degree' => 'required|string|max:255',
            'undergrad_university' => 'required|string|max:255',
            'undergrad_cgpa' => 'required|string|max:50',
            'work_experience' => 'nullable|numeric|min:0',
            'file-upload' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:5120',
        ];

        $recaptchaEnabled = \App\Models\Setting::where('key', 'recaptcha_enabled')->value('value');
        if ($recaptchaEnabled == '1') {
            $rules['g-recaptcha-response'] = ['required', function ($attribute, $value, $fail) {
                $secret = \App\Models\Setting::where('key', 'recaptcha_secret_key')->value('value');
                $response = \Illuminate\Support\Facades\Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret' => $secret,
                    'response' => $value,
                ]);
                if (!$response->json('success')) {
                    $fail('The reCAPTCHA validation failed. Please try again.');
                }
            }];
        }

        $validated = $request->validate($rules);

        $filePath = null;
        if ($request->hasFile('file-upload')) {
            $filePath = $request->file('file-upload')->store('applications', 'public');
        }

        $application = Application::create([
            'first_name' => $validated['name'],
            'last_name' => $validated['name2'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'gender' => $validated['gender'],
            'course_id' => $validated['course_id'],
            'undergrad_degree' => $validated['undergrad_degree'],
            'undergrad_university' => $validated['undergrad_university'],
            'undergrad_cgpa' => $validated['undergrad_cgpa'],
            'work_experience' => $validated['work_experience'],
            'document_path' => $filePath,
        ]);

        $course = \App\Models\Course::find($validated['course_id']);
        $adminEmails = \App\Models\NotificationEmail::where('is_active', true)->pluck('email');
        if ($adminEmails->count() > 0) {
            \Illuminate\Support\Facades\Mail::to($adminEmails)->send(new \App\Mail\AdminNotificationMail('New Application Submitted', [
                'Applicant Name' => $application->first_name . ' ' . $application->last_name,
                'Email Address' => $application->email,
                'Phone Number' => $application->phone,
                'Course' => $course ? $course->name : 'N/A',
                'Degree' => $application->undergrad_degree,
                'CGPA' => $application->undergrad_cgpa,
                'Date' => $application->created_at->toDateTimeString()
            ]));
        }

        return back()->with('success', 'Your application has been submitted successfully!');
    }
}
