"use client";

import React, { memo } from "react";
import { LaxvishContextGraph } from "@/lib/context/types";

interface LiveTelemetryLedgerProps {
  contextGraph: LaxvishContextGraph;
  isCalibrating?: boolean;
}

export const LiveTelemetryLedger = memo(function LiveTelemetryLedger({
  contextGraph,
  isCalibrating,
}: LiveTelemetryLedgerProps) {
  const { environment, temporal, behavior, technical } = contextGraph;

  return (
    <div className="border border-charcoal/20 bg-obsidian p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-charcoal/20 pb-3">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-charcoal">
          OBSERVED SIGNALS (WEB-NATIVE)
        </h3>
        <span className="text-[10px] font-mono text-neonCyan uppercase">
          {isCalibrating ? "CALIBRATING..." : "DPDP VERIFIED"}
        </span>
      </div>

      {/* 01. Geographic Proximity */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neonCyan">
          01. PROXIMITY & ENVIRONMENT ({environment.locationSource.toUpperCase()})
        </div>
        <div className="p-3 bg-vaultAmber/40 border border-charcoal/10 font-mono text-xs text-charcoal space-y-1.5">
          <div className="flex justify-between">
            <span className="text-neonCyan">LOCATION:</span>
            <span className="font-semibold">{environment.city || "India Region"}, {environment.country || "IN"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neonCyan">ACCURACY TIER:</span>
            <span>{environment.confidenceTier} ({(environment.locationConfidence * 100).toFixed(0)}%)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neonCyan">TIMEZONE / LOCAL:</span>
            <span>{temporal.localHour}:00 ({temporal.localDayOfWeek})</span>
          </div>
        </div>
      </div>

      {/* 02. Surrounding Cluster Density */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neonCyan">
          02. SURROUNDING CLUSTER DENSITY
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(environment.categories).slice(0, 4).map(([cat, score]) => (
            <div key={cat} className="p-2 border border-charcoal/10 bg-vaultAmber/20">
              <div className="flex justify-between text-[10px] font-mono text-neonCyan uppercase">
                <span>{cat}</span>
                <span className="text-charcoal font-semibold">{(score * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-1 h-1 w-full bg-charcoal/10">
                <div
                  className="h-full bg-charcoal transition-all duration-500"
                  style={{ width: `${score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 03. Behavioral On-Site Attention */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neonCyan">
          03. ON-SITE INTERACTION DEPTH
        </div>
        <div className="p-3 bg-vaultAmber/40 border border-charcoal/10 font-mono text-xs text-charcoal space-y-1.5">
          <div className="flex justify-between">
            <span className="text-neonCyan">READING DEPTH:</span>
            <span>{(behavior.readingDepthScore * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neonCyan">TOPIC FOCUS:</span>
            <span className="truncate max-w-[170px] font-semibold">
              {Object.keys(behavior.topicsOfInterest)[0] || "Enterprise Platform Architecture"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neonCyan">DEVICE ENGINE:</span>
            <span>{technical.platform} · {technical.browser}</span>
          </div>
        </div>
      </div>

      {/* Privacy disclosure */}
      <p className="text-[9px] font-mono text-neonCyan leading-normal border-t border-charcoal/10 pt-3">
        * System reads ONLY local on-page interaction and authorized browser signals. No private messaging, cross-tab, or external app activity is accessed.
      </p>
    </div>
  );
});
