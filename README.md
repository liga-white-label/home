# Liga CUBB Home

This is the home website for Liga CUBB, built with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd liga-cubb-home
```

2. Install the dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

To run the project in development mode with hot-reload:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Additional Scripts

- Run linting:

```bash
npm run lint
```

- Type checking:

```bash
npm run type-check
```

- Watch mode type checking:

```bash
npm run type-check:watch
```

## Project Structure

- `/src` - Source code
  - `/app` - Next.js app directory containing pages and components
  - `/components` - Reusable React components
  - `/models` - Data models and types
  - `/repositories` - Data fetching and API integration
  - `/environment` - Environment configuration

## Main Dependencies

- Next.js - React framework
- Material-UI - UI component library
- React Query - Data fetching and state management
- Tailwind CSS - Utility-first CSS framework
- FontAwesome - Icon library
- Axios - HTTP client
- TypeScript - Type checking

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
