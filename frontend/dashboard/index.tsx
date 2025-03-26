
import React from 'react';
import Header from '@/components/layout/Header';
import KpiCard from '@/components/dashboard/KpiCard';
import ConversationAnalysis from '@/components/dashboard/ConversationAnalysis';
import UserBehavior from '@/components/dashboard/UserBehavior';
import ChatBot from '../components/ChatBot';
import GraphGenerator from '../components/GraphGenerator';
import { MessageCircle, TrendingUp, DollarSign, ShoppingCart, Repeat } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Conversations',
      value: 1253,
      change: 12.3,
      trend: 'up' as const,
      icon: <MessageCircle size={18} />,
      sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 50 + Math.floor(Math.random() * 50) }))
    },
    {
      title: 'Average Engagement',
      value: 4.2,
      change: 8.7,
      trend: 'up' as const,
      icon: <TrendingUp size={18} />,
      sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 30 + Math.floor(Math.random() * 70) })),
      formatter: (v) => v.toString() + '/5'
    },
    {
      title: 'Average Order Value',
      value: 78.5,
      change: 5.4,
      trend: 'up' as const,
      icon: <DollarSign size={18} />,
      sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 60 + Math.floor(Math.random() * 40) })),
      formatter: (v) => '$' + v.toString()
    },
    {
      title: 'Conversion Rate',
      value: 24.8,
      change: -2.1,
      trend: 'down' as const,
      icon: <ShoppingCart size={18} />,
      sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 20 + Math.floor(Math.random() * 40) })),
      formatter: (v) => v.toString() + '%'
    },
    {
      title: 'Cross-Sell Uptake',
      value: 18.3,
      change: 6.9,
      trend: 'up' as const,
      icon: <Repeat size={18} />,
      sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 10 + Math.floor(Math.random() * 30) })),
      formatter: (v) => v.toString() + '%'
    }
  ];

  return (
    <div className="min-h-screen bg-dashboard-background">
      <Header />
      
      <main className="dashboard-container pb-20">
        {/* Dashboard Title - Reverted to original styling */}
        <div className="mb-6 mt-4">
          <h1 className="text-3xl font-medium text-dashboard-text-heading">AI Personal Stylist Dashboard</h1>
          <p className="text-dashboard-text-body mt-1">Insights and analytics for your AI-driven fashion recommendations</p>
        </div>
        
        {/* KPI Cards - Reverted to original styling */}
        <div className="dashboard-section mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {kpiData.map((kpi, index) => (
              <KpiCard 
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={kpi.icon}
                sparklineData={kpi.sparklineData}
                formatter={kpi.formatter}
              />
            ))}
          </div>
        </div>
        
        {/* Tabs for Dashboard Sections */}
        <div className="mt-8 animate-fade-in">
          <Tabs defaultValue="generate-pin" className="w-full">
            <TabsList className="mb-6 bg-white dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="generate-pin">Generate & Pin</TabsTrigger>
              <TabsTrigger value="user-behavior">User Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <ConversationAnalysis />
            </TabsContent>
            
            <TabsContent value="generate-pin" className="mt-4">
              <GraphGenerator />
            </TabsContent>
            
            <TabsContent value="user-behavior" className="mt-4">
              <UserBehavior />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>Powered by ACME AI • Version 1.0</p>
        </footer>
      </main>
      
      {/* AI Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;
