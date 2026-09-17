'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { MapView } from '@/components/map/MapView';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function EmbedMapPage() {
  const convexReports = useQuery(api.reports.listForMap, {});

  const fallbackReports = [
    {
      _id: 'rep-1',
      title: 'State vehicles deployed at campaign rally',
      category: 'misuse-of-public-resources',
      county: 'Uasin Gishu',
      location: 'Eldoret Sports Club Grounds',
      status: 'verified',
      coordinates: { lat: 0.5143, lng: 35.2698 },
    },
    {
      _id: 'rep-2',
      title: 'Uncapped cash handouts distributed inside polling precinct',
      category: 'vote-buying',
      county: 'Nairobi',
      location: 'Embakasi Central Sub-county',
      status: 'under_review',
      coordinates: { lat: -1.2921, lng: 36.8219 },
    },
    {
      _id: 'rep-3',
      title: 'Undisclosed corporate donation exceeding legal threshold',
      category: 'illegal-donations',
      county: 'Mombasa',
      location: 'Nyali Constituency',
      status: 'verified',
      coordinates: { lat: -4.0435, lng: 39.6682 },
    },
    {
      _id: 'rep-4',
      title: 'County sound truck equipment branded with party symbols',
      category: 'misuse-of-public-resources',
      county: 'Nakuru',
      location: 'Naivasha Town',
      status: 'under_review',
      coordinates: { lat: -0.3031, lng: 36.0800 },
    },
  ];

  const reports = (convexReports && convexReports.length > 0) ? convexReports : fallbackReports;

  return (
    <div className="w-full h-full min-h-[440px] p-2 bg-background text-foreground flex flex-col justify-between font-sans antialiased border rounded-xl overflow-hidden">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-2 px-2 py-1.5 border-b border-border/60">
        <div>
          <h2 className="font-display font-bold text-xs sm:text-sm text-foreground">
            Kenya Electoral Malpractice Map
          </h2>
          <p className="text-[10px] text-muted-foreground">
            Live Incident Hotspots • Knight Watch Kenya
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono">
          47 COUNTIES
        </Badge>
      </div>

      {/* Map View Container */}
      <div className="w-full flex-1 min-h-[340px] rounded-lg overflow-hidden my-1 border border-border/60">
        <MapView reports={reports} />
      </div>

      {/* Widget Footer */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-2 pt-1">
        <span className="flex items-center gap-1 text-foreground font-medium">
          <ShieldCheck className="w-3 h-3" /> TI-Kenya Verified
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
