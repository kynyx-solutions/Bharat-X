import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; to?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 group/crumb">
            {i > 0 && <ChevronRight size={11} aria-hidden className="text-ink-600 transition-transform duration-200 group-hover/crumb:translate-x-0.5" />}
            {item.to ? (
              <Link
                to={item.to}
                data-cursor="link"
                className="transition-colors hover:text-[#163A7A] dark:hover:text-pulse-300 fx-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-300 font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
