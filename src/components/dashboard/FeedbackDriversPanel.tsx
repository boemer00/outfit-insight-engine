
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  // Updated softer color palette
  const colorPalette = {
    'Size Issue': '#7EC8E3',    // Light Blue
    'Quality Issue': '#80C784', // Soft Green
    'Comfort Issue': '#B39DDB', // Soft Purple
    'Color Mismatch': '#FFD54F' // Warm Yellow
  };
  
  // Custom tooltip for bar chart with enhanced information
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm flex items-center py-1" style={{ color: item.fill }}>
              <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.fill }}></span>
              <span className="font-medium">{item.name}:</span> <span className="ml-1">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-section-subtitle">Feedback Drivers Analysis</h3>
      
      {/* Feedback Trends Grouped Bar Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Feedback Trends by Category</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={feedbackTrendsData}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              barGap={2}  // Small gap between bars in same group
              barCategoryGap={16} // Gap between monthly groups
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" /> 
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: '#E0E0E0' }}
                tickLine={{ stroke: '#E0E0E0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                width={30} 
                axisLine={{ stroke: '#E0E0E0' }}
                tickLine={{ stroke: '#E0E0E0' }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar 
                dataKey="Size Issue" 
                fill={colorPalette['Size Issue']} 
                barSize={10}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="Quality Issue" 
                fill={colorPalette['Quality Issue']} 
                barSize={10}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="Comfort Issue" 
                fill={colorPalette['Comfort Issue']} 
                barSize={10}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="Color Mismatch" 
                fill={colorPalette['Color Mismatch']} 
                barSize={10}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend with updated colors */}
        <div className="mt-4 mb-6 flex flex-wrap gap-4 text-xs justify-center">
          {Object.entries(colorPalette).map(([key, color]) => (
            <div key={key} className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: color }} />
              <span className="text-[#4A4A4A]">{key}</span>
            </div>
          ))}
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
