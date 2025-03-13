
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserBehavior = () => {
  const sizingData = [
    { name: 'S', value: 25 },
    { name: 'M', value: 40 },
    { name: 'L', value: 30 },
    { name: 'XL', value: 15 },
    { name: 'XXL', value: 5 }
  ];
  
  const fitData = [
    { name: 'Slim', value: 45 },
    { name: 'Regular', value: 35 },
    { name: 'Relaxed', value: 20 }
  ];
  
  const budgetData = [
    { name: '<$30', value: 35 },
    { name: '$30-$50', value: 45 },
    { name: '$50+', value: 20 }
  ];
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 className="dashboard-section-title">User Behavior Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Size Requests */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Size Distribution</h3>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sizingData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barSize={36}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
                          <p className="text-sm font-medium">{`Size ${payload[0].payload.name}`}</p>
                          <p className="text-sm text-gray-700">{payload[0].value}% of requests</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#33C3F0" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Fit Preferences */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Fit Preferences</h3>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fitData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barSize={36}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
                          <p className="text-sm font-medium">{`${payload[0].payload.name} Fit`}</p>
                          <p className="text-sm text-gray-700">{payload[0].value}% of requests</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#403E43" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Budget Ranges */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Budget Distribution</h3>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barSize={36}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
                          <p className="text-sm font-medium">{payload[0].payload.name}</p>
                          <p className="text-sm text-gray-700">{payload[0].value}% of requests</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#9DE9BC" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBehavior;
