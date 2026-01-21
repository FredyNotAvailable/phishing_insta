import { Center, Spinner } from '@chakra-ui/react';

export const LoadingState = () => {
    return (
        <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
        </Center>
    );
};
