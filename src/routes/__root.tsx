import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { DefaultCatchBoundary } from '@/components/default-catch-boundary';
import { NotFound } from '@/components/not-found';
import appCss from '@/styles/app.css?url';
import { seo } from '../utils/seo';
import { Providers } from '../components/poviders';

// 1. Import our new auth service
import { authQueries, type User } from '@/data/auth';

// 2. Define our router's context
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  userSession: User | null; // This is our global auth state
}>()({
  // 3. This runs on EVERY page load
  beforeLoad: async ({ context }) => {
    let userSession: User | null = null;
    try {
      // Fetch the user session. This will be fast (from cache) or
      // run the `getUserSession` server function
      userSession = await context.queryClient.fetchQuery(
        authQueries.session()
      );
    } catch (e) {
      // User is not logged in
      userSession = null;
    }

    // Return the session to be added to the context
    return { userSession };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'My Personal Site',
        description: `My personal collection of thoughts, videos, and music.`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // ... your favicons ...
    ],
  }),
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}