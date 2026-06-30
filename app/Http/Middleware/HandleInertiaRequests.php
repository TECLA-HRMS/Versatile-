<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = \App\Models\Setting::pluck('value', 'key')->toArray();

        // Ensure logos resolve correctly in subfolder deployments
        $imageKeys = ['header_logo', 'sidebar_logo', 'favicon', 'footer_logo', 'sidebar_collapsed_logo'];
        foreach ($imageKeys as $imgKey) {
            if (!empty($settings[$imgKey]) && str_starts_with($settings[$imgKey], '/storage/')) {
                // asset() expects paths without leading slashes to append to the base APP_URL properly
                $settings[$imgKey] = asset(ltrim($settings[$imgKey], '/'));
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'roles' => $request->user()->getRoleNames(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name'),
                ]) : null,
            ],
            'settings' => $settings,
            'sharedPrograms' => \App\Models\Program::active()->with(['courses' => function ($query) {
                $query->active()->ordered();
            }])->ordered()->get(),
            'sitePopup' => \App\Models\Popup::where('is_active', true)->first(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
