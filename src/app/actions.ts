'use server';

import type { IpBlacklistResponse, IpBlacklistData, IpDetails } from '@/services/ip-blacklist'; // Ensure IpBlacklistData is imported

// API Endpoint and Host - Updated based on the user's working snippet
const API_ENDPOINT = 'https://ip-blacklist-lookup-api-apiverve.p.rapidapi.com/v1/ipblacklistlookup';
const API_HOST = 'ip-blacklist-lookup-api-apiverve.p.rapidapi.com';

// Fetch the API key from environment variables
const API_KEY = process.env.RAPIDAPI_KEY;

// Initial check at server start (might not reflect runtime issues)
if (!API_KEY) {
    console.error("Startup Check Error: RAPIDAPI_KEY environment variable is not set. Ensure it's added to your .env file (matching the key from the working snippet) and the server is restarted.");
} else {
    console.log("Startup Check: RAPIDAPI_KEY seems configured.");
}

export async function lookupIpAddress(
  ipAddress: string
): Promise<Partial<IpBlacklistResponse>> { // Return partial to handle errors gracefully

  console.log(`Server Action: Received lookup request for IP: ${ipAddress}`);

  // Runtime check for API Key
  if (!API_KEY) {
     const errorMessage = "Server Action Error: RAPIDAPI_KEY is missing or not loaded at runtime. Check .env file (should match the key from the working snippet: '0439e6a05b...') and server configuration.";
     console.error(errorMessage);
     return { error: errorMessage, code: 500 };
  } else {
    // Log only a few characters for security, but confirm it's loaded
    console.log(`Server Action: Using API Key starting with: ${API_KEY.substring(0, 5)}...`);
  }


  if (!ipAddress) {
    return { error: 'IP address is required.', code: 400 };
  }

  // Validate IP format (basic check, zod handles more complex cases in the form)
  // Regex supports both IPv4 and IPv6 basic structures
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
   if (!ipRegex.test(ipAddress)) {
     return { error: 'Invalid IP address format provided to server action.', code: 400 };
   }


  // Construct URL with IP as a query parameter
  const url = `${API_ENDPOINT}?ip=${encodeURIComponent(ipAddress)}`;

  const options = {
    method: 'GET',
    headers: {
      // Use lowercase header keys as per the user's snippet
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
      'Accept': 'application/json' // Added Accept header
    },
  };

  try {
    console.log(`Fetching from: ${url}`); // Log the URL being fetched
    console.log(`Using Host: ${API_HOST}`); // Log the host being used
    // Avoid logging the full key in production logs if possible
    // console.log(`Using Headers: ${JSON.stringify(options.headers)}`);
    const response = await fetch(url, options);
    console.log(`Response status: ${response.status}`); // Log the response status

    if (!response.ok) {
      // Attempt to parse error body if available
      let errorBody = null;
      let errorMessage = `API Error (${response.status}): ${response.statusText || 'Unknown error'}`;

      // Refined 404 message specifically mentioning the tested endpoint/host
      if (response.status === 404) {
          errorMessage = `API Error (404): API endpoint not found at ${url} (Host: ${API_HOST}). Please double-check the API endpoint URL in actions.ts. Also, verify your RapidAPI Key in .env is correct, active, and subscribed to the 'IP Blacklist Lookup API - APIVerve' API on RapidAPI.`;
      }

      try {
          // Try parsing as JSON first
          errorBody = await response.clone().json(); // Clone response to allow reading body multiple times if needed
          console.error('API Error Body (JSON):', errorBody);
          // Use message from error body if available, but prioritize the 404 message if status is 404
          if (response.status !== 404) {
            // Check for various possible error message structures from the API
            if (errorBody && errorBody.message) {
                errorMessage = `API Error (${response.status}): ${errorBody.message}`;
            } else if (errorBody && errorBody.data && errorBody.data.message) { // Check nested message for apiVerve format
                 errorMessage = `API Error (${response.status}): ${errorBody.data.message}`;
            } else if (errorBody && errorBody.error && typeof errorBody.error === 'string') {
                 errorMessage = `API Error (${response.status}): ${errorBody.error}`;
            } else if (errorBody && errorBody.errors && Array.isArray(errorBody.errors) && errorBody.errors.length > 0) {
                 errorMessage = `API Error (${response.status}): ${errorBody.errors.join(', ')}`;
            } else if (errorBody && typeof errorBody === 'string') {
                 errorMessage = `API Error (${response.status}): ${errorBody}`;
            } else {
                 errorMessage = `API Error (${response.status}): Unexpected error format received.`;
            }
          }
      } catch (parseError) {
          console.warn('Failed to parse error response body as JSON:', parseError);
          // If JSON parsing fails, try reading as text, but prioritize the 404 message if status is 404
          if (response.status !== 404) {
              try {
                const errorText = await response.text();
                console.error('API Error Text Body:', errorText);
                if (errorText) {
                    errorMessage = `API Error (${response.status}): ${errorText}`;
                } else {
                     errorMessage = `API Error (${response.status}): ${response.statusText || 'Could not read error details.'}`;
                }
              } catch (textError) {
                 console.error('Failed to read error response body as text:', textError);
                 errorMessage = `API Error (${response.status}): ${response.statusText || 'Failed to parse error response.'}`;
              }
          }
      }

      console.error(`Final Error Message: ${errorMessage}`);
      return { error: errorMessage, code: response.status };
    }

    const result: IpBlacklistResponse = await response.json();
    console.log('API Success Response:', JSON.stringify(result, null, 2)); // Log successful response prettified

    // Check for 'ok' status or 'success: true' flag
    if (result.status !== 'ok' && !result.success) {
        const appErrorMessage = result.error || result.message || result?.data?.message || 'API returned an unexpected status or error flag.';
        console.error('API returned an error status:', appErrorMessage);
        // Pass along the code if the API provided one in the body
        return { error: appErrorMessage, code: result.code || 500, data: result.data };
    }

    // Ensure data object exists before proceeding
    if (!result.data || typeof result.data !== 'object') {
        console.error('API response data is missing or not an object.');
        return { error: 'API returned ok status but data structure is invalid or missing.', code: 500 };
    }

    // Check if ipDetails object exists within data
    const details = result.data.ipDetails;
    let mappedIpDetails: IpDetails | null = null;

    if (details && typeof details === 'object') {
        // --- Corrected Mapping ---
        // Access nested ipDetails object
        mappedIpDetails = {
            country: details.country || 'N/A',
            region: details.region || 'N/A',
            timezone: details.timezone || 'N/A',
            latitude: details.latitude, // Add latitude (optional)
            longitude: details.longitude, // Add longitude (optional)
            range: details.range // Include if available
        };
    } else {
        console.warn("ipDetails object is missing in the API response data.");
        // We will still return the main data, but ipDetails will be null
    }


    const mappedData: IpBlacklistData = {
        ipAddress: result.data.ipAddress || ipAddress, // Get IP from response data or fallback
        isIPBlacklisted: result.data.isIPBlacklisted ?? false, // Use top-level field
        ipDetails: mappedIpDetails, // Assign the mapped (or null) details
        parsed: result.data.parsed // Include if available
    };

    // Check for warning if details were missing
    const warning = !mappedIpDetails ? "Warning: IP Details were missing from the API response." : undefined;


    return { status: result.status || 'ok', data: mappedData, code: result.code || 200, error: warning }; // Use 200 if no code provided, include warning if needed

  } catch (error: any) {
    console.error('Fetch failed:', error);
     // Handle network errors or other exceptions during fetch
    let networkErrorMessage = `Network error or failed to fetch: ${error.message}`;
    if (error.cause) {
        // Include cause if available (e.g., DNS resolution errors)
        networkErrorMessage += ` (Cause: ${error.cause})`;
    }
    return { error: networkErrorMessage, code: 500 };
  }
}
