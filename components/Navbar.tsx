import { Navbar, Button, Spacer, Modal, Text, Input } from '@nextui-org/react';
import { User, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import React from 'react';

interface props {
    user: User
}

export const MainNav = ({user}: props) => {
    const supabase = useSupabaseClient();
    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handler = () => setVisible(true);
  
    const closeHandler = () => {
      setVisible(false);
    };

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if(error){
            console.log(error);
        };
    };

    async function updateUser() {

        if(email !== "" && email !== user.email) {
            const { data, error } = await supabase.auth.updateUser({ email: email });
        }

        if(password !== "") {
            const { data, error } = await supabase.auth.updateUser({ password: password });
        }

        closeHandler();
    }
    
    return (
        <div className="w-100">
            <Navbar isBordered variant="floating">
                <Navbar.Brand className="flex justify-center items-center">
                    <Text color="secondary" className="text-3xl font-extralight text-center">
                        Moments
                    </Text>
                </Navbar.Brand>
                <Navbar.Content activeColor="secondary" variant="underline-rounded">
                    <Spacer/>
                    <Button auto as={Navbar.Link} onPress={handler} light animated={false}>
                        Minha Conta
                    </Button>
                    <Modal
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={closeHandler}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={22} color="secondary">
                                Editar Dados 
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder={user.email}
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input.Password
                                bordered
                                fullWidth
                                color="secondary"
                                size="lg"
                                placeholder="Senha"
                                label="Senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer className="flex self-center">
                            <Button auto bordered color="secondary" onPress={closeHandler}>
                                Fechar
                            </Button>
                            <Button auto color="secondary" onPress={() => updateUser()}>
                                Editar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Spacer/>
                    <Button 
                        type="button" 
                        color="gradient" 
                        size="sm"
                        onPress={() => signOut()}
                    >
                        Sair
                    </Button>
                </Navbar.Content>
            </Navbar>
        </div>
    );
}