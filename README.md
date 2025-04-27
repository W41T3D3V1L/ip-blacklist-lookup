# IP Lookout

IP Lookout is a simple web application built with Next.js that allows users to check if an IP address (IPv4 or IPv6) is blacklisted and retrieve basic geographical details associated with it.

## Screenshots

*(Add screenshots of the application here)*

*   **Main Interface:**
    ![Screenshot of the main IP lookup form](placeholder-main.png)
*   **Results (Not Blacklisted):**
    ![Screenshot showing results for a clean IP](placeholder-results-clean.png)
*   **Results (Blacklisted):**
    ![Screenshot showing results for a blacklisted IP](placeholder-results-blacklisted.png)

*(Replace `placeholder-*.png` with actual paths to your screenshots)*

## Features

*   **IP Blacklist Check:** Enter an IPv4 or IPv6 address to see if it appears on known blacklists.
*   **IP Geolocation:** View details like country, region, timezone, latitude, and longitude for the provided IP.
*   **Responsive Design:** Works on desktop and mobile devices.
*   **Modern UI:** Built with ShadCN UI components and Tailwind CSS for a clean look.
*   **Server Actions:** Uses Next.js Server Actions for secure API calls.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version 18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
*   A [RapidAPI](https://rapidapi.com/) account to get an API key for the IP Blacklist Lookup API.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your RapidAPI Key:
    ```env
    RAPIDAPI_KEY=your_rapidapi_key_here
    ```
    *   You need to subscribe to the [IP Blacklist Lookup API - APIVerve](https://rapidapi.com/APIVerve/api/ip-blacklist-lookup-api) on RapidAPI to get a key.

### Running the Application

1.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  Open [http://localhost:9002](http://localhost:9002) (or the specified port) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## Built With

*   [Next.js](https://nextjs.org/) - React Framework
*   [React](https://reactjs.org/) - JavaScript Library
*   [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
*   [ShadCN UI](https://ui.shadcn.com/) - UI Component Library
*   [Lucide React](https://lucide.dev/) - Icons
*   [Zod](https://zod.dev/) - Schema Validation
*   [React Hook Form](https://react-hook-form.com/) - Form Management
*   [RapidAPI (IP Blacklist Lookup API - APIVerve)](https://rapidapi.com/APIVerve/api/ip-blacklist-lookup-api) - Backend API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

*   **celikd**
