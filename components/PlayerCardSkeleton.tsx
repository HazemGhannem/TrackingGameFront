export default function PlayerCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-[#1A2030] bg-[#0D1017] overflow-hidden animate-pulse">
      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-[#1A2030]" />

      <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#161C28] shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3.5 w-28 rounded bg-[#161C28]" />
            <div className="h-2.5 w-16 rounded bg-[#161C28]" />
          </div>
        </div>

        <div className="h-px bg-[#1A2030]" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#161C28]" />
            <div className="h-2.5 w-16 rounded bg-[#161C28]" />
          </div>
          <div className="h-2.5 w-10 rounded bg-[#161C28]" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-[3px] rounded-full bg-[#161C28]" />
          <div className="h-2.5 w-6 rounded bg-[#161C28]" />
        </div>
      </div>
    </div>
  );
}
