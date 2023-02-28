import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { Input, Button, Grid } from '@nextui-org/react';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MainNav } from '@/components/Navbar';
import { ImageCards } from '@/components/Card';

export default function Home() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        

        if(error){
            setError(true);
        };
    };

    
    return (
    <>
        {session === null ?
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
                <Head>
                    <title>Login</title>
                </Head>
                <div className="bg-neutral-100 p-10 shadow-2xl rounded-2xl">
                    <h1 className="text-5xl font-extralight mb-4 text-purple-800 text-center">
                        Moments
                    </h1>
                    <div className="w-80 h-72 flex flex-col justify-center items-center gap-4">
                        <Input 
                            placeholder="Email" 
                            size="xl"
                            onChange={(e) => setEmail(e.target.value)}
                            aria-labelledby="Email"
                            bordered
                            label="Email"
                            color="secondary"
                        />
                        <Input.Password
                            placeholder="Senha"
                            width="299px"
                            size="xl"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-labelledby="Senha"
                            bordered
                            label="Senha"
                            color="secondary"
                        />
                        <div className="flex gap-2">
                            <Button 
                                type="button" 
                                color="secondary" 
                                size="sm"
                                onPress={() => router.push('/register')}
                            >
                                Registrar
                            </Button>
                            <Button 
                                color="secondary" 
                                size="sm"
                                onPress={() => signInWithEmail()}
                            >
                                Login
                            </Button>
                        </div>
                        {error === true ?
                            <div className="w-9/12 rounded-xl bg-red-400 h-7 flex items-center text-center justify-center text-sm">
                                Credenciais inválidas
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        :
            <>
                <MainNav user={session.user} />
                <Grid.Container gap={2} justify="center" alignContent="center" alignItems="center">
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} >   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>   
                        <ImageCards />
                    </Grid>
                </Grid.Container>
            </>
        }
    </>
    );
}
