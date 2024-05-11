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
    useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { CloseIcon, StarIcon } from '@chakra-ui/icons';

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
    const { userId } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/drinks/history/${userId}`);
                setDrinks(response.data);
            } catch (error) {
                console.error('Drinksの取得に失敗しました:', error);
            }
        };

        fetchDrinks();
    }, [userId]);

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await axios.delete(`http://localhost:3000/drinks/${deleteId}`);
                setDrinks(drinks.filter(drink => drink.id !== deleteId));
                onClose(); // 削除ダイアログを閉じる
            } catch (error) {
                console.error('削除に失敗しました:', error);
            }
        }
    };

    const toggleFavorite = async (id: string) => {
        // 現在のお気に入り状態を反転させる
        const drinkToUpdate = drinks.find(drink => drink.id === id);
        if (!drinkToUpdate) return;  // ドリンクが見つからない場合は何もしない
    
        const newFavStatus = !drinkToUpdate.isFavoriteFlg;
        try {
            // サーバーに新しい状態を送信
            const response = await axios.post(`http://localhost:3000/drinks/favorite/${id}`, { isFavorite: newFavStatus });
            if (response.status === 200) {
                // UIを更新する
                setDrinks(drinks.map(drink => drink.id === id ? { ...drink, isFavoriteFlg: newFavStatus } : drink));
            }
        } catch (error) {
            console.error('お気に入りの切り替えに失敗しました:', error);
        }
    };

    return (
        <>
            <Header />
            <ChakraProvider>
                <StyledFlex>
                    <Link href="/Analyze" passHref>
                        <Button as="a">診断画面に戻る</Button>
                    </Link>
                </StyledFlex>
                <TitleHistory />
                <Flex wrap="wrap" justifyContent="space-around">
                    {drinks.map(drink => (
                        <Box position="relative" key={drink.id} p="5" m="2" boxShadow="base">
                            <IconButton
                                aria-label="Delete drink"
                                icon={<CloseIcon />}
                                colorScheme="gray"
                                position="absolute"
                                top="1"
                                right="1"
                                borderRadius="full" // Make the button round
                                size="sm" 
                                onClick={() => { setDeleteId(drink.id); onOpen(); }}
                            />
                            <IconButton
                                aria-label="Toggle favorite"
                                icon={<StarIcon />}
                                colorScheme={drink.isFavoriteFlg ? "yellow" : "gray"}  // お気に入り状態によって色を変えます
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
                                    <Text fontSize="md" fontStyle="italic">商品説明: {drink.description}</Text>
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
                </Flex>
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
    );
};

const StyledFlex = styled(Flex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
`;

export default History;
