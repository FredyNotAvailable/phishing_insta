import { Box, Button, Container, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <Container maxW="container.lg" py={20}>
            <VStack spacing={8} textAlign="center">
                <Heading size="2xl" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                    Feria de Ciencias: Phishing Demo
                </Heading>
                <Text fontSize="xl" color="gray.600">
                    Proyecto educativo para demostrar la captura de credenciales.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full" maxW="lg" pt={10}>
                    <Box p={6} border="1px" borderColor="gray.200" borderRadius="xl" shadow="sm">
                        <Heading size="md" mb={4}>Zona Pública</Heading>
                        <Text mb={4} fontSize="sm" color="gray.500">
                            Simulación de formularios de ingreso (QR)
                        </Text>
                        <VStack spacing={3}>
                            <Button as={RouterLink} to="/form/instagram" colorScheme="pink" width="full" variant="outline">
                                Login Instagram
                            </Button>
                            <Button as={RouterLink} to="/form/facebook" colorScheme="facebook" width="full" variant="outline">
                                Login Facebook
                            </Button>
                            <Button as={RouterLink} to="/form/google" colorScheme="red" width="full" variant="outline">
                                Login Google
                            </Button>
                        </VStack>
                    </Box>

                    <Box p={6} border="1px" borderColor="gray.200" borderRadius="xl" shadow="sm" bg="gray.50">
                        <Heading size="md" mb={4}>Administración</Heading>
                        <Text mb={4} fontSize="sm" color="gray.500">
                            Visualización de datos capturados
                        </Text>
                        <Button as={RouterLink} to="/dashboard" colorScheme="blue" width="full" size="lg">
                            Ir al Dashboard
                        </Button>
                    </Box>
                </SimpleGrid>
            </VStack>
        </Container>
    );
};
