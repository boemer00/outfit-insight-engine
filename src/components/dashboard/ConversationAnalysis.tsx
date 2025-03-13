
import React from 'react';
import SentimentChart from './SentimentChart';
import { MessageCircle } from 'lucide-react';

const ConversationAnalysis = () => {
  const sentimentData = [
    { name: 'Positive', value: 65, color: '#9DE9BC' },
    { name: 'Neutral', value: 25, color: '#F1F0FB' },
    { name: 'Negative', value: 10, color: '#FFDEE2' }
  ];
  
  const keywordData = [
    { text: 'slim-fit', value: 28 },
    { text: 'blue', value: 25 },
    { text: 'polo', value: 22 },
    { text: 'budget', value: 19 },
    { text: 'casual', value: 17 },
    { text: 'office', value: 15 },
    { text: 'summer', value: 13 },
    { text: 'quality', value: 12 },
    { text: 'vintage', value: 10 },
    { text: 'sustainable', value: 8 }
  ];
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="dashboard-section-title">Conversation Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sentiment Analysis */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Sentiment Analysis</h3>
          <SentimentChart data={sentimentData} />
        </div>
        
        {/* Top Keywords */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Top User Keywords</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {keywordData.map((keyword, index) => (
              <div 
                key={index}
                className="dashboard-chip text-xs"
                style={{ 
                  fontSize: `${Math.max(11, Math.min(15, 11 + keyword.value/10))}px`,
                  opacity: 0.7 + (keyword.value / 40)
                }}
              >
                {keyword.text}
                <span className="ml-1 text-xs opacity-60">({keyword.value})</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Snippets */}
        <div className="dashboard-card">
          <h3 className="dashboard-section-subtitle">Conversation Snippets</h3>
          <div className="space-y-4 mt-4 max-h-[200px] overflow-y-auto pr-2">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <MessageCircle size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">User Query</div>
                <p className="text-sm">I'm looking for a slim-fit blue polo that would work in an office setting</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-dashboard-accent">
                <MessageCircle size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">AI Response</div>
                <p className="text-sm">I recommend our Dark Blue Polo Shirt which has a tailored fit and business casual aesthetic.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <MessageCircle size={16} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">User Query</div>
                <p className="text-sm">Do you have anything more affordable? Looking to stay under $40</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationAnalysis;
