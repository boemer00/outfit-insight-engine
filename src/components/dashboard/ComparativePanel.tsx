
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AIInsightBox from './AIInsightBox';

interface ComparativePanelProps {
  comparativeData: Array<{
    month: string;
    '2025': number;
    '2024': number;
  }>;
  aiInsightData: {
    product: string;
    issue: string;
    rate: string;
    suggestion: string;
  };
}

const ComparativePanel = ({ comparativeData, aiInsightData }: ComparativePanelProps) => {
  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.stroke }}>
              {item.name}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-section-subtitle">Comparative Analysis</h3>
      
      {/* Year-over-Year Comparison Line Graph */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Dissatisfaction Trend Comparison</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={comparativeData}
              margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                width={35} 
                tickFormatter={(tick) => `${tick}%`}
                domain={[0, 30]}
                padding={{ bottom: 10 }}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Line 
                type="monotone" 
                dataKey="2025" 
                stroke="#4A90E2" 
                strokeWidth={2.5} 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }}
                name="2025"
              />
              <Line 
                type="monotone" 
                dataKey="2024" 
                stroke="#BBDEFB" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }}
                name="2024"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Line chart legend */}
        <div className="flex justify-center items-center space-x-6 mt-1 mb-6">
          <div className="flex items-center text-sm">
            <div className="w-8 h-0.5 mr-2 bg-[#4A90E2]" />
            <span className="text-dashboard-text-body text-xs">2025</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-8 h-0.5 mr-2 bg-[#BBDEFB]" style={{ borderBottomWidth: '1px', borderStyle: 'dashed' }} />
            <span className="text-dashboard-text-body text-xs">2024</span>
          </div>
        </div>
      </div>
      
      {/* AI Insight Box */}
      <AIInsightBox 
        insights={
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[#4A4A4A]">{aiInsightData.product}</span>
              <span className="text-xs bg-[#FFDEE2] text-[#F44336] px-2 py-0.5 rounded opacity-85">
                {aiInsightData.rate} Returns
              </span>
            </div>
            <p className="text-xs text-[#777777] mb-1">
              Most common issue: <span className="font-medium">{aiInsightData.issue}</span>
            </p>
            <p className="text-xs text-[#4A4A4A]">
              <span className="font-medium">Suggestion:</span> {aiInsightData.suggestion}
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ComparativePanel;
