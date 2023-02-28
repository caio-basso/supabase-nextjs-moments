import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider>
        <Head>
          <meta name="description" content="Store your favorite moments" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.png" />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionContextProvider>
  )
}
