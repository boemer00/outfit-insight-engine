
import React from 'react';
import SentimentPanel from './SentimentPanel';
import FeedbackDriversPanel from './FeedbackDriversPanel';
import ComparativePanel from './ComparativePanel';

const ConversationAnalysis = () => {
  // Mock data for Sentiment Intelligence (Left Panel)
  const sentimentData = [
    { name: 'Positive', value: 35, color: '#4CAF50' },
    { name: 'Neutral', value: 40, color: '#BBDEFB' },
    { name: 'Negative', value: 25, color: '#F44336' }
  ];
  
  // Mock data for Feedback Drivers Analysis - Updated for Area Chart
  const feedbackTrendsData = [
    { month: 'Jan', 'Size Issue': 28, 'Quality Issue': 12, 'Comfort Issue': 10, 'Color Mismatch': 8 },
    { month: 'Feb', 'Size Issue': 24, 'Quality Issue': 14, 'Comfort Issue': 11, 'Color Mismatch': 7 },
    { month: 'Mar', 'Size Issue': 26, 'Quality Issue': 16, 'Comfort Issue': 9, 'Color Mismatch': 9 },
    { month: 'Apr', 'Size Issue': 22, 'Quality Issue': 18, 'Comfort Issue': 13, 'Color Mismatch': 10 },
    { month: 'May', 'Size Issue': 30, 'Quality Issue': 10, 'Comfort Issue': 15, 'Color Mismatch': 5 },
    { month: 'Jun', 'Size Issue': 32, 'Quality Issue': 8, 'Comfort Issue': 14, 'Color Mismatch': 6 },
  ];

  // Mock data for Comparative Analysis - Current vs Previous Year
  const comparativeData = [
    { month: 'Jan', '2025': 22, '2024': 26 },
    { month: 'Feb', '2025': 20, '2024': 24 },
    { month: 'Mar', '2025': 18, '2024': 22 },
    { month: 'Apr', '2025': 19, '2024': 21 },
    { month: 'May', '2025': 24, '2024': 27 },
    { month: 'Jun', '2025': 26, '2024': 29 },
  ];

  // AI insight data for right panel
  const aiInsightData = {
    product: 'DIYR Sunglasses',
    issue: 'Quality Issue',
    rate: '32%',
    suggestion: 'Revise material descriptions and enhance quality control.'
  };
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="dashboard-section-title">Feedback Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Sentiment Intelligence & AI Insight */}
        <SentimentPanel sentimentData={sentimentData} />
        
        {/* Middle Panel: Feedback Drivers Analysis & AI Insight */}
        <FeedbackDriversPanel feedbackTrendsData={feedbackTrendsData} />
        
        {/* Right Panel: Comparative Analysis & AI Insight */}
        <ComparativePanel 
          comparativeData={comparativeData}
          aiInsightData={aiInsightData}
        />
      </div>
    </div>
  );
};

export default ConversationAnalysis;
