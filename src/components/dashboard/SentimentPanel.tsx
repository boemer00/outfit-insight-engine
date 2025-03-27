
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AIInsightBox from './AIInsightBox';

interface SentimentPanelProps {
  sentimentData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const SentimentPanel = ({ sentimentData }: SentimentPanelProps) => {
  // Custom tooltip for pie chart with percentages
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const totalValue = sentimentData.reduce((acc, item) => acc + item.value, 0);
      const percentage = Math.round((data.value / totalValue) * 100);
      
      return (
        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm text-gray-700">
            {data.value} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-section-subtitle">Sentiment Intelligence</h3>
      
      {/* Donut Chart for Sentiment Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Overall Sentiment Distribution</h4>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center items-center space-x-6 mt-1 mb-6">
          {sentimentData.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-dashboard-text-body">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI Insight Box */}
      <AIInsightBox 
        insights={
          <div>
            <p className="text-xs text-[#4A4A4A] mb-2">
              <span className="font-medium">Common Issue:</span> Poor Quality reports have increased by 15% this month.
            </p>
            <p className="text-xs text-[#4A4A4A]">
              <span className="font-medium">Suggestion:</span> Improve material descriptions and quality assurance processes.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default SentimentPanel;
