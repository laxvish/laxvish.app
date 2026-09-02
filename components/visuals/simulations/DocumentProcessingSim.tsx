"use client";

import { motion } from "framer-motion";

export function DocumentProcessingSim() {
  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Neural OCR & 3-Way Reconciliation Rig
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              GSTIN Check: <strong className="text-emerald-400">100% Valid</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              Extraction: <strong className="text-amber-400">22ms</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: Physical Paper Invoice in Inspection Rig */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#FAFAFA] p-5 font-mono text-[11px] text-charcoal shadow-inner lg:col-span-7">
            {/* Glowing Laser Scanner Beam */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20"
            />

            <div className="space-y-4">
              <div className="flex justify-between border-b border-charcoal/10 pb-2">
                <span className="font-bold tracking-wider text-charcoal">TAX INVOICE</span>
                <span className="text-[9px] text-charcoal/40 uppercase">Original For Recipient</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-charcoal/40 uppercase">Vendor Information</p>
                <p className="font-bold text-sm text-charcoal">Horizon Tech Supplies Pvt Ltd</p>
                <div className="inline-flex items-center gap-2 rounded bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-900 border border-emerald-300">
                  <span>GSTIN: 27AAACH7409R1ZZ</span>
                  <span className="font-bold">✓ VERIFIED</span>
                </div>
              </div>

              {/* Table with Bounding Boxes */}
              <div className="border-t border-charcoal/10 pt-2">
                <div className="flex justify-between text-[10px] font-bold text-charcoal/50">
                  <span>ITEM DESCRIPTION</span>
                  <span>AMOUNT</span>
                </div>
                <div className="mt-1 flex justify-between border-b border-charcoal/5 py-1.5">
                  <span className="rounded border border-cyan-400/40 bg-cyan-50 px-1 text-charcoal">
                    Enterprise NVMe 4TB SSD (x10)
                  </span>
                  <span className="font-bold">₹1,24,000.00</span>
                </div>
                <div className="flex justify-between border-b border-charcoal/5 py-1">
                  <span className="text-charcoal/70">IGST @ 18%</span>
                  <span>₹22,320.00</span>
                </div>
                <div className="flex justify-between pt-2 text-xs font-bold text-charcoal">
                  <span>TOTAL PAYABLE</span>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-900">
                    ₹1,46,320.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Structured ERP Payload & Brakes Audit Seal */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-5">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-white/70">
                <span>STRUCTURED ERP COMMIT</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                  3-WAY MATCH ✓
                </span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <span className="text-[10px] text-white/40">MATCHED PURCHASE ORDER</span>
                  <p className="font-bold text-white">#PO-4401 (Approved by VP Infra)</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                  <span className="text-[10px] text-white/40">GL CODE ALLOCATION</span>
                  <p className="font-bold text-white">6020-Hardware-Capex</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <span className="text-[10px] text-emerald-400">GST INPUT TAX CREDIT (ITC)</span>
                  <p className="font-bold text-emerald-300">₹22,320.00 Auto-Claimed</p>
                </div>
              </div>
            </div>

            {/* Brakes Seal */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
              <span className="text-white/40">Target: SAP S/4HANA</span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-black shadow-md">
                AUDIT PASS ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
