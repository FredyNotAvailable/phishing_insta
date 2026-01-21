import { useEffect } from 'react';
import {
    Box,
    Heading,
    Flex,
    Button,
    Text,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Card,
    CardBody,
    Progress,
    HStack,
    Icon,
    VStack
} from '@chakra-ui/react';
import { useRegistros } from '../hooks/useRegistros';
import { RegistrosTable } from '../components/RegistrosTable';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { ErrorState } from '../../../shared/ui/ErrorState';

// Custom icons
const UserIcon = () => (
    <Icon viewBox="0 0 24 24" fill="currentColor" boxSize={6}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Icon>
);

export const DashboardPage = () => {
    const { registros, stats, loading, error, refreshData } = useRegistros();

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    if (loading && !stats) return <LoadingState />;

    const total = stats?.total || 0;

    // Sort pages by count desc for the hierarchy card
    const sortedPages = [...(stats?.byPage || [])].sort((a, b) => b.count - a.count);

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={8}>
                <Box>
                    <Heading size="lg" mb={1}>Dashboard</Heading>
                    <Text color="gray.500">Vista general de registros y actividad</Text>
                </Box>
                <HStack spacing={4}>
                    <Text fontSize="sm" color="gray.500">Ultima actualización: {new Date().toLocaleTimeString()}</Text>
                    <Button onClick={refreshData} colorScheme="blue" size="sm" variant="ghost">
                        Refrescar
                    </Button>
                </HStack>
            </Flex>

            {error && <ErrorState message={error} />}

            {/* Top Section: Main Stats */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                {/* Total Registros Card */}
                <Card bgGradient="linear(to-r, blue.500, purple.600)" color="white" borderRadius="xl" shadow="md">
                    <CardBody>
                        <Flex justify="space-between" align="start" mb={4}>
                            <Stat>
                                <StatLabel fontSize="sm" opacity={0.9}>Total Registros</StatLabel>
                                <StatNumber fontSize="4xl" fontWeight="bold">{total}</StatNumber>
                                <StatHelpText opacity={0.8} mb={0}>Capturados globalmente</StatHelpText>
                            </Stat>
                            <Box p={2} bg="whiteAlpha.300" borderRadius="lg">
                                <UserIcon />
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                {/* Page Hierarchy Card (Horizontal) */}
                <Card bg="white" borderRadius="xl" shadow="sm">
                    <CardBody>
                        <Heading size="sm" mb={4}>Jerarquía de Páginas (Top Hits)</Heading>
                        <VStack spacing={4} align="stretch">
                            {sortedPages.length === 0 ? (
                                <Text color="gray.500" fontSize="sm">No hay datos aún.</Text>
                            ) : (
                                sortedPages.map((page, idx) => {
                                    const percentage = total > 0 ? (page.count / total) * 100 : 0;
                                    const colorScheme = idx === 0 ? 'pink' : idx === 1 ? 'blue' : idx === 2 ? 'green' : 'orange';

                                    return (
                                        <Box key={page.pagina}>
                                            <Flex justify="space-between" mb={1}>
                                                <Text fontWeight="medium" fontSize="sm" textTransform="capitalize">
                                                    {page.pagina}
                                                </Text>
                                                <Text fontWeight="bold" fontSize="sm">
                                                    {page.count} ({percentage.toFixed(1)}%)
                                                </Text>
                                            </Flex>
                                            <Progress
                                                value={percentage}
                                                size="sm"
                                                colorScheme={colorScheme}
                                                borderRadius="full"
                                                bg="gray.100"
                                            />
                                        </Box>
                                    );
                                })
                            )}
                        </VStack>
                    </CardBody>
                </Card>
            </SimpleGrid>

            {/* Full Width Table Section */}
            <Card bg="white" borderRadius="xl" shadow="sm" mb={8} width="100%">
                <CardBody>
                    <Flex justify="space-between" align="center" mb={6}>
                        <Heading size="md">Historial Completo de Registros</Heading>
                        <Button size="xs" variant="outline" as="a" href="/api/usuarios" target="_blank">Exportar JSON</Button>
                    </Flex>
                    <Box overflowX="auto">
                        <RegistrosTable registros={registros} onDeleteSuccess={refreshData} />
                    </Box>
                </CardBody>
            </Card>
        </Box>
    );
};
