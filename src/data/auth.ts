import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
export type { User };

// It runs securely on the server to get the user's session from cookies.
export const getUserSession = createServerFn({ method: 'GET' }).handler(
  async function () {
    // 1. Get the cookie from the request headers
    const cookie = this.request.headers.get('Cookie');
    if (!cookie) return null;

    // 2. Get Supabase keys from server environment
    const supabaseUrl = this.env.VITE_SUPABASE_URL;
    const supabaseKey = this.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase env vars not set on server');
    }

    // 3. Create a new, request-specific Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Cookie: cookie, // Pass the user's cookie to this client
        },
      },
    });

    // 4. Call getUser() with ZERO arguments.
    // This client will now use the cookie to find the user.
    const { data } = await supabase.auth.getUser();

    return data.user ?? null;
  }
);

// This is the client-side key to call our server function
export const authQueries = {
  session: () =>
    queryOptions({
      queryKey: ['auth', 'session'],
      queryFn: getUserSession,
      staleTime: 1000 * 60 * 5, // Cache session for 5 mins
    }),
};

