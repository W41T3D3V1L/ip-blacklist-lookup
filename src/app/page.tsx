'use client';

import * as React from 'react';
import type { IpBlacklistData } from '@/services/ip-blacklist';
import IpLookupForm from '@/components/ip-lookup-form';
import IpLookupResults from '@/components/ip-lookup-results';
import { lookupIpAddress } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [ipData, setIpData] = React.useState<Partial<IpBlacklistData> | null>(null); // Allow partial data
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleLookup = async (ipAddress: string) => {
    setIsLoading(true);
    setError(null);
    setIpData(null); // Clear previous results

    try {
      const result = await lookupIpAddress(ipAddress);

      // Check for specific warning about missing details first
      if (result.error && result.error.startsWith("Warning: IP Details were missing")) {
         console.warn(result.error); // Log the warning
         // Set the partial data received (which includes blacklist status but null ipDetails)
         if (result.data) {
            setIpData(result.data);
         }
         // Show a specific toast for this warning
         toast({
            title: 'Partial Results',
            description: 'IP details could not be retrieved, but blacklist status is available.',
            variant: 'default', // Or a custom 'warning' variant if defined
         });
         // Do not set main error state, let the partial results display with the toast warning
         setError(null);
      }
      // Handle other general errors returned by the server action
      else if (result.error) {
        console.error('Server action returned error:', result.error);
        setError(result.error);
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
        setIpData(null); // Ensure no stale data is shown on general error
      }
      // Handle success case with full data
      else if (result.data) {
        setIpData(result.data);
        setError(null); // Clear any previous error
      }
      // Handle unexpected case where no error and no data (should ideally not happen)
      else {
         const unexpectedError = 'No data or error received from API.';
         console.error(unexpectedError);
         setError(unexpectedError);
          toast({
              title: 'Error',
              description: unexpectedError,
              variant: 'destructive',
          });
         setIpData(null);
      }
    } catch (err: any) {
      // Catch errors during the fetch itself or unexpected JS errors in the try block
      console.error('Lookup failed (catch block):', err);
      const errorMessage = err.message || 'Failed to fetch IP information. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
       setIpData(null); // Ensure no stale data is shown on catch error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            IP Lookout
          </h1>
          <p className="mt-2 text-muted-foreground">
            Check if an IP address is blacklisted.
          </p>
        </div>

        <IpLookupForm onSubmit={handleLookup} isLoading={isLoading} />

        {isLoading && (
          <div className="flex justify-center items-center pt-8">
             <Loader2 className="h-8 w-8 animate-spin text-accent" />
             <span className="ml-2 text-muted-foreground">Looking up IP...</span>
          </div>
        )}

        {/* Display general error only if it exists and we are not loading */}
        {error && !isLoading && (
          <div className="pt-8 text-center text-destructive">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Render results if ipData exists (even if partial) and not loading */}
        {/* No need to check for error here again, error display is handled above */}
        {ipData && !isLoading && (
          <div className="pt-8">
            {/* Cast needed because ipData can be partial, but component expects full (or handles null internally) */}
            <IpLookupResults data={ipData as IpBlacklistData} />
          </div>
        )}
      </div>
    </main>
  );
}
