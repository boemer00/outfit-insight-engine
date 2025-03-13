
import React from 'react';
import { Clock, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductPerformance = () => {
  const productData = [
    {
      id: 1,
      name: 'Dark Polo Shirt',
      timesRecommended: 120,
      ctr: 30,
      crossSellUptake: 25,
      dropoutRate: 0,
      avgTimeOnPage: '1m 15s',
      mostPairedSku: 'DIYR Sunglasses',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Monoscape Tee',
      timesRecommended: 90,
      ctr: 25,
      crossSellUptake: 15,
      dropoutRate: 5,
      avgTimeOnPage: '0m 50s',
      mostPairedSku: 'Dash Force Sneakers',
      trend: 'up'
    },
    {
      id: 3,
      name: 'DIYR Sunglasses',
      timesRecommended: 50,
      ctr: 20,
      crossSellUptake: 10,
      dropoutRate: 3,
      avgTimeOnPage: '1m 05s',
      mostPairedSku: 'Monoscape Tee',
      trend: 'neutral'
    },
    {
      id: 4,
      name: 'Dark Phoenix Tee',
      timesRecommended: 30,
      ctr: 15,
      crossSellUptake: 5,
      dropoutRate: 1,
      avgTimeOnPage: '0m 40s',
      mostPairedSku: 'DIYR Sunglasses',
      trend: 'down'
    },
    {
      id: 5,
      name: 'Dash Force Sneakers',
      timesRecommended: 25,
      ctr: 10,
      crossSellUptake: 3,
      dropoutRate: 8,
      avgTimeOnPage: '1m 20s',
      mostPairedSku: 'Other',
      trend: 'down'
    }
  ];
  
  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="dashboard-section-title">Product Performance</h2>
      
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times Recommended</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR (%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cross-Sell Uptake (%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropout Rate (%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time on Page</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Most Paired With</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productData.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 rounded-md bg-gray-100 mr-3"></div>
                      <div className="font-medium text-dashboard-text-heading">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{product.timesRecommended}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium">{product.ctr}%</div>
                      <div className={cn(
                        "ml-2 flex items-center text-xs",
                        product.trend === 'up' ? "text-green-500" : 
                        product.trend === 'down' ? "text-red-500" : 
                        "text-gray-400"
                      )}>
                        {product.trend === 'up' && <ArrowUpRight size={12} />}
                        {product.trend === 'down' && <ArrowDownRight size={12} />}
                        {product.trend === 'neutral' && <TrendingUp size={12} />}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{product.crossSellUptake}%</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{product.dropoutRate}%</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      <span>{product.avgTimeOnPage}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{product.mostPairedSku}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
