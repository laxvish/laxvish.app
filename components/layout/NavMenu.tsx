import Link from "next/link";
import type { SiteLink } from "@/lib/site-navigation";

interface NavMenuProps {
  links: SiteLink[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}

const getLinkClassName = (isActive: boolean): string =>
  [
    "rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
    isActive
      ? "bg-charcoal/10 text-neonCyan"
      : "text-charcoal/75 hover:text-neonCyan",
  ].join(" ");

export function NavMenu({
  links,
  pathname,
  onNavigate,
  className,
}: NavMenuProps) {
  return (
    <nav className={className}>
      {links.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={getLinkClassName(isActive)}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
