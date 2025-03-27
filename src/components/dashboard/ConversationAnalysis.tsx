
import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  ComposedChart,
  Rectangle
} from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  ChevronDown, 
  Info
} from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ConversationAnalysis = () => {
  // Mock data for Sentiment Intelligence (Left Panel)
  const sentimentData = [
    { name: 'Positive', value: 35, color: '#4CAF50' },
    { name: 'Neutral', value: 40, color: '#BBDEFB' },
    { name: 'Negative', value: 25, color: '#F44336' }
  ];
  
  // Mock data for Feedback Drivers Analysis
  const returnReasonData = [
    { month: 'Jan', 'Size Issue': 28, 'Quality Issue': 12, 'Comfort Issue': 10, 'Color Mismatch': 8 },
    { month: 'Feb', 'Size Issue': 24, 'Quality Issue': 14, 'Comfort Issue': 11, 'Color Mismatch': 7 },
    { month: 'Mar', 'Size Issue': 26, 'Quality Issue': 16, 'Comfort Issue': 9, 'Color Mismatch': 9 },
    { month: 'Apr', 'Size Issue': 22, 'Quality Issue': 18, 'Comfort Issue': 13, 'Color Mismatch': 10 },
    { month: 'May', 'Size Issue': 30, 'Quality Issue': 10, 'Comfort Issue': 15, 'Color Mismatch': 5 },
    { month: 'Jun', 'Size Issue': 32, 'Quality Issue': 8, 'Comfort Issue': 14, 'Color Mismatch': 6 },
  ];

  // Mock data for Comparative Analysis
  const comparativeData = [
    { month: 'Jan', 'Overall Dissatisfaction': 22 },
    { month: 'Feb', 'Overall Dissatisfaction': 20 },
    { month: 'Mar', 'Overall Dissatisfaction': 18 },
    { month: 'Apr', 'Overall Dissatisfaction': 19 },
    { month: 'May', 'Overall Dissatisfaction': 24 },
    { month: 'Jun', 'Overall Dissatisfaction': 26 },
  ];

  // Problematic products data for AI insights
  const problematicProducts = [
    { product: 'DIYR Sunglasses', issue: 'Quality Issue', rate: '32%', suggestion: 'Revise material descriptions and quality control.' },
    { product: 'Comfort Shoes XL', issue: 'Size Issue', rate: '28%', suggestion: 'Update sizing guide with more detailed measurements.' },
  ];
  
  // Top return reasons with frequency counts
  const topReasons = [
    { reason: 'Size Issue', count: 28, change: '+12%', color: '#4A90E2' },
    { reason: 'Quality Issue', count: 12, change: '-5%', color: '#82ca9d' },
    { reason: 'Comfort Issue', count: 10, change: '+8%', color: '#8884d8' },
    { reason: 'Color Mismatch', count: 8, change: '+2%', color: '#ffc658' }
  ];

  // Time and category filters for middle panel
  const [timeFilter, setTimeFilter] = useState('Month');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
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
  
  // Custom active shape for pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <g>
          <path 
            d={`M${cx},${cy} L${cx},${cy - outerRadius - 10}`} 
            stroke={fill} 
            fill="none"
            strokeWidth={2}
          />
        </g>
        {/* Base arc */}
        <path 
          d={`M${cx},${cy} L${cx},${cy - outerRadius - 10}`} 
          stroke={fill} 
          fill="none"
          strokeWidth={2}
        />
        <path
          d={`
            M ${cx},${cy}
            L ${cx + innerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-startAngle * Math.PI / 180)}
            A ${innerRadius},${innerRadius} 0 0 0 ${cx + innerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-endAngle * Math.PI / 180)}
            Z
          `}
          fill={fill}
          stroke={fill}
        />
        <path
          d={`
            M ${cx + innerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-startAngle * Math.PI / 180)}
            L ${cx + outerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-startAngle * Math.PI / 180)}
            A ${outerRadius},${outerRadius} 0 0 0 ${cx + outerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-endAngle * Math.PI / 180)}
            L ${cx + innerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + innerRadius * Math.sin(-endAngle * Math.PI / 180)}
            Z
          `}
          fill={fill}
        />
      </g>
    );
  };

  // Custom shape for bar chart
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    return <Rectangle {...props} radius={[4, 4, 0, 0]} />;
  };
  
  // AI insight box component for reuse
  const AIInsightBox = ({ title, insights }: { title?: string, insights: React.ReactNode }) => (
    <div className="bg-[#F0F0F0] p-3 rounded-lg border border-[#EFEFEF] shadow-sm">
      <h4 className="text-sm font-medium text-dashboard-text-body mb-1 flex items-center">
        <Info size={14} className="mr-1" /> {title || "AI Insight"}
      </h4>
      {insights}
    </div>
  );
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="dashboard-section-title">Feedback Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Sentiment Intelligence & AI Insight */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Sentiment Intelligence & AI Insight</h3>
          
          {/* Overall Sentiment Overview (Compact Pie Chart) */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Overall Sentiment Distribution</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1000}
                    activeIndex={0}
                    activeShape={renderActiveShape}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const totalValue = sentimentData.reduce((acc, item) => acc + item.value, 0);
                        return (
                          <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
                            <p className="text-sm font-medium">{data.name}</p>
                            <p className="text-sm text-gray-700">
                              {data.value} ({Math.round((data.value / totalValue) * 100)}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
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
          
          {/* AI Insight Box (replacing Top Negative Keywords) */}
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
        
        {/* Middle Panel: Feedback Drivers Analysis & AI Insight */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Feedback Drivers Analysis & AI Insight</h3>
          
          {/* Filters */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-[#F0F0F0] text-[#4A4A4A]">
                {categoryFilter} <ChevronDown size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className={cn(
                  "px-3 py-1 text-xs rounded-md", 
                  timeFilter === 'Month' 
                    ? "bg-[#4A90E2] text-white" 
                    : "bg-[#F0F0F0] text-[#4A4A4A]"
                )}
                onClick={() => setTimeFilter('Month')}
              >
                Month
              </button>
              <button 
                className={cn(
                  "px-3 py-1 text-xs rounded-md", 
                  timeFilter === 'Quarter' 
                    ? "bg-[#4A90E2] text-white" 
                    : "bg-[#F0F0F0] text-[#4A4A4A]"
                )}
                onClick={() => setTimeFilter('Quarter')}
              >
                Quarter
              </button>
              <button 
                className={cn(
                  "px-3 py-1 text-xs rounded-md", 
                  timeFilter === 'Year' 
                    ? "bg-[#4A90E2] text-white" 
                    : "bg-[#F0F0F0] text-[#4A4A4A]"
                )}
                onClick={() => setTimeFilter('Year')}
              >
                Year
              </button>
            </div>
          </div>
          
          {/* Top Feedback Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Top Feedback Categories</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={returnReasonData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={25} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="Size Issue" fill="#4A90E2" shape={<CustomBar />} />
                  <Bar dataKey="Quality Issue" fill="#82ca9d" shape={<CustomBar />} />
                  <Bar dataKey="Comfort Issue" fill="#8884d8" shape={<CustomBar />} />
                  <Bar dataKey="Color Mismatch" fill="#ffc658" shape={<CustomBar />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Color legend */}
            <div className="mt-2 mb-6 flex flex-wrap gap-3 text-xs">
              {topReasons.map((reason, idx) => (
                <div key={idx} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-sm mr-1" 
                    style={{ backgroundColor: reason.color }}
                  />
                  <span className="text-[#4A4A4A]">{reason.reason}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* AI Insight Box (replacing Recent Trends) */}
          <AIInsightBox 
            insights={
              <div>
                <p className="text-xs text-[#4A4A4A] mb-2">
                  <span className="font-medium">Size-related complaints</span> have increased by 12% this month.
                </p>
                <p className="text-xs text-[#4A4A4A]">
                  <span className="font-medium">Suggestion:</span> Enhance size descriptions or provide better sizing guidance.
                </p>
              </div>
            }
          />
        </div>
        
        {/* Right Panel: Comparative Analysis & AI Insight */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Comparative Analysis & AI Insight</h3>
          
          {/* Overall Dissatisfaction Trend (Line Graph) - with fixed Y-axis alignment */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Overall Dissatisfaction Trend</h4>
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
                    dataKey="Overall Dissatisfaction" 
                    stroke="#4A90E2" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* AI Insight (replacing Comparative Breakdown and Product-Level Analysis) */}
          <h4 className="text-sm font-medium text-dashboard-text-body mb-2">AI Insight</h4>
          
          <div className="space-y-4">
            {problematicProducts.map((product, idx) => (
              <div key={idx} className="bg-[#F0F0F0] p-3 rounded-lg border border-[#EFEFEF] shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-[#4A4A4A]">{product.product}</span>
                  <span className="text-xs bg-[#FFDEE2] text-[#F44336] px-2 py-0.5 rounded">
                    {product.rate} Returns
                  </span>
                </div>
                <p className="text-xs text-[#777777] mb-1">
                  Most common issue: <span className="font-medium">{product.issue}</span>
                </p>
                <p className="text-xs text-[#4A4A4A]">
                  <span className="font-medium">Suggestion:</span> {product.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationAnalysis;
