import React from "react";

const BAR_WIDTHS = ["w-11/12", "w-3/4", "w-2/5", "w-4/5", "w-3/5"];

const MockUI = ({ rows = 3, highlightRow = 2 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17171b]">
      <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#242428] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="space-y-3 px-4 py-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full ${
              i === highlightRow
                ? "bg-emerald-400/25"
                : "bg-white/[0.07]"
            } ${BAR_WIDTHS[i % BAR_WIDTHS.length]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MockUI;
