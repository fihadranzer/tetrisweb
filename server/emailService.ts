import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.setupTransporter();
  }

  private setupTransporter() {
    const emailConfig = this.getEmailConfig();

    if (!emailConfig) {
      console.log('📧 Email service not configured - using console logging for development');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure, // false for 587, true for 465
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
      tls: {
        rejectUnauthorized: false, // allow Gmail STARTTLS handshake
      },
    });

    this.isConfigured = true;
    console.log(`📧 Email service configured: ${emailConfig.host}:${emailConfig.port} as ${emailConfig.user}`);
  }

  private getEmailConfig(): EmailConfig | null {
    const requiredEnvVars = [
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASSWORD',
      'SMTP_FROM',
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      console.log(`📧 Missing email configuration: ${missingVars.join(', ')}`);
      return null;
    }

    return {
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: process.env.SMTP_PORT === '465', // Gmail: false for 587, true for 465
      user: process.env.SMTP_USER!,
      password: process.env.SMTP_PASSWORD!,
      from: process.env.SMTP_FROM!,
    };
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    if (!this.isConfigured || !this.transporter) {
      console.log(
        `🔐 Verification code for ${email}: ${code} (expires in 10 minutes)`
      );
      return true;
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM!,
        to: email,
        subject: 'Pi Tetris Admin - Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0;">Pi Tetris</h1>
              <p style="color: #6b7280; margin: 5px 0;">Admin Panel Access</p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 8px; padding: 30px; text-align: center;">
              <h2 style="color: #1f2937; margin-top: 0;">Verification Code</h2>
              <p style="color: #6b7280; margin-bottom: 30px;">Enter this code to access the admin panel:</p>
              
              <div style="background: white; border: 2px dashed #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 4px;">${code}</span>
              </div>
              
              <p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">
                This code will expire in <strong>10 minutes</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`📧 Verification code sent to ${email} :: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('📧 Failed to send email:', error);
      console.log(
        `🔐 Email failed - Verification code for ${email}: ${code} (expires in 10 minutes)`
      );
      return true; // fallback: console still shows code
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('📧 Email service connection verified ✅');
      return true;
    } catch (error) {
      console.error('📧 Email service connection failed ❌:', error);
      return false;
    }
  }
}

let emailService: EmailService;

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = new EmailService();
  }
  return emailService;
}
