import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface FxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  to?: string;
  withArrow?: boolean;
  underline?: "left" | "center" | "none";
  className?: string;
}

export function FxLink({
  children,
  to,
  href,
  withArrow = false,
  underline = "left",
  className,
  ...props
}: FxLinkProps) {
  const underlineClass = {
    left: "fx-underline",
    center: "fx-underline-center",
    none: "",
  }[underline];

  const content = (
    <>
      <span className={cn("transition-colors duration-200", underlineClass)}>
        {children}
      </span>
      {withArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="fx-arrow-icon transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </>
  );

  const sharedClass = cn(
    "group inline-flex items-center gap-1.5 font-medium transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#163A7A]",
    className
  );

  if (to) {
    return (
      <Link
        {...(props as unknown as Omit<LinkProps, "to">)}
        to={to}
        data-cursor="link"
        className={sharedClass}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href ?? "#"}
      data-cursor="link"
      className={sharedClass}
      {...props}
    >
      {content}
    </a>
  );
}
