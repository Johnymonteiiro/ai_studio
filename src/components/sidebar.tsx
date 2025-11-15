"use client";

import { cn } from "@/src/lib/utils";
import {
  ChevronDown,
  FileSpreadsheet,
  House,
  Package,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  {
    icon: House,
    label: "Home",
    href: "/dashboard",
    active: true,
  },
  {
    icon: FileSpreadsheet,
    label: "Dataseats",
    href: "/dashboard/datasets",
  },
  {
    icon: Package,
    label: "Models",
    hasSubmenu: false,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/configuracoes",
  },
];

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div
      className={cn(
        "bg-background border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-[85px] p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* <Image src={Logo} alt="logo" className="size-10" /> */}
          {!isCollapsed && (
            <div className="flex items-center">
              <h1 className="text-[30px] font-extrabold">AI STUDIO</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.label);

            return (
              <li key={item.label}>
                {item?.hasSubmenu ? (
                  <div
                    className={cn(
                      "flex items-center rounded-lg cursor-pointer transition-colors focus:outline-none relative group",
                      isCollapsed
                        ? "justify-center px-3 py-2"
                        : "gap-3 px-3 py-2",
                      item.active
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-secondary"
                    )}
                    onClick={() => toggleSubmenu(item.label)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleSubmenu(item.label);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`submenu-${item.label}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </>
                    )}
                    {/* Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center rounded transition-colors focus:outline-none relative group",
                      isCollapsed
                        ? "justify-center px-3 py-2"
                        : "gap-3 px-3 py-2",
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        router.push(item.href || "#");
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="flex-1">{item.label}</span>
                    )}
                    {/* Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-primary-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )}

                {/* Submenu */}
                {item.hasSubmenu && isExpanded && !isCollapsed && (
                  <ul
                    className="ml-8 mt-2 space-y-1"
                    id={`submenu-${item.label}`}
                    role="menu"
                  >
                    {/* {item.submenu?.map((subItem) => (
                      <li key={subItem.label} role="none">
                        <Link
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-secondary rounded-lg transition-colors focus:outline-none"
                          role="menuitem"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              router.push(subItem.href);
                            }
                          }}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">R</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">AI Studio</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
