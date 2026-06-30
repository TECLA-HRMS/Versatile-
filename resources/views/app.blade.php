<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @php
            $settings = \App\Models\Setting::pluck('value', 'key');
            $favicon = $settings['favicon'] ?? asset('assets/images/logo/logo-v.png');
            $metaTitle = $settings['seo_meta_title'] ?? config('app.name', 'Versatile Business School');
            $metaDesc = $settings['seo_meta_description'] ?? 'Versatile Business School - Offering comprehensive MBA programs integrated with industry experience.';
            $metaKeywords = $settings['seo_meta_keywords'] ?? '';
            $metaAuthor = $settings['seo_meta_author'] ?? '';
        @endphp
        <meta name="description" content="{{ $metaDesc }}">
        @if($metaKeywords)
        <meta name="keywords" content="{{ $metaKeywords }}">
        @endif
        @if($metaAuthor)
        <meta name="author" content="{{ $metaAuthor }}">
        @endif
        <title inertia>{{ $metaTitle }}</title>
        <link rel="shortcut icon" type="image/x-icon" href="{{ $favicon }}">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Prata&display=swap" rel="stylesheet">
        
        <!-- CSS Dependencies -->
        <link rel="stylesheet" href="{{ asset('assets/vendor/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/vendor/animate.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/swiper.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/nice-select.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/flatpickr.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/nouislider.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/vendor/magnific-popup.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/vendor/odometer.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/vendor/spacing.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/vendor/remixicon.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/main.css') }}">
        
        <script>
            window.AppAssetUrl = "{{ asset('') }}";
        </script>
        
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <script defer src="{{ asset('assets/js/vendor/jquery-3.7.1.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/bootstrap.bundle.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/meanmenu.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/swiper.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/wow.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/jarallax.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/magnific-popup.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/isotope.pkgd.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/imagesloaded.pkgd.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/ajax-form.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/lenis.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/gsap.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/rs-anim-int.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/rs-scroll-trigger.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/rs-splitText.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/jquery.appear.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/nice-select.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/flatpickr.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/plugins/nouislider.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/vendor/odometer.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/main.js') }}"></script>
    </body>
</html>
