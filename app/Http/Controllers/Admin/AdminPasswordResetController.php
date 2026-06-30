<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Str;

class AdminPasswordResetController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create()
    {
        return Inertia::render('Admin/Auth/ForgotPassword');
    }

    /**
     * Handle an incoming password reset link request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // We only want to send reset links to actual admin users.
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['We can\'t find a user with that email address.'],
            ]);
        }

        $status = Password::broker()->sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? back()->with('success', __($status))
                    : back()->withErrors(['email' => __($status)]);
    }

    /**
     * Display the password reset view.
     */
    public function edit(Request $request, $token)
    {
        return Inertia::render('Admin/Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $token,
        ]);
    }

    /**
     * Handle an incoming new password request.
     */
    public function update(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('admin.login.get')->with('success', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}
