<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function updateGeneral(Request $request)
    {
        $request->validate([
            'institutionName' => 'nullable|string|max:255',
            'supportEmail' => 'nullable|email|max:255',
            'defaultTimezone' => 'nullable|string',
            'academicYear' => 'nullable|string',
            'contactNumber' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:1000',
            'mapEmbedCode' => 'nullable|string',
            'facebookLink' => 'nullable|string|max:255',
            'twitterLink' => 'nullable|string|max:255',
            'instagramLink' => 'nullable|string|max:255',
            'linkedinLink' => 'nullable|string|max:255',
        ]);

        $settings = $request->only([
            'institutionName', 'supportEmail', 'defaultTimezone', 'academicYear',
            'contactNumber', 'address', 'mapEmbedCode', 'facebookLink', 'twitterLink', 'instagramLink', 'linkedinLink'
        ]);

        foreach ($settings as $key => $value) {
            if ($value !== null) {
                Setting::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }

        return redirect()->back()->with('success', 'General settings updated successfully.');
    }

    public function updateChat(Request $request)
    {
        $request->validate([
            'chat_type' => 'nullable|string|in:whatsapp,bot,tawkto',
            'whatsapp_number' => 'nullable|string|max:20',
            'tawkto_property_id' => 'nullable|string|max:255',
            'tawkto_widget_id' => 'nullable|string|max:255',
        ]);

        $settings = $request->only(['chat_type', 'whatsapp_number', 'tawkto_property_id', 'tawkto_widget_id']);

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        return redirect()->back()->with('success', 'Chat settings updated successfully.');
    }

    public function updateAppearance(Request $request)
    {
        $request->validate([
            'theme' => 'nullable|string',
            'sidebarColor' => 'nullable|string',
            'buttonColor' => 'nullable|string',
            'fontFamily' => 'nullable|string',
            'borderRadius' => 'nullable|string',
            'header_logo' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'sidebar_logo' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'favicon' => 'nullable|mimes:jpeg,png,jpg,svg,ico|max:1024',
        ]);

        if ($request->has('theme')) {
            Setting::updateOrCreate(['key' => 'theme'], ['value' => $request->theme]);
        }

        if ($request->has('sidebarColor')) {
            Setting::updateOrCreate(['key' => 'sidebarColor'], ['value' => $request->sidebarColor]);
        }

        if ($request->has('buttonColor')) {
            Setting::updateOrCreate(['key' => 'buttonColor'], ['value' => $request->buttonColor]);
        }
        
        if ($request->has('fontFamily')) {
            Setting::updateOrCreate(['key' => 'fontFamily'], ['value' => $request->fontFamily]);
        }
        
        if ($request->has('borderRadius')) {
            Setting::updateOrCreate(['key' => 'borderRadius'], ['value' => $request->borderRadius]);
        }

        if ($request->hasFile('header_logo')) {
            $path = $request->file('header_logo')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'header_logo'], ['value' => '/storage/' . $path]);
        }

        if ($request->hasFile('sidebar_logo')) {
            $path = $request->file('sidebar_logo')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'sidebar_logo'], ['value' => '/storage/' . $path]);
        }
        
        if ($request->hasFile('favicon')) {
            $path = $request->file('favicon')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'favicon'], ['value' => '/storage/' . $path]);
        }

        return redirect()->back()->with('success', 'Appearance updated successfully.');
    }

    public function updateRecaptcha(Request $request)
    {
        $request->validate([
            'recaptcha_enabled'    => 'nullable|in:0,1',
            'recaptcha_site_key'   => 'nullable|string|max:255',
            'recaptcha_secret_key' => 'nullable|string|max:255',
        ]);

        // Save enabled state (checkbox sends '1', absent means '0')
        Setting::updateOrCreate(
            ['key' => 'recaptcha_enabled'],
            ['value' => $request->input('recaptcha_enabled', '0')]
        );

        // Save site key (always, even if empty — lets admin clear it)
        Setting::updateOrCreate(
            ['key' => 'recaptcha_site_key'],
            ['value' => $request->input('recaptcha_site_key', '')]
        );

        // Save secret key only if a value was submitted (prevents clearing on masked display)
        if ($request->filled('recaptcha_secret_key')) {
            Setting::updateOrCreate(
                ['key' => 'recaptcha_secret_key'],
                ['value' => $request->input('recaptcha_secret_key')]
            );
        }

        return redirect()->back()->with('success', 'reCAPTCHA settings saved successfully.');
    }

    public function updateSeo(Request $request)
    {
        $request->validate([
            'seo_meta_title'       => 'nullable|string|max:255',
            'seo_meta_description' => 'nullable|string|max:1000',
            'seo_meta_keywords'    => 'nullable|string|max:1000',
            'seo_meta_author'      => 'nullable|string|max:255',
        ]);

        $settings = $request->only([
            'seo_meta_title', 'seo_meta_description', 'seo_meta_keywords', 'seo_meta_author'
        ]);

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        return redirect()->back()->with('success', 'SEO settings saved successfully.');
    }

}

