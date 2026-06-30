<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    /**
     * Check if reCAPTCHA is enabled in admin settings.
     */
    public static function isEnabled(): bool
    {
        return Setting::where('key', 'recaptcha_enabled')->value('value') === '1';
    }

    /**
     * Verify a reCAPTCHA token against Google's siteverify API.
     * Returns true if valid, or if reCAPTCHA is disabled.
     */
    public static function verify(?string $token): bool
    {
        if (!static::isEnabled()) {
            return true; // reCAPTCHA is off — always pass
        }

        if (empty($token)) {
            return false;
        }

        $secretKey = Setting::where('key', 'recaptcha_secret_key')->value('value');

        if (empty($secretKey)) {
            Log::warning('reCAPTCHA is enabled but no secret key is configured.');
            return false;
        }

        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => $secretKey,
                'response' => $token,
                'remoteip' => request()->ip(),
            ]);

            $data = $response->json();

            if (!$data['success']) {
                Log::info('reCAPTCHA verification failed.', $data['error-codes'] ?? []);
            }

            return (bool) ($data['success'] ?? false);
        } catch (\Exception $e) {
            Log::error('reCAPTCHA HTTP error: ' . $e->getMessage());
            return false;
        }
    }
}
