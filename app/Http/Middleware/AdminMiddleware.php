<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->is_admin) {
            
            // Check maintenance mode for non-Admin roles (e.g. Editor)
            try {
                $maintenanceMode = \App\Models\Setting::where('key', 'maintenance_mode')->value('value');
                if ($maintenanceMode == 1 && !auth()->user()->hasRole('Admin')) {
                    auth()->logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                    
                    return redirect()->route('admin.login.get')->withErrors([
                        'email' => 'System is under maintenance. Only Administrators can log in.',
                    ]);
                }
            } catch (\Exception $e) {
                // Ignore if settings table doesn't exist
            }

            return $next($request);
        }

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return redirect()->route('admin.login.get');
    }
}
