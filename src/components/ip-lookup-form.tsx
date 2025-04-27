'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Search } from 'lucide-react';

// Use Zod's built-in IP validation which supports both IPv4 and IPv6
const ipAddressSchema = z.object({
  ipAddress: z.string()
    .min(1, { message: 'IP address is required.' })
    .ip({ message: 'Invalid IP address format (supports IPv4 and IPv6).' }),
});

type IpLookupFormValues = z.infer<typeof ipAddressSchema>;

interface IpLookupFormProps {
  onSubmit: (ipAddress: string) => void;
  isLoading: boolean;
}

export default function IpLookupForm({ onSubmit, isLoading }: IpLookupFormProps) {
  const form = useForm<IpLookupFormValues>({
    resolver: zodResolver(ipAddressSchema),
    defaultValues: {
      ipAddress: '',
    },
  });

  const handleSubmit = (values: IpLookupFormValues) => {
    onSubmit(values.ipAddress);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ipAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="ipAddress">IP Address</FormLabel>
              <FormControl>
                <Input
                  id="ipAddress"
                  placeholder="e.g., 8.8.8.8 or 2001:4860:4860::8888"
                  autoComplete="off"
                  {...field}
                  aria-invalid={form.formState.errors.ipAddress ? 'true' : 'false'}
                  aria-describedby="ipAddress-error"
                />
              </FormControl>
              <FormMessage id="ipAddress-error" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Looking up...
            </>
          ) : (
             <>
              <Search className="mr-2 h-4 w-4" />
              Lookup IP
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
