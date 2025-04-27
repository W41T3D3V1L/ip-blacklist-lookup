/**
 * Represents details about an IP address from the API response.
 * Field names might differ based on the specific API (e.g., APIVerve).
 */
export interface IpDetails {
  /**
   * The numeric range representing the IP block.
   * Optional as it might not always be present.
   */
  range?: [number, number];
  /**
   * The country associated with the IP address (e.g., "BR", "US").
   * APIVerve might use 'country_code'.
   */
  country: string;
  /**
   * The region associated with the IP address. Might be empty.
   * APIVerve might use 'region'.
   */
  region: string;
  /**
   * The timezone associated with the IP address (e.g., "America/Sao_Paulo").
   * APIVerve might use 'timezone'.
   */
  timezone: string;
  /**
   * The latitude associated with the IP address.
   * Optional as it might not always be present.
   */
  latitude?: number;
  /**
   * The longitude associated with the IP address.
   * Optional as it might not always be present.
   */
  longitude?: number;
}

/**
 * Represents the core data returned within the API response.
 * Field names need mapping from the specific API (e.g., APIVerve) in actions.ts.
 */
export interface IpBlacklistData {
  /**
   * The IP address that was looked up.
   * APIVerve might use 'ip'.
   */
  ipAddress: string;
  /**
   * Indicates whether the IP address is blacklisted.
   * APIVerve might use 'is_blacklisted'.
   */
  isIPBlacklisted: boolean;
  /**
   * Detailed information about the IP address.
   * Structure needs mapping from APIVerve response.
   */
  ipDetails?: IpDetails | null; // Allow null or undefined
  /**
   * Indicates if the IP address was successfully parsed by the API.
   * Optional based on API specifics. APIVerve might use 'parsed'.
   */
  parsed?: boolean;
}

/**
 * Represents the full response structure from the IP blacklist API.
 * Structure might differ based on the specific API (e.g., APIVerve).
 * Mapping is handled in actions.ts.
 */
export interface IpBlacklistResponse {
  /**
   * The status of the API request (e.g., "ok").
   * APIVerve might use a 'success' boolean instead.
   */
  status?: string; // Keep optional if 'success' is used
  /**
   * Indicates success or failure. APIVerve might use this.
   */
  success?: boolean;
   /**
   * Any error message returned by the API, or null if successful.
   * APIVerve might nest this under 'message' or 'data.message'.
   */
   error?: string | null;
   message?: string | null; // Added for APIVerve possibility
  /**
   * The core data containing the IP lookup results. Undefined on error.
   * APIVerve nests this under 'data'.
   */
  data?: IpBlacklistData | any; // Use 'any' temporarily until exact structure confirmed, mapping done in actions.ts
  /**
   * The HTTP status code of the API response.
   * APIVerve might not include this in the body, relying on HTTP status.
   */
  code?: number;
}

// Note: The actual API call logic and response mapping is in src/app/actions.ts (server action)
// This file now only contains the type definitions, adjusted for potential APIVerve structure.
