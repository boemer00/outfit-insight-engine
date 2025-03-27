
import React, { useState } from 'react';
import SentimentChart from './SentimentChart';
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
  Legend 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ConversationAnalysis = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState('month');
  const [productCategory, setProductCategory] = useState('all');

  // Mock data for Sentiment-Based Return Analysis
  const sentimentData = [
    { name: 'Positive', value: 35, color: '#4CAF50' },
    { name: 'Neutral', value: 40, color: '#BBDEFB' },
    { name: 'Negative', value: 25, color: '#F44336' }
  ];
  
  // Mock data for Return Reason Trend Analysis
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
    { month: 'Jan', 'Size Issue': 28, 'Quality Issue': 12, 'Comfort Issue': 10, 'Overall Dissatisfaction': 22 },
    { month: 'Feb', 'Size Issue': 24, 'Quality Issue': 14, 'Comfort Issue': 11, 'Overall Dissatisfaction': 20 },
    { month: 'Mar', 'Size Issue': 26, 'Quality Issue': 16, 'Comfort Issue': 9, 'Overall Dissatisfaction': 18 },
    { month: 'Apr', 'Size Issue': 22, 'Quality Issue': 18, 'Comfort Issue': 13, 'Overall Dissatisfaction': 19 },
    { month: 'May', 'Size Issue': 30, 'Quality Issue': 10, 'Comfort Issue': 15, 'Overall Dissatisfaction': 24 },
    { month: 'Jun', 'Size Issue': 32, 'Quality Issue': 8, 'Comfort Issue': 14, 'Overall Dissatisfaction': 26 },
  ];

  // Top return reasons with frequency counts
  const topReasons = [
    { reason: 'Size Issue', count: 28, change: '+12%' },
    { reason: 'Quality Issue', count: 12, change: '-5%' },
    { reason: 'Comfort Issue', count: 10, change: '+8%' },
    { reason: 'Color Mismatch', count: 8, change: '+2%' },
    { reason: 'Material Difference', count: 6, change: '-3%' }
  ];

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
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="dashboard-section-title">Feedback Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment-Based Return Analysis */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Sentiment Analysis</h3>
          <SentimentChart data={sentimentData} />
        </div>
        
        {/* Return Reason Trend Analysis */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Top Return Reasons</h3>
          
          <div className="flex flex-wrap justify-between items-center mb-4">
            <Select value={productCategory} onValueChange={setProductCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="shirts">Shirts</SelectItem>
                <SelectItem value="sunglasses">Sunglasses</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Button 
                variant={timeRange === 'month' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
              <Button 
                variant={timeRange === 'quarter' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeRange('quarter')}
              >
                Quarter
              </Button>
              <Button 
                variant={timeRange === 'custom' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeRange('custom')}
              >
                Custom
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {topReasons.map((tag, index) => (
              <div 
                key={index}
                className="dashboard-chip text-xs font-medium"
              >
                {tag.reason}
                <span className="ml-1 text-xs opacity-80">({tag.count})</span>
              </div>
            ))}
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={returnReasonData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={25} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="Size Issue" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Quality Issue" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Comfort Issue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Color Mismatch" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Comparative Analysis */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Comparative Analysis</h3>
          
          <div className="space-y-3 mb-4">
            {topReasons.slice(0, 4).map((reason, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm">{reason.reason}</span>
                <span className={`text-sm font-medium ${
                  reason.change.startsWith('+') ? 'text-[#F44336]' : 'text-[#4CAF50]'
                }`}>
                  {reason.change}
                </span>
              </div>
            ))}
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={comparativeData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={25} />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Overall Dissatisfaction" 
                  stroke="#F44336" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationAnalysis;
