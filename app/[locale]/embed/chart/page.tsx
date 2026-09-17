'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CATEGORY_COLORS = [
  '#16a34a', // emerald
  '#ea580c', // orange
  '#2563eb', // blue
  '#d97706', // amber
  '#9333ea', // purple
  '#64748b', // slate
];

export default function EmbedChartPage() {
  const stats = useQuery(api.reports.dashboardStats);

  const fallbackData = [
    { name: 'Public Asset Misuse', value: 485, color: '#16a34a' },
    { name: 'Vote Buying & Handouts', value: 370, color: '#ea580c' },
    { name: 'Dark / Foreign Money', value: 215, color: '#2563eb' },
    { name: 'Undeclared Billboards', value: 180, color: '#d97706' },
    { name: 'Official Bribery', value: 110, color: '#9333ea' },
  ];

  const data = stats?.byCategory && Object.keys(stats.byCategory).length > 0
    ? Object.entries(stats.byCategory).map(([name, value], i) => ({
        name: name.replace(/-/g, ' '),
        value: Number(value),
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      }))
    : fallbackData;

  return (
    <div className="w-full h-full min-h-[360px] p-4 bg-background text-foreground flex flex-col justify-between font-sans antialiased border rounded-xl overflow-hidden">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div>
          <h2 className="font-display font-bold text-sm sm:text-base text-foreground">
            Electoral Malpractice by Category
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Knight Watch Kenya • Public Integrity Ledger
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono">
          LIVE FEED
        </Badge>
      </div>

      {/* Chart Area */}
      <div className="w-full h-[240px] my-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
                fontSize: '11px',
              }}
              formatter={(val: any, name: any) => [`${val} reports`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Widget Footer */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2">
        <span className="flex items-center gap-1 text-foreground font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> TI-Kenya Certified
        </span>
        <a 
          href="https://knightwatch.ke" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
        >
          knightwatch.ke <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
