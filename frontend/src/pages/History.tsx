import { Header } from "@/components/Header";
import { TitleHistory } from "@/components/TitleHistory";
import { Footer } from "@/components/Footer";
import styled from 'styled-components';
import {
    ChakraProvider,
    Button,
    Flex,
    Image,
    Text,
    VStack,
    HStack,
    Box,
    Badge,
    IconButton,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Switch,
    SimpleGrid
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { CloseIcon, StarIcon } from '@chakra-ui/icons';
import ProtectedPage from '@/components/ProtectedPage';
import ReactPaginate from 'react-paginate';

interface Drink {
    id: string;
    image: string;
    name: string;
    size: string;
    calories: number;
    protein: number;
    customs: string[];
    description: string;
    comments?: string; 
    isFavoriteFlg: boolean;
}

const History = () => {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const drinksPerPage = 5;
    const { userId } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/history/${userId}`);
                setDrinks(response.data);
            } catch (error) {
                console.error('Drinksの取得に失敗しました:', error);
            }
        };

        fetchDrinks();
    }, [userId]);

    useEffect(() => {
        setCurrentPage(0);  // フィルター変更時にページをリセット
    }, [showFavorites]);

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/${deleteId}`);
                setDrinks(drinks.filter(drink => drink.id !== deleteId));
                onClose(); // 削除ダイアログを閉じる
            } catch (error) {
                console.error('削除に失敗しました:', error);
            }
        }
    };

    const toggleFavorite = async (id: string) => {
        const drinkToUpdate = drinks.find(drink => drink.id === id);
        if (!drinkToUpdate) return;
        const newFavStatus = !drinkToUpdate.isFavoriteFlg;
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/favorite/${id}`, { isFavorite: newFavStatus });
            if (response.status === 200) {
                setDrinks(drinks.map(drink => drink.id === id ? { ...drink, isFavoriteFlg: newFavStatus } : drink));
            }
        } catch (error) {
            console.error('お気に入りの切り替えに失敗しました:', error);
        }
    };

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * drinksPerPage;
    const filteredDrinks = drinks.filter(drink => !showFavorites || drink.isFavoriteFlg);
    const currentDrinks = filteredDrinks.slice(offset, offset + drinksPerPage);
    const pageCount = Math.ceil(filteredDrinks.length / drinksPerPage);

    return (
        <ProtectedPage>
            <>
                <Header />
                <ChakraProvider>
                    <MainContainer>
                        <Box p="5" m="2" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" borderRadius="md" background="white" width="100%" maxWidth="800px">
                            <Link href="/Analyze" passHref>
                                <Button as="a" mb={4}>診断画面に戻る</Button>
                            </Link>
                            <TitleHistory />
                            <Flex justifyContent="center" alignItems="center" mb={4}>
                                <Text mr={2}>お気に入りのみ表示:</Text>
                                <Switch
                                    isChecked={showFavorites}
                                    onChange={(e) => setShowFavorites(e.target.checked)}
                                    colorScheme="teal"
                                />
                            </Flex>
                            <SimpleGrid columns={1} spacing={4}>
                                {currentDrinks.map(drink => (
                                    <Box 
                                        position="relative" 
                                        key={drink.id} 
                                        p="5" 
                                        m="2" 
                                        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" 
                                        borderRadius="md" 
                                        background="white" 
                                        width="100%" 
                                        maxWidth="800px"
                                    >
                                        <IconButton
                                            aria-label="Delete drink"
                                            icon={<CloseIcon />}
                                            colorScheme="gray"
                                            position="absolute"
                                            top="1"
                                            right="1"
                                            borderRadius="full"
                                            size="sm"
                                            onClick={() => { setDeleteId(drink.id); onOpen(); }}
                                        />
                                        <IconButton
                                            aria-label="Toggle favorite"
                                            icon={<StarIcon />}
                                            colorScheme={drink.isFavoriteFlg ? "yellow" : "gray"}
                                            onClick={() => toggleFavorite(drink.id)}
                                        />
                                        <HStack align="center" spacing="5">
                                            <VStack>
                                                <Image src={`https://product.starbucks.co.jp${drink.image}`} boxSize="150px" alt="商品画像"/>
                                                <Text fontSize="lg">{drink.name}({drink.size})</Text>
                                                <Box>
                                                    <Badge colorScheme="green">カロリー: {drink.calories}</Badge>
                                                    <Badge ml="2" colorScheme="blue">タンパク質: {drink.protein}</Badge>
                                                </Box>
                                                <Box textAlign="left">
                                                    {drink.customs && drink.customs.map((custom, index) => (
                                                        <Text key={index}>・{custom}</Text>
                                                    ))}
                                                </Box>
                                                <Link href={`/CustomFromHistory/${drink.id}`} passHref>
                                                    <Button as="a" colorScheme="blue">カスタム編集</Button>
                                                </Link>
                                            </VStack>
                                            <VStack align="start" width="100%" maxW="600px">
                                                <Text fontSize="md" fontStyle="italic">商品説明: {removeHtmlTags(drink.description)}</Text>
                                                {drink.comments && <Text fontSize="md" fontStyle="italic">コメント: {drink.comments}</Text>}
                                                <HStack spacing="10" align="right">
                                                    <Link href={`/CommentEdit/${drink.id}`} passHref>
                                                        <Button as="a" colorScheme="green">コメント編集</Button>
                                                    </Link>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                            <Flex justifyContent="center" mt={4}>
                                <ReactPaginate
                                    previousLabel={'前へ'}
                                    nextLabel={'次へ'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    // breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                />
                            </Flex>
                        </Box>
                    </MainContainer>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    ドリンク削除確認
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    このドリンクを削除してもよろしいですか？
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        キャンセル
                                    </Button>
                                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                        削除
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </ChakraProvider>
                <Footer />
            </>
        </ProtectedPage>
    );
};

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
`;

export default History;

function removeHtmlTags(text: string | null): string {
    if (!text) return '';
    return text.replace(/<[^>]*>?/gm, '');
}
