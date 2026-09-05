import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

export type BackofficeNavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  shortcut?: string;
  keywords?: readonly string[];
};

export const backofficeNavItems: readonly BackofficeNavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    description: "Overview of backoffice operations",
    icon: LayoutDashboard,
    shortcut: "Alt+1",
    keywords: ["home", "overview"],
  },
  {
    href: "/reports",
    label: "Reports",
    description: "Revenue, proposals, and product insights",
    icon: BarChart3,
    shortcut: "Alt+2",
    keywords: ["analytics", "insights", "charts", "revenue"],
  },
  {
    href: "/catalogue",
    label: "Catalogue",
    description: "Manage product catalogue",
    icon: Package,
    shortcut: "Alt+3",
    keywords: ["products", "catalog", "sku"],
  },
  {
    href: "/orders",
    label: "Orders",
    description: "Review customer shop orders",
    icon: ShoppingCart,
    shortcut: "Alt+4",
    keywords: ["sales", "checkout"],
  },
  {
    href: "/proposals",
    label: "Proposals",
    description: "Solar system proposals and quotes",
    icon: FileText,
    shortcut: "Alt+5",
    keywords: ["quotes", "leads", "systems"],
  },
  {
    href: "/leads",
    label: "Leads",
    description: "Contact form and lead inquiries",
    icon: Users,
    shortcut: "Alt+6",
    keywords: ["contacts", "inquiries"],
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Simulators and calculator configuration",
    icon: Settings,
    shortcut: "Alt+7",
    keywords: ["config", "preferences", "simulator", "grid-tied", "off-grid"],
  },
];
