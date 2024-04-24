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
    Link as ChakraLink
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
}

const History = () => {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const userId = 0;

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
    }, []);

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
                        <HStack key={drink.id} p="5" m="2" boxShadow="base" align="center" spacing="5">
                            <VStack>
                                <Image src={`https://product.starbucks.co.jp${drink.image}`} boxSize="150px" alt="商品画像"/>
                                <Text fontSize="lg">{drink.name}({drink.size})</Text>
                                <Box>
                                    <Badge colorScheme="green">カロリー: {drink.calories}</Badge>
                                    <Badge ml="2" colorScheme="blue">タンパク質: {drink.protein}</Badge>
                                </Box>
                                <Box textAlign="left" >
                                {drink.customs && drink.customs.map((custom, index) => (
                                    <Text key={index}>・{custom}</Text>
                                ))}
                                </Box>
                                <Link href={`/CustomFromHistory/${drink.id}`} passHref>
                                        <Button as="a" colorScheme="blue">カスタム編集</Button>
                                </Link>
                            </VStack>
                            <VStack align="start" width="100%" maxW="600px">
                                <Text fontSize="md" fontStyle="italic" >商品説明: {drink.description}</Text>
                                {drink.comments && <Text fontSize="md" fontStyle="italic" >コメント: {drink.comments}</Text>}
                                <HStack spacing="10" align="right">
                                    <Link href={`/CommentEdit/${drink.id}`} passHref>
                                        <Button as="a" colorScheme="green">コメント編集</Button>
                                    </Link>                                    
                                </HStack>
                            </VStack>
                        </HStack>
                    ))}
                </Flex>
            </ChakraProvider>
            <Footer />
        </>
    );
}

const StyledFlex = styled(Flex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
`;

export default History;
