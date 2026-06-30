<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;

Route::get('/', function () {
    $banners = \App\Models\Banner::where('is_active', true)->orderBy('order')->get();
    $courses = \App\Models\Course::active()->with('program')->take(6)->get();
    return Inertia::render('Home/Index', [
        'banners' => $banners,
        'courses' => $courses
    ]);
})->name('home');


Route::get('/how-to-apply', function () {
    return Inertia::render('Admission/Index', [
        'courses' => \App\Models\Course::active()->get()
    ]);
})->name('admission');

Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about');

Route::get('/terms-and-conditions', function () {
    return Inertia::render('Terms/Index');
})->name('terms');

Route::get('/privacy-policy', function () {
    return Inertia::render('Privacy/Index');
})->name('privacy');

Route::get('/contact', function () {
    $courses = \App\Models\Course::active()->get(['id', 'name']);
    return Inertia::render('Contact/Index', ['courses' => $courses]);
})->name('contact');
Route::post('/contact', [\App\Http\Controllers\EnquiryController::class, 'storeContact'])->name('contact.store');
Route::post('/enquiry/chat', [\App\Http\Controllers\EnquiryController::class, 'storeChatLead'])->name('enquiry.chat');

Route::get('/apply-now', function () {
    $courses = \App\Models\Course::active()->get(['id', 'name']);
    return Inertia::render('ApplyNow/Index', ['courses' => $courses]);
})->name('apply-now');
Route::post('/apply-now', [\App\Http\Controllers\ApplicationController::class, 'store'])->name('application.store');

Route::get('/placements', function () {
    return Inertia::render('Placement/Index');
})->name('placements');

Route::get('/program', [\App\Http\Controllers\ProgramController::class, 'index'])->name('program.index');
Route::get('/program/{programSlug}/{courseSlug}', [\App\Http\Controllers\ProgramController::class, 'show'])->name('program.show');

Route::post('/enquiry/brochure', [\App\Http\Controllers\EnquiryController::class, 'storeBrochure'])->name('enquiry.brochure');

// Admin Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login.get');
    Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
    
    // Password Reset Routes
    Route::get('/admin/forgot-password', [\App\Http\Controllers\Admin\AdminPasswordResetController::class, 'create'])->name('admin.password.request');
    Route::post('/admin/forgot-password', [\App\Http\Controllers\Admin\AdminPasswordResetController::class, 'store'])->name('admin.password.email');
    Route::get('/admin/reset-password/{token}', [\App\Http\Controllers\Admin\AdminPasswordResetController::class, 'edit'])->name('password.reset');
    Route::post('/admin/reset-password', [\App\Http\Controllers\Admin\AdminPasswordResetController::class, 'update'])->name('admin.password.update');
});

Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

// Protected Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    
    // Dashboard – accessible to anyone with 'view dashboard'
    Route::middleware('can:view dashboard')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
    });

    // Profile – always accessible to logged-in admins (no special permission needed)
    Route::get('/profile', [\App\Http\Controllers\Admin\ProfileController::class, 'index'])->name('admin.profile');
    Route::put('/profile/password', [\App\Http\Controllers\Admin\ProfileController::class, 'updatePassword'])->name('admin.profile.password');
    Route::post('/profile/update', [\App\Http\Controllers\Admin\ProfileController::class, 'updateProfile'])->name('admin.profile.update');

    // Settings – requires 'manage settings'
    Route::middleware('can:manage settings')->group(function () {
        Route::get('/settings', function () {
            return Inertia::render('Admin/Settings/Index', [
                'env_mail' => [
                    'mail_mailer' => config('mail.default'),
                    'mail_host' => config('mail.mailers.smtp.host'),
                    'mail_port' => config('mail.mailers.smtp.port'),
                    'mail_username' => config('mail.mailers.smtp.username'),
                    'mail_password' => config('mail.mailers.smtp.password') ? '********' : '',
                    'mail_encryption' => config('mail.mailers.smtp.encryption'),
                ]
            ]);
        })->name('admin.settings');
        
        Route::post('/settings/general', [\App\Http\Controllers\Admin\SettingController::class, 'updateGeneral'])->name('admin.settings.general');
        Route::post('/settings/appearance', [\App\Http\Controllers\Admin\SettingController::class, 'updateAppearance'])->name('admin.settings.appearance');
        Route::post('/settings/maintenance', [\App\Http\Controllers\Admin\SettingController::class, 'updateMaintenance'])->name('admin.settings.maintenance');
        Route::post('/settings/email', [\App\Http\Controllers\Admin\SettingController::class, 'updateEmail'])->name('admin.settings.email');
        Route::post('/settings/email/test', [\App\Http\Controllers\Admin\SettingController::class, 'testEmail'])->name('admin.settings.email.test');
        Route::post('/settings/recaptcha', [\App\Http\Controllers\Admin\SettingController::class, 'updateRecaptcha'])->name('admin.settings.recaptcha');
        Route::post('/settings/chat', [\App\Http\Controllers\Admin\SettingController::class, 'updateChat'])->name('admin.settings.chat');
        Route::post('/settings/seo', [\App\Http\Controllers\Admin\SettingController::class, 'updateSeo'])->name('admin.settings.seo');
    });

    // Activity Logs – requires 'manage settings'
    Route::middleware('can:manage settings')->group(function () {
        Route::get('/activity-logs', [\App\Http\Controllers\Admin\ActivityLogController::class, 'index'])->name('admin.activity-logs.index');
    });

    // Programs – requires 'view programs'
    Route::middleware('can:view programs')->group(function () {
        Route::put('programs/{program}/toggle-status', [\App\Http\Controllers\Admin\ProgramController::class, 'toggleStatus'])->name('programs.toggle-status');
        Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class)->except(['show'])->names('admin.programs');
    });

    // Courses – requires 'view courses'
    Route::middleware('can:view courses')->group(function () {
        Route::put('courses/{course}/toggle-status', [\App\Http\Controllers\Admin\CourseController::class, 'toggleStatus'])->name('courses.toggle-status');
        Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class)->except(['show'])->names('admin.courses');
    });
    
    // Banners – requires 'view banners'
    Route::middleware('can:view banners')->group(function () {
        Route::put('banners/{banner}/toggle-status', [\App\Http\Controllers\Admin\BannerController::class, 'toggleStatus'])->name('banners.toggle-status');
        Route::resource('banners', \App\Http\Controllers\Admin\BannerController::class)->except(['show'])->names('admin.banners');
    });

    // Popups – requires 'view popups'
    Route::middleware('can:view popups')->group(function () {
        Route::put('popups/{popup}/toggle-status', [\App\Http\Controllers\Admin\PopupController::class, 'toggleStatus'])->name('popups.toggle-status');
        Route::resource('popups', \App\Http\Controllers\Admin\PopupController::class)->except(['show'])->names('admin.popups');
    });

    // Enquiries – requires 'view enquiries'
    Route::middleware('can:view enquiries')->group(function () {
        Route::get('/enquiries', [\App\Http\Controllers\Admin\EnquiryController::class, 'index'])->name('admin.enquiries');
    });

    // Applications – requires 'view applications'
    Route::middleware('can:view applications')->group(function () {
        Route::get('/applications', [\App\Http\Controllers\Admin\ApplicationController::class, 'index'])->name('admin.applications');
    });

    // Notification Emails – requires 'manage notification emails'
    Route::middleware('can:manage notification emails')->group(function () {
        Route::get('/notification-emails', [\App\Http\Controllers\NotificationEmailController::class, 'index'])->name('admin.notification-emails.index');
        Route::post('/notification-emails', [\App\Http\Controllers\NotificationEmailController::class, 'store'])->name('admin.notification-emails.store');
        Route::put('/notification-emails/{notificationEmail}', [\App\Http\Controllers\NotificationEmailController::class, 'update'])->name('admin.notification-emails.update');
        Route::delete('/notification-emails/{notificationEmail}', [\App\Http\Controllers\NotificationEmailController::class, 'destroy'])->name('admin.notification-emails.destroy');
    });

    // Roles – requires 'view roles'
    Route::middleware('can:view roles')->group(function () {
        Route::resource('roles', RoleController::class)->names([
            'index' => 'admin.roles.index',
            'create' => 'admin.roles.create',
            'store' => 'admin.roles.store',
            'edit' => 'admin.roles.edit',
            'update' => 'admin.roles.update',
            'destroy' => 'admin.roles.destroy',
        ])->except(['show']);
    });

    // Users – requires 'view users'
    Route::middleware('can:view users')->group(function () {
        Route::resource('users', UserController::class)->names([
            'index' => 'admin.users.index',
            'create' => 'admin.users.create',
            'store' => 'admin.users.store',
            'edit' => 'admin.users.edit',
            'update' => 'admin.users.update',
            'destroy' => 'admin.users.destroy',
        ])->except(['show']);
    });
});



// Fallback route for storage files on restricted servers
Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    return response()->file($filePath);
})->where('path', '.*');
