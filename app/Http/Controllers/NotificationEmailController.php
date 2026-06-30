<?php

namespace App\Http\Controllers;

use App\Models\NotificationEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationEmailController extends Controller
{
    public function index(Request $request)
    {
        $query = NotificationEmail::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $emails = $query->latest()->get(); // Using get instead of paginate as it's probably a short list
        return Inertia::render('Admin/NotificationEmails/Index', [
            'emails' => $emails,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:notification_emails,email|max:255',
            'is_active' => 'boolean',
        ]);

        NotificationEmail::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_active' => $request->has('is_active') ? $validated['is_active'] : true,
        ]);

        return back()->with('success', 'Email added successfully.');
    }

    public function update(Request $request, NotificationEmail $notificationEmail)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:notification_emails,email,' . $notificationEmail->id,
            'is_active' => 'boolean',
        ]);

        $notificationEmail->update($validated);

        return back()->with('success', 'Email updated successfully.');
    }

    public function destroy(NotificationEmail $notificationEmail)
    {
        $notificationEmail->delete();
        return back()->with('success', 'Email removed successfully.');
    }
}
