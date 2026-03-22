// base layout — wraps every email with same header/footer
const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f4f4f5;
      padding: 40px 20px;
      color: #18181b;
    }
    .wrapper {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e4e4e7;
    }
    .header {
      background: #18181b;
      padding: 28px 40px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }
    .body {
      padding: 36px 40px;
    }
    .body p {
      font-size: 15px;
      line-height: 1.7;
      color: #3f3f46;
      margin-bottom: 16px;
    }
    .button {
      display: inline-block;
      background: #18181b;
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 28px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      margin: 8px 0 24px;
    }
    .code-box {
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 16px 0 24px;
    }
    .code-box span {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 8px;
      color: #18181b;
    }
    .divider {
      border: none;
      border-top: 1px solid #e4e4e7;
      margin: 24px 0;
    }
    .footer {
      padding: 20px 40px 28px;
      background: #fafafa;
      border-top: 1px solid #e4e4e7;
    }
    .footer p {
      font-size: 12px;
      color: #a1a1aa;
      line-height: 1.6;
    }
    .warning {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 13px;
      color: #92400e;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>YourApp</h1>
    </div>
    ${content}
    <div class="footer">
      <p>
        This email was sent to you because you have an account with YourApp.<br/>
        If you did not request this, please ignore this email or contact support.
      </p>
    </div>
  </div>
</body>
</html>
`;

// ── Template 1 — Email Verification ──────────────────
const emailVerificationTemplate = ({ name, verificationUrl }) =>
    baseTemplate(`
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        Thanks for signing up! Please verify your email address
        to activate your account.
      </p>
      <a href="${verificationUrl}" class="button">
        Verify Email Address
      </a>
      <hr class="divider"/>
      <p>
        Or copy and paste this link into your browser:
      </p>
      <p style="word-break:break-all; font-size:13px; color:#71717a;">
        ${verificationUrl}
      </p>
      <div class="warning">
        This link expires in <strong>24 hours</strong>.
      </div>
    </div>
  `);

// ── Template 2 — Password Reset ───────────────────────
const passwordResetTemplate = ({ name, resetUrl }) =>
    baseTemplate(`
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        We received a request to reset your password.
        Click the button below to create a new password.
      </p>
      <a href="${resetUrl}" class="button">
        Reset Password
      </a>
      <hr class="divider"/>
      <p>
        Or copy and paste this link into your browser:
      </p>
      <p style="word-break:break-all; font-size:13px; color:#71717a;">
        ${resetUrl}
      </p>
      <div class="warning">
        This link expires in <strong>15 minutes</strong>.
        If you did not request a password reset, ignore this email.
      </div>
    </div>
  `);

// ── Template 3 — Welcome Email ────────────────────────
const welcomeTemplate = ({ name }) =>
    baseTemplate(`
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        Your email has been verified and your account is now active.
        Welcome to YourApp!
      </p>
      <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard"
         class="button">
        Go to Dashboard
      </a>
      <hr class="divider"/>
      <p style="font-size:13px; color:#71717a;">
        If you have any questions, reply to this email
        and we will be happy to help.
      </p>
    </div>
  `);

// ── Template 4 — Login Alert ──────────────────────────
const loginAlertTemplate = ({ name, ip, userAgent, time }) =>
    baseTemplate(`
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        A new login to your account was detected.
        Here are the details:
      </p>
      <div class="code-box" style="text-align:left; padding: 20px 24px;">
        <p style="margin:0 0 8px;">
          <strong>Time:</strong> ${time}
        </p>
        <p style="margin:0 0 8px;">
          <strong>IP Address:</strong> ${ip}
        </p>
        <p style="margin:0;">
          <strong>Device:</strong> ${userAgent}
        </p>
      </div>
      <div class="warning">
        If this was not you, please
        <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password"
           style="color:#92400e;">
          reset your password
        </a>
        immediately.
      </div>
    </div>
  `);

// ── Template 5 — OTP Code ─────────────────────────────
const otpTemplate = ({ name, otp }) =>
    baseTemplate(`
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        Use the code below to verify your identity.
      </p>
      <div class="code-box">
        <span>${otp}</span>
      </div>
      <div class="warning">
        This code expires in <strong>10 minutes</strong>.
        Never share this code with anyone.
      </div>
    </div>
  `);

module.exports = {
    emailVerificationTemplate,
    passwordResetTemplate,
    welcomeTemplate,
    loginAlertTemplate,
    otpTemplate,
};