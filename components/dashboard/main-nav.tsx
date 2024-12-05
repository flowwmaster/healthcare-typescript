import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/admin",
      label: "Overview",
      active: pathname === "/admin",
    },
    {
      href: "/admin/patients",
      label: "Patients",
      active: pathname === "/admin/patients",
    },
    {
      href: "/admin/doctors",
      label: "Doctors",
      active: pathname === "/admin/doctors",
    },
    {
      href: "/admin/employees",
      label: "Employees",
      active: pathname === "/admin/employees",
    },
    {
      href: "/admin/sessions",
      label: "Sessions",
      active: pathname === "/admin/sessions",
    },
    {
      href: "/admin/billing",
      label: "Billing",
      active: pathname === "/admin/billing",
    },
    {
      href: "/admin/reports",
      label: "Reports",
      active: pathname === "/admin/reports",
    },
    {
      href: "/admin/appointments",
      label: "Appointments",
      active: pathname === "/admin/appointments",
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
