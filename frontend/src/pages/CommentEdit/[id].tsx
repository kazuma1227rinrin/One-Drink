import { Header } from "@/components/Header";
import { TitleComment } from "@/components/TitleComment";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ChakraProvider, Box, Button, Container, Textarea, Image, Text, List, ListItem } from '@chakra-ui/react';
import ProtectedPage from '@/components/ProtectedPage';
import styled from 'styled-components';

interface Custom {
  id: number;
  name: string;
}

interface DrinkDetails {
  image: string;
  drink_name: string;
  size: string;
  comment: string;
  customs: Custom[];
}

const CommentEdit = () => {
  const router = useRouter();
  const { id } = router.query; // URLからドリンクIDを取得
  const [drinkDetails, setDrinkDetails] = useState<DrinkDetails>({
    image: '',
    drink_name: '',
    size: '',
    comment: '',
    customs: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/${id}`);
        setDrinkDetails({
          image: response.data.image,
          drink_name: response.data.drink_name,
          size: response.data.size,
          comment: response.data.comment,
          customs: response.data.customs
        });
      } catch (error) {
        console.error('ドリンクの詳細情報の取得に失敗しました:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSaveComment = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update_comment/${id}`, { comment: drinkDetails.comment });
      if (response.data.status === 'success') {
        router.push('/History');
      } else {
        alert('コメントの更新に失敗しました。');
      }
    } catch (error) {
      console.error('コメントの更新に失敗しました:', error);
      alert('コメントの更新に失敗しました。');
    }
  };

  return (
    <ProtectedPage>
    <>
      <Header />
      <ChakraProvider>
        <Container maxW="container.md" centerContent>
          <Card>
            <TitleComment/>
            {drinkDetails.image && (
              <Image src={`https://product.starbucks.co.jp${drinkDetails.image}`} alt="Drink Image" boxSize="300px" mt="4" />
            )}
            <Text fontSize="2xl" mt="4">{`${drinkDetails.drink_name} (${drinkDetails.size})`}</Text>
            {drinkDetails.customs.length > 0 && (
              <Box mt="4">
                <List spacing={2}>
                  {drinkDetails.customs.map(custom => (
                    <ListItem key={custom.id}>{custom.name}</ListItem>
                  ))}
                </List>
              </Box>
            )}
            <Box mt="4" width="100%">
              <Textarea value={drinkDetails.comment} onChange={(e) => setDrinkDetails({ ...drinkDetails, comment: e.target.value })} placeholder="このドリンクにコメントを書こう！" />
            </Box>
            <Button mt="4" colorScheme="blue" onClick={handleSaveComment}>コメントを保存する</Button>
          </Card>
        </Container>
      </ChakraProvider>
      <Footer />
    </>
    </ProtectedPage>
  );
};

export default CommentEdit;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
`;
