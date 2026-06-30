<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
</head>
<body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px; color: #334155;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #1a365d; padding: 25px 30px; border-bottom: 4px solid #fdc72f;">
            <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">{{ $title }}</h2>
        </div>
        
        <div style="padding: 30px;">
            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 0; margin-bottom: 24px;">
                A new submission has been received through the website. Here are the details:
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <tbody>
                        @foreach($submissionData as $key => $value)
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <th style="padding: 14px 16px; width: 40%; color: #64748b; font-weight: 500; font-size: 14px; background-color: #f1f5f9; text-transform: capitalize;">
                                    {{ str_replace('_', ' ', $key) }}
                                </th>
                                <td style="padding: 14px 16px; color: #0f172a; font-weight: 500; font-size: 15px;">
                                    {{ $value ?? '-' }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ url('/admin/dashboard') }}" style="background-color: #1a365d; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; display: inline-block;">View in Admin Panel</a>
            </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">This is an automated notification from Versatile Education.</p>
        </div>
    </div>
</body>
</html>
