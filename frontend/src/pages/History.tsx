import { Header } from "@/components/Header";
import {TitleHistory} from "@/components/TitleHistory";
import {Footer} from "@/components/Footer";

import styled from 'styled-components';
import { 
    ChakraProvider,
    Button,
    Flex,
    Image, 
    Text,    
    VStack,
    HStack
} from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

const History = () => {
    // 状態としてdrinksを設定
    const [drinks, setDrinks] = useState([]);  
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
        <div style={{ paddingBottom: '1px' }}>
            <Header/>
        </div>        
        <div>
            <ChakraProvider>
                <StyledFlex>
                    <Link href="/Analyze" passHref>
                        <Button as="a">診断画面に戻る</Button>
                    </Link>                    
                </StyledFlex>                
                <TitleHistory />
                <Flex wrap="wrap" justifyContent="space-around">
                    {drinks.map(drink => (
                        <VStack key={drink.id} p="5" m="2" boxShadow="base" align="center" spacing="5">
                            <Image src={`https://product.starbucks.co.jp${drink.image}`} boxSize="150px" />
                            <Text fontSize="lg">{drink.name}</Text>
                            <HStack spacing="10">
                                <Button colorScheme="blue" onClick={() => {}}>カスタム編集</Button>
                                <Button colorScheme="green" onClick={() => {}}>コメント編集</Button>
                            </HStack>
                        </VStack>
                    ))}
                </Flex>            
            </ChakraProvider>
        </div>          
        <div>
            <Footer/>        
        </div>           
      </>
    );
}

// スタイリングされたFlexコンテナを定義
const StyledFlex = styled(Flex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 8px; 
`;
  
export default History;