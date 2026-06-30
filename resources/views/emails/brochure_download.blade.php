<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Brochure Request</title>
</head>
<body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px; color: #334155;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #1a365d; padding: 30px; text-align: center;">
            <h1 style="color: #fdc72f; margin: 0; font-size: 24px; font-weight: 700;">Versatile Education</h1>
        </div>
        
        <div style="padding: 40px;">
            <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 600;">Hello there!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                Thank you for your interest in our <strong style="color: #1a365d;">{{ $course->name }}</strong> program. We are thrilled to help you take the next step in your educational journey!
            </p>

            @if ($course->brochure_file)
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
                    <p style="margin: 0; color: #166534; font-weight: 500;">
                        <span style="font-size: 20px; display: block; margin-bottom: 8px;">📄</span>
                        Please find your requested brochure securely attached to this email.
                    </p>
                </div>
            @else
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin: 24px 0;">
                    <p style="margin: 0; color: #1e40af; font-weight: 500; text-align: center;">
                        We have successfully received your inquiry!
                    </p>
                    <p style="margin: 10px 0 0; color: #3b82f6; font-size: 14px; text-align: center;">
                        Our admissions team is currently reviewing your request and will reach out to you shortly with comprehensive details about the program.
                    </p>
                </div>
            @endif

            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-top: 30px;">
                If you have any immediate questions, feel free to reply to this email or contact our support team.
            </p>

            <p style="font-size: 15px; color: #0f172a; margin-top: 30px; font-weight: 600;">
                Best regards,<br>
                <span style="font-weight: 400; color: #64748b;">The Admissions Team</span>
            </p>
        </div>

        <div style="background-color: #f8fafc; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">&copy; {{ date('Y') }} Versatile Education. All rights reserved.</p>
            <div style="margin-top: 10px;">
                <a href="{{ url('/') }}" style="color: #94a3b8; text-decoration: underline;">Visit our website</a>
            </div>
        </div>
    </div>
</body>
</html>
