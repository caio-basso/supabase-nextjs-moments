import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Input, Button } from '@nextui-org/react';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Register() {
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    
    async function signUp() {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if(error){
            setError(true);
        } else {
            router.push('/')
        };
    };


    return (
    <>
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <Head>
                <title>Registrar</title>
            </Head>
            <div className="bg-neutral-100 p-10 shadow-2xl rounded-2xl">
                <h1 className="text-5xl font-extralight mb-4 text-purple-800 text-center">
                    Registrar
                </h1>
                <div className="w-80 h-72 flex flex-col justify-center items-center gap-4">
                    <Input 
                        placeholder="Digite um email válido" 
                        size="xl"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-labelledby="Digite seu email"
                        bordered
                        label="Email"
                        color="secondary"
                    />
                    <Input.Password
                        placeholder="Digite uma senha válida"
                        width="299px"
                        size="xl"
                        onChange={(e) => setPassword(e.target.value)}
                        aria-labelledby="Digite sua senha"
                        bordered
                        label="Senha"
                        color="secondary"
                    />
                    <div className="flex gap-2">
                        <Button 
                            type="button" 
                            color="secondary" 
                            size="sm"
                            onPress={() => router.push('/')}
                        >
                            Voltar
                        </Button>
                        <Button 
                            type="button" 
                            color="secondary" 
                            size="sm"
                            onPress={() => signUp()}
                        >
                            Registrar
                        </Button>
                    </div>
                    {error === true ?
                        <div className="w-9/12 rounded-xl bg-red-400 h-7 flex items-center text-center justify-center text-sm">
                            Usuário já cadastrado
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    </>
    );
}
