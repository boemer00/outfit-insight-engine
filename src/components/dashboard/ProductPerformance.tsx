
import React from 'react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProductPerformance = () => {
  const productData = [
    {
      id: 1,
      name: 'Dark Polo Shirt',
      unitsSold: 120,
      unitsReturned: 0,
      netSales: 120,
      returnRate: 0,
      firstTimeReturn: 0,
      returnLag: 0,
      topReasons: '-',
    },
    {
      id: 2,
      name: 'Monoscape Tee',
      unitsSold: 90,
      unitsReturned: 5,
      netSales: 85,
      returnRate: 6,
      firstTimeReturn: 30,
      returnLag: 3,
      topReasons: 'Size Issue',
    },
    {
      id: 3,
      name: 'DIYR Sunglasses',
      unitsSold: 50,
      unitsReturned: 18,
      netSales: 32,
      returnRate: 36,
      firstTimeReturn: 25,
      returnLag: 5,
      topReasons: 'Quality Issue',
    },
    {
      id: 4,
      name: 'Dark Phoenix Tee',
      unitsSold: 30,
      unitsReturned: 2,
      netSales: 28,
      returnRate: 7,
      firstTimeReturn: 2,
      returnLag: 1,
      topReasons: 'Size Issue',
    },
    {
      id: 5,
      name: 'Dash Force Sneakers',
      unitsSold: 25,
      unitsReturned: 6,
      netSales: 19,
      returnRate: 24,
      firstTimeReturn: 67,
      returnLag: 7,
      topReasons: 'Comfort Issue',
    }
  ];
  
  // Helper function to determine color based on percentage
  const getPercentageColor = (percentage: number) => {
    if (percentage <= 10) return 'bg-[#F2FCE2] text-green-800';
    if (percentage <= 24) return 'bg-[#FEC6A1] text-orange-800';
    return 'bg-[#ea384c] text-white';
  };

  return (
    <div className="dashboard-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="dashboard-section-title">Product Performance</h2>
      
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Units Returned</TableHead>
                <TableHead className="text-right">Net Sales</TableHead>
                <TableHead className="text-right">Return Rate (%)</TableHead>
                <TableHead className="text-right">First-Time Return (%)</TableHead>
                <TableHead className="text-right">Return Lag (Days)</TableHead>
                <TableHead>Top Reasons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 rounded-md bg-gray-100 mr-3"></div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{product.unitsSold}</TableCell>
                  <TableCell className="text-right">{product.unitsReturned}</TableCell>
                  <TableCell className="text-right">{product.netSales}</TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    getPercentageColor(product.returnRate)
                  )}>
                    {product.returnRate}%
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    getPercentageColor(product.firstTimeReturn)
                  )}>
                    {product.firstTimeReturn}%
                  </TableCell>
                  <TableCell className="text-right">{product.returnLag}</TableCell>
                  <TableCell>{product.topReasons}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
