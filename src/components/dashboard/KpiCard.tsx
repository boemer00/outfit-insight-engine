
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import SparklineChart from './SparklineChart';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number; // Percentage change
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: Array<{ value: number }>;
  sparklineColor?: string;
  icon?: React.ReactNode;
  formatter?: (value: string | number) => string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  sparklineData,
  sparklineColor = "#33C3F0",
  icon,
  formatter = (v) => v.toString(),
}) => {
  return (
    <div className="dashboard-kpi-card h-[130px] bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-sm font-medium text-dashboard-text-body">{title}</h3>
        {icon && <div className="text-dashboard-accent">{icon}</div>}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="mb-1">
          <span className="text-2xl font-medium text-dashboard-text-heading">
            {formatter(value)}
          </span>
          
          {change !== undefined && (
            <span 
              className={cn(
                "ml-2 inline-flex items-center text-xs font-medium",
                trend === 'up' ? "text-green-500" : 
                trend === 'down' ? "text-red-500" : 
                "text-gray-500"
              )}
            >
              {trend === 'up' && <ArrowUpRight size={12} className="mr-0.5" />}
              {trend === 'down' && <ArrowDownRight size={12} className="mr-0.5" />}
              {change > 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
        
        {sparklineData && (
          <div className="mt-auto">
            <SparklineChart data={sparklineData} color={sparklineColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
