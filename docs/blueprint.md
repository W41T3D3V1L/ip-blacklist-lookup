# **App Name**: IP Lookout

## Core Features:

- IP Input: Accept an IP address from the user via a text input field.
- API Fetch: Fetch IP blacklist data from the API using the provided IP address and API key stored in the .env file.
- Result Display: Display the IP address, blacklist status (true/false), and IP details (country, region, timezone) in a formatted manner.

## Style Guidelines:

- Primary color: Dark blue (#1A202C) for a professional look.
- Secondary color: Light gray (#EDF2F7) for background and subtle contrast.
- Accent color: Teal (#4DC0B5) to highlight key elements and actions.
- Clean and minimalist layout with clear separation of input and results.
- Simple, outline-style icons to represent different aspects of the IP information (e.g., location, status).

## Original User Request:
i want to build ip-blacklist-lookup in react vite(javascript) + tailwind css
make to put all me api keys in .env file

api 
Header Name
Header Value
accept-ranges
bytes
access-control-allow-credentials
true
access-control-allow-headers
Accept, Accept-Encoding, Content-Type, Content-Length, Origin, Referrer, Priority, User-Agent, Authorization, X-Requested-With, X-HTTP-Method-Override, x-api-key, x-jwt
access-control-allow-methods
GET, POST, PUT, DELETE, OPTIONS, HEAD
access-control-allow-origin
*
access-control-expose-headers
x-ratelimit-limit, x-ratelimit-remaining, x-ratelimit-reset, access-control-allow-origin, accept-ranges, age, allow, cache-control, connection, content-encoding, content-language, content-length, content-location, content-md5, content-disposition, content-range, content-type, date, etag, expires, last-modified, link, location, p3p, pragma, proxy-authenticate, refresh, retry-after, server, set-cookie, status, strict-transport-security, trailer, transfer-encoding, upgrade, vary, via, warning, www-authenticate, x-frame-options, public-key-pins, x-xss-protection, content-security-policy, x-content-security-policy, x-webkit-csp, x-content-type-options, x-powered-by, x-ua-compatible, X-RateLimit-rapid-free-plans-hard-limit-Limit, X-RateLimit-rapid-free-plans-hard-limit-Remaining, X-RateLimit-rapid-free-plans-hard-limit-Reset, X-RateLimit-Requests-Limit, X-RateLimit-Requests-Remaining, X-RateLimit-Requests-Reset, x-ratelimit-rapid-free-plans-hard-limit-limit, access-control-allow-methods, x-rapidapi-request-id, cf-ray, x-cache, report-to, x-ratelimit-requests-reset, x-cloud-trace-context, x-rapidapi-version, access-control-allow-credentials, x-orig-accept-language, x-cache-hits, access-control-expose-headers, nel, x-ratelimit-rapid-free-plans-hard-limit-remaining, server-timing, x-served-by, x-country-code, x-ratelimit-rapid-free-plans-hard-limit-reset, x-rapidapi-region, x-ratelimit-requests-remaining, x-ratelimit-requests-limit, cf-cache-status, access-control-max-age, x-timer, access-control-allow-headers, alt-svc
access-control-max-age
1728000
alt-svc
h3=":443"; ma=86400
cache-control
private
cf-cache-status
DYNAMIC
cf-ray
936f98d5ce83897a-SIN
content-length
218
content-type
application/json; charset=utf-8
date
Sun, 27 Apr 2025 16:11:44 GMT
nel
{"success_fraction":0,"report_to":"cf-nel","max_age":604800}
report-to
{"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v4?s=Rnmvf3%2BAjGjz2FftU9rB7yXzD%2FWUXMqDPBAaKJEFXJE3YF2UNdeu0OJ46MoR4l8rWkkxegf3eIO95utn0MVjE%2FWM7XFinmrboAe7WsgSMlVzUHQGB1IQRY6BWCugjSNQ4wSo"}],"group":"cf-nel","max_age":604800}
server
RapidAPI-1.2.8
server-timing
cfL4;desc="?proto=TCP&rtt=1110&min_rtt=1038&rtt_var=334&sent=5&recv=7&lost=0&retrans=0&sent_bytes=2983&recv_bytes=1712&delivery_rate=2813102&cwnd=252&unsent_bytes=0&cid=92f0a46f82ce7f22&ts=4275&x=0"
strict-transport-security
max-age=31556926
vary
cookie,need-authorization, x-fh-requested-host, accept-encoding
x-cache
MISS
x-cache-hits
0
x-cloud-trace-context
224e88b6289dd3f99b3146e7543d6374;o=1
x-country-code
SG
x-orig-accept-language
en-US,en;q=0.9,es;q=0.8
x-rapidapi-region
AWS - ap-southeast-1
x-rapidapi-request-id
6cd524d0f09ae09a5785a677a826e7d86a2ca8ab48f64c4d3f5d78afe370f442
x-rapidapi-version
1.2.8
x-ratelimit-rapid-free-plans-hard-limit-limit
500000
x-ratelimit-rapid-free-plans-hard-limit-remaining
499999
x-ratelimit-rapid-free-plans-hard-limit-reset
2591990
x-ratelimit-requests-limit
50
x-ratelimit-requests-remaining
49
x-ratelimit-requests-reset
2591990
x-served-by
cache-qpg120111-QPG
x-timer
S1745770300.846904,VS0,VE4224

Query sample Params

ip
*
201.23.192.173


api data
{
  "status": "ok",
  "error": null,
  "data": {
    "ipAddress": "201.23.192.173",
    "isIPBlacklisted": true,
    "ipDetails": {
      "range": [
        3373776896,
        3373785087
      ],
      "country": "BR",
      "region": "",
      "timezone": "America/Sao_Paulo"
    },
    "parsed": true
  },
  "code": 200
}
  