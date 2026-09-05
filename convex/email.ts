"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import nodemailer from "nodemailer";

export const sendLeadNotification = internalAction({
  args: {
    subject: v.string(),
    body: v.string(),
  },
  returns: v.null(),
  handler: async (_ctx, args) => {
    const host = process.env.SMTP_HOST;
    if (!host) {
      console.warn("SMTP_HOST not set; skipping email");
      return null;
    }
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: "info@bolt-energy.me",
      to: "info@bolt-energy.me",
      subject: args.subject,
      html: args.body,
    });
    return null;
  },
});
