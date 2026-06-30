<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Database\Eloquent\Model::preventLazyLoading(!app()->isProduction());

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = \App\Models\Setting::whereIn('key', [
                    'mail_mailer', 'mail_host', 'mail_port', 'mail_username', 'mail_password', 'mail_encryption', 'institutionName'
                ])->pluck('value', 'key')->toArray();

                if (!empty($settings['mail_host'])) {
                    config([
                        'mail.default' => $settings['mail_mailer'] ?? 'smtp',
                        'mail.mailers.smtp.host' => $settings['mail_host'],
                        'mail.mailers.smtp.port' => $settings['mail_port'] ?? 2525,
                        'mail.mailers.smtp.encryption' => (isset($settings['mail_encryption']) && $settings['mail_encryption'] !== 'none') ? $settings['mail_encryption'] : null,
                        'mail.mailers.smtp.username' => $settings['mail_username'] ?? '',
                        'mail.mailers.smtp.password' => $settings['mail_password'] ?? '',
                        'mail.from.address' => $settings['mail_username'] ?? config('mail.from.address'),
                        'mail.from.name' => $settings['institutionName'] ?? config('mail.from.name'),
                    ]);
                }
            }
        } catch (\Exception $e) {
            // Ignore if DB is not ready (e.g. during migrations)
        }
    }
}
