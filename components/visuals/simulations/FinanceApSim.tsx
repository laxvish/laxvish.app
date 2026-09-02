"use client";

import { motion } from "framer-motion";

export function FinanceApSim() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Finance & AP Auto-Reconciliation (3-Way Match)
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          Variance: ₹0.00 • Dual Approval Active
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Card 1: Vendor Invoice */}
        <div className="rounded-xl border border-charcoal/10 bg-obsidian p-4 font-mono text-xs">
          <span className="text-[10px] text-charcoal/40 uppercase">1. VENDOR INVOICE</span>
          <p className="mt-1 font-bold text-charcoal">AWS India Cloud</p>
          <div className="mt-3 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Inv #:</span>
              <span className="font-semibold">IN-2026-9921</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold">₹3,42,100.00</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>GSTIN:</span>
              <span>27AAACH... (Valid)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Internal Budget / PO */}
        <div className="rounded-xl border border-charcoal/10 bg-obsidian p-4 font-mono text-xs">
          <span className="text-[10px] text-charcoal/40 uppercase">2. BUDGET / PO CAP</span>
          <p className="mt-1 font-bold text-charcoal">Engineering Infra</p>
          <div className="mt-3 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Cap:</span>
              <span className="font-semibold">₹4,00,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Utilization:</span>
              <span className="font-semibold text-emerald-700">85.5% (Safe)</span>
            </div>
            <div className="flex justify-between">
              <span>Anomaly:</span>
              <span className="font-semibold">None (Normal)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Ledger Reconciliation & ERP Release */}
        <div className="rounded-xl border border-charcoal/10 bg-vaultAmber/30 p-4 font-mono text-xs">
          <span className="text-[10px] text-charcoal/40 uppercase">3. ERP JOURNAL ENTRY</span>
          <p className="mt-1 font-bold text-charcoal">SAP / Tally Commit</p>
          <div className="mt-3 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>Dr:</span>
              <span>Hosting Capex</span>
            </div>
            <div className="flex justify-between">
              <span>Cr:</span>
              <span>AP - AWS India</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-700 pt-1 border-t border-charcoal/10">
              <span>ITC Claim:</span>
              <span>₹52,184.00 ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs font-mono">
        <span className="text-charcoal/60">Auto-approved for upcoming payment batch</span>
        <span className="rounded bg-charcoal px-3 py-1 font-bold text-obsidian">
          RECONCILED ✓
        </span>
      </div>
    </div>
  );
}
