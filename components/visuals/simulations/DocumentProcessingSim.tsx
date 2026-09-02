"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function DocumentProcessingSim() {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Neural OCR & Verification Engine
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          GSTIN & Math Audit: 100% Passed
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: The Physical Scanned Invoice with Laser Scan Beam */}
        <div className="relative overflow-hidden rounded-xl border border-charcoal/15 bg-obsidian p-5 font-mono text-[11px] lg:col-span-6">
          {/* Animated Laser Scan Bar */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neonCyan to-transparent shadow-[0_0_15px_rgba(102,102,102,0.4)] z-20"
          />

          {/* Invoice Document Layout */}
          <div className="space-y-4 text-charcoal/80">
            <div className="flex justify-between border-b border-charcoal/10 pb-2">
              <span className="font-bold text-charcoal">TAX INVOICE</span>
              <span className="text-charcoal/40">ORIGINAL FOR RECIPIENT</span>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-charcoal/40">VENDOR DETAILS</p>
              <p className="font-bold text-charcoal">Horizon Tech Supplies Pvt Ltd</p>
              <p className="relative inline-block rounded bg-neonCyan/10 px-1 text-charcoal">
                GSTIN: 27AAACH7409R1ZZ
                <span className="ml-1 text-[9px] font-bold text-emerald-600">✓ VALID</span>
              </p>
            </div>

            {/* Line Items Table */}
            <div className="border-t border-charcoal/10 pt-2">
              <div className="flex justify-between text-[10px] font-bold text-charcoal/50">
                <span>ITEM DESCRIPTION</span>
                <span>AMOUNT</span>
              </div>
              <div className="mt-1 flex justify-between border-b border-charcoal/5 py-1">
                <span>Enterprise SSD 4TB (x10)</span>
                <span className="font-bold">₹1,24,000.00</span>
              </div>
              <div className="flex justify-between border-b border-charcoal/5 py-1">
                <span>IGST @ 18%</span>
                <span>₹22,320.00</span>
              </div>
              <div className="flex justify-between pt-2 font-bold text-charcoal text-xs">
                <span>TOTAL PAYABLE</span>
                <span className="text-emerald-700">₹1,46,320.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Extracted Structured JSON & Brakes Seal */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-5 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-charcoal">
              <span>STRUCTURED JSON EXTRACTION</span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800">
                3-WAY MATCH: 100%
              </span>
            </div>

            <div className="mt-4 space-y-2 font-mono text-xs">
              <div className="rounded-lg bg-white p-2.5 shadow-sm border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">MATCHED PURCHASE ORDER</span>
                <p className="font-bold text-charcoal">#PO-4401 (Approved by VP Infra)</p>
              </div>
              <div className="rounded-lg bg-white p-2.5 shadow-sm border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">GL ACCOUNT ALLOCATION</span>
                <p className="font-bold text-charcoal">6020-Hardware-Capex</p>
              </div>
              <div className="rounded-lg bg-white p-2.5 shadow-sm border border-charcoal/5">
                <span className="text-[10px] text-charcoal/40">GST INPUT TAX CREDIT (ITC)</span>
                <p className="font-bold text-emerald-700">₹22,320.00 Eligible for Claim</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs font-mono">
            <span className="text-charcoal/50">ERP Target: SAP S/4HANA</span>
            <span className="font-bold text-charcoal bg-white px-2 py-1 rounded border border-charcoal/10">
              AUDIT PASS ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
