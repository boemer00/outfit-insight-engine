
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
  Legend,
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
  ArrowUp, 
  ArrowDown, 
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
  
  // Mock data for Sentiment by Product Category
  const sentimentByCategory = [
    { 
      category: 'Shirts', 
      positive: 45, 
      neutral: 30, 
      negative: 25 
    },
    { 
      category: 'Shoes', 
      positive: 38, 
      neutral: 32, 
      negative: 30 
    },
    { 
      category: 'Sunglasses', 
      positive: 30, 
      neutral: 35, 
      negative: 35 
    },
    { 
      category: 'Bags', 
      positive: 50, 
      neutral: 33, 
      negative: 17 
    },
  ];
  
  // Mock data for Top Negative Keywords
  const negativeKeywords = [
    { word: 'Too Small', count: 18 },
    { word: 'Poor Quality', count: 15 },
    { word: 'Uncomfortable', count: 12 },
    { word: 'Wrong Color', count: 10 },
    { word: 'Overpriced', count: 8 },
    { word: 'Bad Fit', count: 7 },
  ];
  
  // Mock data for Feedback Drivers Analysis (Middle Panel)
  const returnReasonData = [
    { month: 'Jan', 'Size Issue': 28, 'Quality Issue': 12, 'Comfort Issue': 10, 'Color Mismatch': 8 },
    { month: 'Feb', 'Size Issue': 24, 'Quality Issue': 14, 'Comfort Issue': 11, 'Color Mismatch': 7 },
    { month: 'Mar', 'Size Issue': 26, 'Quality Issue': 16, 'Comfort Issue': 9, 'Color Mismatch': 9 },
    { month: 'Apr', 'Size Issue': 22, 'Quality Issue': 18, 'Comfort Issue': 13, 'Color Mismatch': 10 },
    { month: 'May', 'Size Issue': 30, 'Quality Issue': 10, 'Comfort Issue': 15, 'Color Mismatch': 5 },
    { month: 'Jun', 'Size Issue': 32, 'Quality Issue': 8, 'Comfort Issue': 14, 'Color Mismatch': 6 },
  ];

  // Mock data for Recent Trends
  const trendData = [
    { month: 'Apr', 'Size Issue': 0, 'Quality Issue': 0, 'Comfort Issue': 0, 'Color Mismatch': 0 },
    { month: 'May', 'Size Issue': 36, 'Quality Issue': -44, 'Comfort Issue': 15, 'Color Mismatch': -50 },
    { month: 'Jun', 'Size Issue': 7, 'Quality Issue': -20, 'Comfort Issue': -7, 'Color Mismatch': 20 },
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

  // Comparative breakdown data
  const comparativeBreakdown = [
    { category: 'Size Issue', change: '+12%', severity: 'negative' },
    { category: 'Quality Issue', change: '-5%', severity: 'positive' },
    { category: 'Comfort Issue', change: '+8%', severity: 'negative' },
    { category: 'Color Mismatch', change: '+2%', severity: 'negative' },
    { category: 'Material Difference', change: '-3%', severity: 'positive' },
  ];

  // Problematic products data
  const problematicProducts = [
    { product: 'DIYR Sunglasses', issue: 'Quality Issue', rate: '32%', suggestion: 'Revise material descriptions and quality control.' },
    { product: 'Comfort Shoes XL', issue: 'Size Issue', rate: '28%', suggestion: 'Update sizing guide with more detailed measurements.' },
  ];
  
  // Top return reasons with frequency counts
  const topReasons = [
    { reason: 'Size Issue', count: 28, change: '+12%', color: '#4A90E2' },
    { reason: 'Quality Issue', count: 12, change: '-5%', color: '#82ca9d' },
    { reason: 'Comfort Issue', count: 10, change: '+8%', color: '#8884d8' },
    { reason: 'Color Mismatch', count: 8, change: '+2%', color: '#ffc658' },
    { reason: 'Material Difference', count: 6, change: '-3%', color: '#ff8042' }
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

  // Custom tooltip for sentiment by category
  const CustomStackedBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.fill }}>
              {item.name}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for trend data
  const CustomTrendTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.value >= 0 ? '#F44336' : '#4CAF50' }}>
              {item.name}: {item.value > 0 ? '+' : ''}{item.value}%
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
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="dashboard-section-title">Feedback Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Sentiment Intelligence */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Sentiment Intelligence</h3>
          
          {/* Overall Sentiment Overview (Compact Pie Chart) */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Overall Sentiment Distribution</h4>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
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
            <div className="flex justify-center items-center space-x-6 mt-1">
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
          
          {/* Sentiment Breakdown by Product Category (Stacked Bar Chart) */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Sentiment by Category</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sentimentByCategory}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                  <YAxis dataKey="category" type="category" width={75} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomStackedBarTooltip />} />
                  <Bar dataKey="positive" stackId="a" fill="#4CAF50" />
                  <Bar dataKey="neutral" stackId="a" fill="#BBDEFB" />
                  <Bar dataKey="negative" stackId="a" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Top Negative Keywords (Tag Cloud / Keyword List) */}
          <div>
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Top Negative Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {negativeKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-lg text-sm font-medium bg-[#F0F0F0] text-[#4A4A4A] hover:bg-[#E0E0E0] transition-colors cursor-pointer"
                >
                  {keyword.word}
                  <span className="ml-1 text-xs opacity-80">({keyword.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle Panel: Feedback Drivers Analysis */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Feedback Drivers Analysis</h3>
          
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
            <div className="h-[150px]">
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
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              {topReasons.slice(0, 4).map((reason, idx) => (
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
          
          {/* Recent Trends (Line Graph) */}
          <div className="mb-5">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Recent Trends</h4>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={trendData}
                  margin={{ top: 5, right: 5, left: -5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(tick) => `${tick}%`} tick={{ fontSize: 12 }} width={35} domain={[-50, 50]} />
                  <Tooltip content={<CustomTrendTooltip />} />
                  <Bar dataKey="Size Issue" fill="#F44336" shape={<CustomBar />} />
                  <Bar dataKey="Quality Issue" fill="#4CAF50" shape={<CustomBar />} />
                  <Bar dataKey="Comfort Issue" fill="#F44336" shape={<CustomBar />} />
                  <Bar dataKey="Color Mismatch" fill="#4CAF50" shape={<CustomBar />} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Automatic Insights (Text-Based Summary) */}
          <div className="bg-[#F9F9F9] p-3 rounded-lg border border-[#EFEFEF]">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-1 flex items-center">
              <Info size={14} className="mr-1" /> AI Insights
            </h4>
            <p className="text-xs text-[#4A4A4A]">
              Size-related complaints have increased by 12% this month. Consider enhancing size descriptions or offering sizing guidance. Quality issues are decreasing, showing improvement.
            </p>
          </div>
        </div>
        
        {/* Right Panel: Comparative Analysis & Actionable Insights */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Comparative Analysis & Insights</h3>
          
          {/* Overall Dissatisfaction Trend (Line Graph) */}
          <div className="mb-5">
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Overall Dissatisfaction Trend</h4>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={comparativeData}
                  margin={{ top: 5, right: 10, left: -5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={35} 
                    tickFormatter={(tick) => `${tick}%`}
                    domain={[0, 30]}
                  />
                  <Tooltip 
                    content={<CustomLineTooltip />}
                    wrapperStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E0E0E0',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
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
          
          {/* Comparative Breakdown (Table View) */}
          <div className="mb-5">
            <Separator className="my-3 bg-[#E0E0E0]" />
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Feedback Category Changes</h4>
            
            <div className="space-y-3">
              {comparativeBreakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-[#4A4A4A]">{item.category}</span>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <Info size={12} className="ml-1 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Compared to previous {timeFilter.toLowerCase()}</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <span className={cn(
                    "text-sm font-medium flex items-center",
                    item.severity === 'negative' ? "text-[#F44336]" : "text-[#4CAF50]"
                  )}>
                    {item.severity === 'negative' ? 
                      <ArrowUp size={12} className="mr-1" /> : 
                      <ArrowDown size={12} className="mr-1" />
                    }
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product-Level Analysis & Recommendations */}
          <div>
            <Separator className="my-3 bg-[#E0E0E0]" />
            <h4 className="text-sm font-medium text-dashboard-text-body mb-2">Product-Level Analysis</h4>
            
            <div className="space-y-4">
              {problematicProducts.map((product, idx) => (
                <div key={idx} className="bg-[#F9F9F9] p-3 rounded-lg border border-[#EFEFEF]">
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
    </div>
  );
};

export default ConversationAnalysis;
