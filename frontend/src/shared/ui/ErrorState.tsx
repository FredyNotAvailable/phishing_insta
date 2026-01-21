import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';

interface Props {
    title?: string;
    message?: string;
}

export const ErrorState = ({ title = 'Error', message = 'Ha ocurrido un error inesperado.' }: Props) => {
    return (
        <Box py={4}>
            <Alert status="error" borderRadius="md">
                <AlertIcon />
                <Box>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Box>
            </Alert>
        </Box>
    );
};
