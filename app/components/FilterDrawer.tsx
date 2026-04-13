import {useState} from 'react';
import {ChevronDown, X} from 'lucide-react';
import kalyanLogo from '../assets/KJButterfly.png';

type FilterDrawerValue = {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
};

type FilterDrawerSection = {
  id: string;
  label: string;
  values: FilterDrawerValue[];
};

export function FilterDrawer({
  isOpen,
  onClose,
  onClearAll,
  selectedCount,
  seeItemsCount,
  sections,
  emptyMessage = 'No filters available.',
}: {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
  selectedCount: number;
  seeItemsCount: number;
  sections: FilterDrawerSection[];
  emptyMessage?: string;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/40">
      <div className="h-full w-full max-w-[520px] overflow-y-auto bg-[#f3f3f3]">
        <div className="flex items-center justify-between px-10 pt-8">
          <img src={kalyanLogo} alt="Kalyan Jewellers" className="h-16 w-auto" />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#9b9b9b] hover:bg-[#e7e7e7]"
            aria-label="Close filters"
          >
            <X size={26} />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-between px-10">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-semibold tracking-wide text-black">FILTERS</h2>
            <span className="rounded-lg bg-[#ddd9c7] px-3 py-0.5 text-[14px] text-black">
              {selectedCount}
            </span>
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="text-[16px] uppercase tracking-wide text-[#cf254a]"
          >
            Clear all
          </button>
        </div>

        <div className="mt-8 space-y-8 px-10 pb-10">
          {sections.length ? (
            sections.map((section) => {
              const isExpanded = expanded[section.id] ?? false;
              const visibleValues = isExpanded ? section.values : section.values.slice(0, 4);
              const hiddenCount = Math.max(section.values.length - 4, 0);

              return (
                <section key={section.id}>
                  <h3 className="mb-4 text-[20px] font-semibold uppercase text-black">{section.label}</h3>
                  <div className="space-y-4">
                    {visibleValues.map((value) => (
                      <label key={value.id} className="flex cursor-pointer items-center gap-4">
                        <input
                          type="checkbox"
                          checked={value.checked}
                          onChange={value.onToggle}
                          className="
                            h-5 w-5 appearance-none rounded-md border border-[#d6d2bf]
                            bg-[#dedbc9] checked:bg-[#cf254a] checked:border-[#cf254a]
                            relative
                            checked:after:content-['✔']
                            checked:after:text-white
                            checked:after:absolute
                            checked:after:top-1/2
                            checked:after:left-1/2
                            checked:after:-translate-x-1/2
                            checked:after:-translate-y-1/2
                            checked:after:text-sm
                            focus:outline-none
                          "
                        />
                        <span className="text-[14px] text-[#1f3550]">
                          {value.label}
                          {typeof value.count === 'number' ? (
                            <span className="text-[#cf254a]"> ({value.count})</span>
                          ) : null}
                        </span>
                      </label>
                    ))}
                  </div>
                  {hiddenCount > 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((prev) => ({...prev, [section.id]: !isExpanded}))
                      }
                      className="mt-4 flex items-center gap-2 text-[12px] text-[#cf254a]"
                    >
                      <ChevronDown size={24} />
                      {isExpanded ? 'Show less' : `Show (${hiddenCount}) more`}
                    </button>
                  ) : null}
                </section>
              );
            })
          ) : (
            <p className="text-[10px] text-gray-600">{emptyMessage}</p>
          )}
        </div>

        {/* <div className="sticky bottom-0 flex gap-4 bg-[#f3f3f3] px-8 py-4">
          <button
            type="button"
            onClick={onClearAll}
            className="w-1/2 rounded-full border border-black py-4 text-[16px]"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-full bg-black py-4 text-[16px] text-white"
          >
            See {seeItemsCount} items
          </button>
        </div> */}
      </div>
      <button
        type="button"
        className="h-full flex-1"
        onClick={onClose}
        aria-label="Close filters overlay"
      />
    </div>
  );
}
