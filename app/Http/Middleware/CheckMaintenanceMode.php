<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Try to check if we are in maintenance mode through the settings table.
        // We use try-catch in case the database isn't ready.
        try {
            $maintenanceMode = Setting::where('key', 'maintenance_mode')->value('value');

            if ($maintenanceMode === '1') {
                // If it's an admin route or login, allow it to pass.
                if (!$request->is('admin*') && !$request->routeIs('admin.*')) {
                    // For API or non-inertia requests we might want to return JSON,
                    // but for this app we'll return the Inertia view.
                    return Inertia::render('Error/Maintenance')
                        ->toResponse($request)
                        ->setStatusCode(503);
                }
            }
        } catch (\Exception $e) {
            // Do nothing if settings table doesn't exist yet
        }

        return $next($request);
    }
}
