
import React from 'react';
import { Info } from 'lucide-react';

interface AIInsightBoxProps {
  title?: string;
  insights: React.ReactNode;
}

const AIInsightBox = ({ title, insights }: AIInsightBoxProps) => (
  <div className="bg-[#F0F0F0] p-3 rounded-lg border border-[#EFEFEF] shadow-sm">
    <h4 className="text-sm font-medium text-dashboard-text-body mb-1 flex items-center">
      <Info size={14} className="mr-1" /> {title || "AI Insight"}
    </h4>
    {insights}
  </div>
);

export default AIInsightBox;
