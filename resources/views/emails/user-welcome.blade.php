<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Versatile Education</title>
</head>
<body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px; color: #334155;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <div style="background-color: #1a365d; padding: 30px; text-align: center;">
            <h1 style="color: #fdc72f; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Versatile Education</h1>
        </div>
        <div style="padding: 40px;">
            <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 600;">Welcome, {{ $user->name }}!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
                An administrator has created an account for you. You now have access to the Versatile Education portal. Below are your secure login credentials.
            </p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 8px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding-bottom: 12px; color: #64748b; font-size: 14px; width: 120px;">Email Address</td>
                        <td style="padding-bottom: 12px; font-weight: 600; color: #0f172a;">{{ $user->email }}</td>
                    </tr>
                    <tr>
                        <td style="color: #64748b; font-size: 14px;">Password</td>
                        <td style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; color: #0f172a; display: inline-block;">{{ $password }}</td>
                    </tr>
                </table>
            </div>

            <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">
                <span style="color: #dc2626; font-weight: 600;">Security Note:</span> We strongly recommend changing your password immediately after your first login.
            </p>

            <div style="text-align: center;">
                <a href="{{ url('/login') }}" style="background-color: #fdc72f; color: #1a365d; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.2s;">Login to Dashboard</a>
            </div>
        </div>
        <div style="background-color: #f8fafc; padding: 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">&copy; {{ date('Y') }} Versatile Education. All rights reserved.</p>
            <p style="margin: 8px 0 0; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>
