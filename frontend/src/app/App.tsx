import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from './providers/ChakraProvider';
import { router } from './router';

export const App = () => {
    return (
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
};
