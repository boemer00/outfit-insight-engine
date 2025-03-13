
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SentimentChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
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
      
      <div className="flex justify-center items-center space-x-6 mt-2">
        {data.map((item, index) => (
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
  );
};

export default SentimentChart;
