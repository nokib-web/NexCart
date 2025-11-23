"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={
        active
          ? "text-primary font-semibold"
          : "text-gray-600 "
      }
    >
      {children}
    </Link>
  );
}
