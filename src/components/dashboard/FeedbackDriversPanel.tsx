
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIInsightBox from './AIInsightBox';

interface FeedbackDriversPanelProps {
  feedbackTrendsData: Array<{
    month: string;
    'Size Issue': number;
    'Quality Issue': number;
    'Comfort Issue': number;
    'Color Mismatch': number;
  }>;
}

const FeedbackDriversPanel = ({ feedbackTrendsData }: FeedbackDriversPanelProps) => {
  // Custom tooltip for area chart
  const CustomAreaTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.fill }}>
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-section-subtitle">Feedback Drivers Analysis & AI Insight</h3>
      
      {/* Feedback Trends Area Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Feedback Trends by Category</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={feedbackTrendsData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} width={25} />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area 
                type="monotone" 
                dataKey="Size Issue" 
                stackId="1" 
                stroke="#4A90E2" 
                fill="#4A90E2" 
                strokeWidth={1.5}
              />
              <Area 
                type="monotone" 
                dataKey="Quality Issue" 
                stackId="1" 
                stroke="#4CAF50" 
                fill="#4CAF50" 
                strokeWidth={1.5}
              />
              <Area 
                type="monotone" 
                dataKey="Comfort Issue" 
                stackId="1" 
                stroke="#7B61FF" 
                fill="#7B61FF" 
                strokeWidth={1.5}
              />
              <Area 
                type="monotone" 
                dataKey="Color Mismatch" 
                stackId="1" 
                stroke="#FFB74D" 
                fill="#FFB74D" 
                strokeWidth={1.5}
                fillOpacity={0.9}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-2 mb-6 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: '#4A90E2' }} />
            <span className="text-[#4A4A4A]">Size Issue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: '#4CAF50' }} />
            <span className="text-[#4A4A4A]">Quality Issue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: '#7B61FF' }} />
            <span className="text-[#4A4A4A]">Comfort Issue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: '#FFB74D' }} />
            <span className="text-[#4A4A4A]">Color Mismatch</span>
          </div>
        </div>
      </div>
      
      {/* AI Insight Box */}
      <AIInsightBox 
        insights={
          <div>
            <p className="text-xs text-[#4A4A4A] mb-2">
              <span className="font-medium">Common Issue:</span> Size-related complaints have increased by 12% this month.
            </p>
            <p className="text-xs text-[#4A4A4A]">
              <span className="font-medium">Suggestion:</span> Enhance size descriptions or provide better sizing guidance.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default FeedbackDriversPanel;
