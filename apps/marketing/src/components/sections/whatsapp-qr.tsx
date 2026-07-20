"use client";

import { QRCodeSVG } from "qrcode.react";

/** WhatsApp QR for desktop visitors. High-contrast for reliable scanning. */
export function WhatsappQr({ value }: { value: string }) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <QRCodeSVG value={value} size={132} bgColor="#ffffff" fgColor="#13283F" />
    </div>
  );
}
