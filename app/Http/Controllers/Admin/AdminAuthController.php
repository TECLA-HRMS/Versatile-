<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Check if user is admin
            if (Auth::user()->is_admin) {
                
                // Check maintenance mode for non-Admin roles (e.g. Editor)
                try {
                    $maintenanceMode = \App\Models\Setting::where('key', 'maintenance_mode')->value('value');
                    if ($maintenanceMode === '1' && !Auth::user()->hasRole('Admin')) {
                        Auth::logout();
                        $request->session()->invalidate();
                        $request->session()->regenerateToken();
                        
                        return back()->withErrors([
                            'email' => 'System is under maintenance. Only Administrators can log in.',
                        ]);
                    }
                } catch (\Exception $e) {
                    // Ignore if settings table doesn't exist
                }

                return redirect('/admin/dashboard');
            }

            // Not an admin, logout
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email' => 'You do not have administrative access.',
            ]);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
