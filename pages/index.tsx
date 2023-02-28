import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { Input, Button, Grid, Card, Col, Row, Text } from '@nextui-org/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MainNav } from '@/components/Navbar';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [images, setImages] = useState<any[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    async function getImages() {
        const { data, error } = await supabase
        .storage
        .from('images')
        .list(session?.user?.id + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc"}
        });

        if(data !== null) {
            setImages(data);
        } else {
            console.log(error);
        };
    };

    useEffect(() => {
        if(session?.user) {
            getImages()
        }
    }, [session?.user])

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        

        if(error){
            setError(true);
        };
    };

    async function uploadImage(e: any) {
        let image = e.target.files[0];

        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(session?.user.id + "/" + uuidv4(), image);

        if(data) {
            getImages();
        } else {
            console.log(error);
        };
    };

    async function deleteImage(image: string) {
        const { error } = await supabase
        .storage
        .from('images')
        .remove([ session?.user.id + "/" + image ])

        if (error) {
            console.log(error);
        } else {
            getImages();
        }
    } 

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
                <Head>
                    <title>Moments</title>
                </Head>
                <MainNav user={session.user} />
                <div>
                    <label className="flex items-center justify-center mt-4">
                        <span className="sr-only self-center">a</span>
                        <input 
                            type="file" 
                            className="
                                flex
                                self-center 
                                w-28
                                text-sm 
                                text-gray-500 
                                text-opacity-0
                                file:mr-4 
                                file:py-2 
                                file:px-4 
                                file:rounded-full 
                                file:border-0 
                                file:text-sm 
                                file:font-semibold 
                                file:bg-purple-500 
                                file:text-neutral-100
                                hover:file:bg-purple-400"
                            accept="image/png, image/jpg, image/jpeg" 
                            onChange={(e) => uploadImage(e)}
                            />
                    </label>
                </div>
                <Grid.Container gap={5} justify="center" alignContent="center" alignItems="center">
                    {images.map((image) => {
                        return (
                            <Grid xs={12} sm={6} md={4} key={image}>   
                                <Card css={{ w: "600px", h: "800px" }}>
                                    <Card.Body css={{ p: 0 }}>
                                        <Card.Image
                                        src={process.env.NEXT_PUBLIC_SUPABASE_DOMAIN_URL + session.user.id + "/" + image.name}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        alt="Moment"
                                        />
                                    </Card.Body>
                                    <Card.Footer
                                        isBlurred
                                        css={{
                                        position: "absolute",
                                        display: "flex",
                                        bgBlur: "#ffffff66",
                                        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                        bottom: 0,
                                        zIndex: 1,
                                        }}
                                    >
                                        <Row>
                                        <Col>
                                            <Row justify="center">
                                                <Button flat auto rounded color="secondary">
                                                    <Text
                                                        css={{ color: "inherit" }}
                                                        size={12}
                                                        weight="bold"
                                                        transform="uppercase"
                                                        onClick={() => deleteImage(image.name)}
                                                    >
                                                    Deletar
                                                    </Text>
                                                </Button>
                                            </Row>
                                        </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Grid> 
                        )
                    })}
                </Grid.Container>
            </>
        }
    </>
    );
}