import type { ReactNode } from 'react';
import { Box, Flex, Icon, Link, Text, VStack, useColorModeValue, Heading } from '@chakra-ui/react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

// Simple icons (using standard Unicode or basic shapes if icons pkg not available, 
// but since we installed chakra, we likely lack an icon pack. 
// I'll use SVG icons directly for simplicity/independence)
const HomeIcon = () => (
    <Icon viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></Icon>
);

const QrIcon = () => (
    <Icon viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm8-2h8v8h-8zm2 2v4h4v-4z" /></Icon>
);

interface NavItemProps {
    icon: any;
    children: ReactNode;
    to: string;
}

const NavItem = ({ icon, children, to }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

    const activeBg = useColorModeValue('white', 'gray.700');
    const activeColor = 'blue.500';
    const inactiveColor = 'gray.500';

    return (
        <Link
            as={RouterLink}
            to={to}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive ? activeBg : 'transparent'}
                color={isActive ? activeColor : inactiveColor}
                boxShadow={isActive ? 'sm' : 'none'}
                _hover={{
                    bg: activeBg,
                    color: activeColor,
                }}
                transition="all 0.2s"
            >
                {icon && (
                    <Box mr="4" fontSize="16">
                        <icon.type {...icon.props} />
                    </Box>
                )}
                <Text fontSize="md" fontWeight={isActive ? 'bold' : 'medium'}>{children}</Text>
            </Flex>
        </Link>
    );
};

interface MobileProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MobileProps) => {
    const bg = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box minH="100vh" bg={bg}>
            {/* Sidebar */}
            <Box
                display={{ base: 'none', md: 'block' }}
                w="60"
                bg={bg}
                pos="fixed"
                h="full"
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                pt={8}
            >
                <Flex alignItems="center" mx="8" mb={10} justifyContent="space-between">
                    <Heading fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="blue.600">
                        PhishingApp
                    </Heading>
                </Flex>

                <VStack spacing={2} align="stretch">
                    <Text px={8} fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" mb={2}>
                        Principal
                    </Text>
                    <NavItem to="/dashboard" icon={<HomeIcon />}>
                        Dashboard
                    </NavItem>
                    <NavItem to="/qr" icon={<QrIcon />}>
                        Códigos QR
                    </NavItem>
                </VStack>
            </Box>

            {/* Main Content */}
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
};
