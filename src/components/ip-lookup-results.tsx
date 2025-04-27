
'use client';

import type { IpBlacklistData } from '@/services/ip-blacklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, Clock, ShieldAlert, ShieldCheck, LocateFixed } from 'lucide-react';

interface IpLookupResultsProps {
  data: IpBlacklistData;
}

export default function IpLookupResults({ data }: IpLookupResultsProps) {
  const { ipAddress, isIPBlacklisted, ipDetails } = data;

  // Simple country code to name mapping (consider a library for production)
  const getCountryName = (code: string | undefined | null): string => {
    if (!code || code === 'N/A') return 'N/A';
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(code) || code;
    } catch (e) {
      console.warn(`Could not get display name for country code: ${code}`, e);
      return code; // Fallback to code if Intl fails
    }
  };

  // Handle cases where ipDetails might be missing or fields are N/A or undefined
  const displayRegion = ipDetails?.region && ipDetails.region !== 'N/A' ? ipDetails.region : 'N/A';
  const displayTimezone = ipDetails?.timezone && ipDetails.timezone !== 'N/A' ? ipDetails.timezone : 'N/A';
  const countryCode = ipDetails?.country && ipDetails.country !== 'N/A' ? ipDetails.country : 'N/A';
  const displayCountry = getCountryName(countryCode);

  // Check specifically for undefined before formatting. If the API doesn't return lat/lon, these will be undefined.
  const hasLatitude = ipDetails?.latitude !== undefined;
  const hasLongitude = ipDetails?.longitude !== undefined;
  const displayLatitude = hasLatitude ? ipDetails!.latitude!.toFixed(4) : 'N/A';
  const displayLongitude = hasLongitude ? ipDetails!.longitude!.toFixed(4) : 'N/A';


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">
          Lookup Results for{' '}
          <span className="font-mono text-accent break-all">{ipAddress}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
          <div className="flex items-center space-x-2">
            {isIPBlacklisted ? (
              <ShieldAlert className="h-5 w-5 text-destructive" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-green-600" />
            )}
            <span className="font-medium text-secondary-foreground">
              Blacklist Status:
            </span>
          </div>
          {/* Ensure isIPBlacklisted is explicitly checked for boolean value */}
          {isIPBlacklisted !== undefined && (
              <Badge variant={isIPBlacklisted ? 'destructive' : 'default'} className={!isIPBlacklisted ? 'bg-green-600 text-white hover:bg-green-700' : ''}>
                {isIPBlacklisted ? 'Blacklisted' : 'Not Blacklisted'}
              </Badge>
          )}
           {/* Optionally show something if status is unknown */}
           {isIPBlacklisted === undefined && (
             <Badge variant="secondary">Status Unknown</Badge>
           )}
        </div>

        <div className="space-y-3 pt-2">
           <h3 className="text-lg font-medium text-primary mb-2 border-b pb-1">IP Details</h3>
            {/* Only render details if ipDetails object exists */}
            {ipDetails ? (
                <>
                 <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-accent" />
                  <span>
                    Country: <span className="font-medium text-foreground">{displayCountry} {countryCode !== 'N/A' ? `(${countryCode})` : ''}</span>
                  </span>
                </div>
                 <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>
                    Region: <span className="font-medium text-foreground">{displayRegion}</span>
                  </span>
                </div>
                 <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>
                    Timezone: <span className="font-medium text-foreground">{displayTimezone}</span>
                  </span>
                </div>
                 {/* Conditionally render Lat/Lon only if at least one is available */}
                 {(hasLatitude || hasLongitude) && (
                   <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                     <LocateFixed className="h-4 w-4 text-accent" />
                     <span>
                       Lat/Lon: <span className="font-medium text-foreground">{displayLatitude} / {displayLongitude}</span>
                     </span>
                   </div>
                 )}
                </>
            ) : (
                 <p className="text-sm text-muted-foreground">IP details not available.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
