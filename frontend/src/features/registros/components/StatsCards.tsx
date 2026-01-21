import { SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Box } from '@chakra-ui/react';
import type { Stats } from '../types/registro';

interface Props {
    stats: Stats | null;
}

export const StatsCards = ({ stats }: Props) => {
    if (!stats) return null;

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                <Stat>
                    <StatLabel color="gray.500">Total Registros</StatLabel>
                    <StatNumber fontSize="3xl">{stats.total}</StatNumber>
                    <StatHelpText>Global</StatHelpText>
                </Stat>
            </Box>

            {stats.byPage.map((item) => (
                <Box key={item.pagina} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                    <Stat>
                        <StatLabel color="gray.500">Página: {item.pagina}</StatLabel>
                        <StatNumber fontSize="3xl">{item.count}</StatNumber>
                        <StatHelpText>Registros capturados</StatHelpText>
                    </Stat>
                </Box>
            ))}
        </SimpleGrid>
    );
};
