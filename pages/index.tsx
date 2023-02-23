import Head from 'next/head';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

export default function Home() {
    const router = useRouter();
    const user = useUser();

    supabase.auth.onAuthStateChange( async (event) => {
        if (event !== "SIGNED_OUT") {
            await router.push('/collections')
        } else {
            await router.push('/')
        }
    });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
        { user === null ?
            <div className="flex flex-col justify-center items-center h-screen bg-neutral-800">
                <h1 className="text-5xl font-extralight mb-4 text-neutral-400">
                    Moments
                </h1>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                />
            </div>
        :
            router.push('/collections')
        }
    </>
  );
}
