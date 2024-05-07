import { Header } from "@/components/Header";
import { TitleComment } from "@/components/TitleComment";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ChakraProvider, Box, Button, Container, Textarea, Image, Text, List, ListItem } from '@chakra-ui/react';

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
        const response = await axios.get(`http://localhost:3000/comment/${id}`);
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
      const response = await axios.post(`http://localhost:3000/update_comment/${id}`, { comment: drinkDetails.comment });
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
    <>
      <Header />
      <ChakraProvider>
        <Container maxW="container.md" centerContent>
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
        </Container>
      </ChakraProvider>
      <Footer />
    </>
  );
};

export default CommentEdit;
