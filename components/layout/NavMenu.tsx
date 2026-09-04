import Link from "next/link";
import type { SiteLink } from "@/lib/site-navigation";

interface NavMenuProps {
  links: SiteLink[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}

export function NavMenu({
  links,
  pathname,
  onNavigate,
  className = "",
}: NavMenuProps) {
  return (
    <nav className={className} aria-label="Main Navigation">
      {links.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm tracking-wide transition-colors duration-200 py-1 px-1.5 ${
              isActive
                ? "text-charcoal font-semibold border-b border-charcoal"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
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
