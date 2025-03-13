
import React, { useState } from 'react';
import { Search, LayoutDashboard, TrendingUp, Package, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dateRange, setDateRange] = useState('This Week');
  
  return (
    <header className="py-6 px-6 bg-white border-b border-gray-100 animate-fade-in">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-medium text-dashboard-text-heading">
              ACME Wear
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Dashboard', icon: <LayoutDashboard size={16} /> },
                { name: 'Insights', icon: <TrendingUp size={16} /> },
                { name: 'Product Performance', icon: <Package size={16} /> },
                { name: 'Settings', icon: <Settings size={16} /> }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-lg transition-all",
                    activeTab === item.name
                      ? "text-dashboard-accent bg-blue-50"
                      : "text-dashboard-text-body hover:bg-gray-50"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            
            <div className="relative">
              <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                <span className="mr-2">{dateRange}</span>
                <ChevronDown size={16} />
              </button>
              {/* Date range dropdown would go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
