
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start mb-2">
        <h3 className="text-sm text-dashboard-text-body font-medium">{title}</h3>
        {icon && <div className="ml-auto text-dashboard-accent">{icon}</div>}
      </div>
      
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
        <div className="h-16 mt-2">
          <SparklineChart data={sparklineData} color={sparklineColor} />
        </div>
      )}
    </div>
  );
};

export default KpiCard;
