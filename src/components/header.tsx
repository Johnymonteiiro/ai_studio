"use client";

import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  subtitle?: string;
}

export function Header({
  onToggleSidebar,
  title = "Dashboard",
  subtitle = "Bem-vindo ao AI Studio! Aqui está um resumo do seu trabalho.",
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 hover:text-secondary rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Title Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        {/* Center Section - Search */}
        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos, pratos, clientes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Export Button */}
          {/* <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button> */}

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* User Profile */}
        </div>
      </div>
    </header>
  );
}
