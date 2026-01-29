import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    Text,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import type { Registro } from '../types/registro';
import { useState } from 'react';
import { useRegistros } from '../hooks/useRegistros';

// Icons using SVG directly
const ViewIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const ViewOffIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);
const DeleteIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

interface Props {
    registros: Registro[];
    onDeleteSuccess?: () => void;
}

const PasswordCell = ({ password }: { password?: string }) => {
    const [show, setShow] = useState(false);

    if (!password) return <Text color="gray.400">-</Text>;

    return (
        <InputGroup size="sm" maxW="200px">
            <Input
                type={show ? 'text' : 'password'}
                value={password}
                isReadOnly
                variant="filled"
                bg="transparent"
                _focus={{ bg: 'transparent' }}
                border="none"
                px={0}
            />
            <InputRightElement width="3rem">
                <IconButton
                    h="1.5rem"
                    size="sm"
                    variant="ghost"
                    onClick={() => setShow(!show)}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={show ? 'Ocultar password' : 'Ver password'}
                />
            </InputRightElement>
        </InputGroup>
    );
};

export const RegistrosTable = ({ registros /*, onDeleteSuccess*/ }: Props) => {
    /*
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { deleteRegistro } = useRegistros();
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        onOpen();
    };

    const confirmDelete = async () => {
        if (selectedId) {
            setIsDeleting(true);
            const success = await deleteRegistro(selectedId);
            setIsDeleting(false);
            if (success) {
                toast({
                    title: 'Registro eliminado',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose();

                // Call parent refresh if possible
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                } else if (window.location.pathname === '/dashboard') {
                    // Fallback only if prop not provided
                    window.location.reload();
                }
            } else {
                toast({
                    title: 'Error al eliminar',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };
    */

    return (
        <>
            <TableContainer width="100%">
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Fecha</Th>
                            <Th>Página</Th>
                            <Th>Email</Th>
                            <Th>Password</Th>
                            {/* <Th width="50px">Acción</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registros.map((registro) => (
                            <Tr key={registro.id}>
                                <Td fontSize="xs" whiteSpace="nowrap">
                                    {registro.created_at ? new Date(registro.created_at).toLocaleString() : '-'}
                                </Td>
                                <Td>
                                    <Badge colorScheme={
                                        registro.pagina === 'instagram' ? 'pink' :
                                            registro.pagina === 'facebook' ? 'blue' :
                                                registro.pagina === 'premio' ? 'purple' :
                                                    registro.pagina === 'spotify' ? 'green' : 'gray'
                                    }>
                                        {registro.pagina}
                                    </Badge>
                                </Td>
                                <Td fontWeight="medium">{registro.email}</Td>
                                <Td>
                                    <PasswordCell password={registro.password} />
                                </Td>
                                {/* <Td>
                                    <IconButton
                                        aria-label="Eliminar registro"
                                        icon={<DeleteIcon />}
                                        size="sm"
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => handleDeleteClick(registro.id)}
                                    />
                                </Td> */}
                            </Tr>
                        ))}
                        {registros.length === 0 && (
                            <Tr>
                                <Td colSpan={5} textAlign="center">
                                    <Text color="gray.500" p={4}>No hay registros capturados aún.</Text>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Eliminar Registro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={confirmDelete} isLoading={isDeleting}>
                            Eliminar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </>
    );
};
