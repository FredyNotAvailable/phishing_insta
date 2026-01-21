import { Container } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    maxW?: string;
}

export const PageContainer = ({ children, maxW = 'container.lg' }: Props) => {
    return (
        <Container maxW={maxW} py={8}>
            {children}
        </Container>
    );
};
