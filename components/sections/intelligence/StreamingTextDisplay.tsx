"use client";

import React from "react";

interface StreamingTextDisplayProps {
  text: string;
  isStreaming: boolean;
}

export function StreamingTextDisplay({ text, isStreaming }: StreamingTextDisplayProps) {
  return (
    <div className="relative">
      <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-charcoal font-space-grotesk tracking-[-0.01em]">
        {text}
        {isStreaming && (
          <span className="inline-block w-2.5 h-5 ml-1 bg-charcoal animate-pulse align-middle" />
        )}
      </p>
    </div>
  );
}
