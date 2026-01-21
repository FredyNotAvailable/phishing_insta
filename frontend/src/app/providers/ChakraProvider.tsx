import { ChakraProvider as Provider } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const ChakraProvider = ({ children }: Props) => {
    return <Provider>{children}</Provider>;
};
