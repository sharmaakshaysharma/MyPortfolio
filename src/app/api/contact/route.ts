import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting map: ip -> { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per 10 minutes

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();

    const clientRate = rateLimitMap.get(ip);
    if (clientRate) {
      if (now < clientRate.resetAt) {
        if (clientRate.count >= MAX_REQUESTS_PER_WINDOW) {
          const retryAfterSec = Math.ceil((clientRate.resetAt - now) / 1000);
          return NextResponse.json(
            {
              error: `Rate limit exceeded. Please wait ${retryAfterSec} seconds before sending another message.`,
            },
            {
              status: 429,
              headers: { "Retry-After": retryAfterSec.toString() },
            }
          );
        }
        clientRate.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse payload
    const body = await request.json();
    const { name, email, subject, message, hp_website } = body;

    // Honeypot spam check: If the hidden honeypot field has a value, silently reject bot
    if (hp_website && hp_website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Your message has been processed." },
        { status: 200 }
      );
    }

    // 3. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message or name exceeds allowable length." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 4. Sanitize inputs
    const safeName = escapeHtml(name.trim());
    const safeEmail = email.trim();
    const safeSubject = escapeHtml(subject ? subject.trim() : "General Inquiry");
    const safeMessage = escapeHtml(message.trim());

    // 5. SMTP credentials
    const smtpUser = process.env.SMTP_USER || "devshadow5736@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "hwwh lpmq ltyc vlyd";
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "akshaysharma38256@gmail.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${safeName} via Portfolio" <${smtpUser}>`,
      to: recipient,
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject} - ${safeName}`,
      text: `New Portfolio Inquiry\n\nName: ${safeName}\nEmail: ${safeEmail}\nSubject: ${safeSubject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0d14; color: #f1f5f9; border: 1px solid #1e2433; border-radius: 12px; padding: 24px;">
          <div style="border-bottom: 1px solid #1e2433; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 4px 10px; border-radius: 9999px;">
              New Direct Portfolio Message
            </span>
            <h2 style="font-size: 20px; font-weight: bold; margin: 12px 0 0 0; color: #ffffff;">
              ${safeSubject}
            </h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; width: 80px; font-family: monospace;">From:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; font-family: monospace;">Email:</td>
              <td style="padding: 6px 0; color: #38bdf8;"><a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a></td>
            </tr>
          </table>

          <div style="background-color: #121622; border: 1px solid #1e2433; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
            <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
              Message Content
            </div>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">
              ${safeMessage}
            </p>
          </div>

          <div style="font-size: 11px; font-family: monospace; color: #64748b; border-top: 1px solid #1e2433; padding-top: 14px;">
            Dispatched via Akshay Sharma Portfolio Contact Gateway &bull; Direct Reply-To configured for ${safeEmail}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Your message has been delivered to Akshay." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("SMTP Error in /api/contact:", error);
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again or use direct mailto.",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
