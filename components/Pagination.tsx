// components/Pagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  pages,
  total,
  onPageChange,
}: PaginationProps) {
  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const nums = new Set([1, pages, page, page - 1, page + 1]);
    return [...nums].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-1 py-3">
      {/* Count */}
      <span className="text-[#5A6478] text-xs font-condensed">
        {page}–{total} of {total}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1A2030] text-[#5A6478] hover:text-white hover:border-[#2A3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((num, i) => {
          const prev = pageNumbers[i - 1];
          const showEllipsis = prev && num - prev > 1;

          return (
            <div key={num} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="text-[#3A4155] text-xs px-1">...</span>
              )}
              <button
                onClick={() => onPageChange(num)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-condensed font-700 transition-all cursor-pointer ${
                  num === page
                    ? 'bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]'
                    : 'border border-[#1A2030] text-[#5A6478] hover:text-white hover:border-[#2A3040]'
                }`}
              >
                {num}
              </button>
            </div>
          );
        })}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1A2030] text-[#5A6478] hover:text-white hover:border-[#2A3040] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
