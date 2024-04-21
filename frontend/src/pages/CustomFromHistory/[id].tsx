import { Header } from "@/components/Header";
import {TitleCustom} from "@/components/TitleCustom";
import {Footer} from "@/components/Footer";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Image,
  Flex,
  Select,
  Button,
  Container,
  Text
} from '@chakra-ui/react';

const CustomFromHistory = () => {
  const router = useRouter();
  const { id } = router.query; // URLからidを取得
  const [drink, setDrink] = useState(null);
  const [selectedCustoms, setSelectedCustoms] = useState([]);
  const [allCustoms, setAllCustoms] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:3000/drinks/${id}`);
        setDrink(response.data.drink);
        const initialCustoms = response.data.customs.map(custom => ({ id: custom.id }));
        // 元々紐付いているカスタムに加えて、必要な数の空のプルダウンを追加して合計3つになるようにする
        for (let i = initialCustoms.length; i < 3; i++) {
          initialCustoms.push({ id: '' });
        }
        setSelectedCustoms(initialCustoms);
        setAllCustoms(response.data.allCustoms);
        setLoading(false);
      } catch (error) {
        console.error('エラーが発生しました:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleCustomChange = (index, event) => {
    const updatedCustoms = [...selectedCustoms];
    const value = event.target.value;
    // 数値チェックを追加し、不正な入力を防ぐ
    updatedCustoms[index] = { id: value === '' ? '' : parseInt(value) };
    setSelectedCustoms(updatedCustoms);
  };

  const finalizeCustoms = async () => {
    // 空の文字列をフィルタリングして、有効なカスタムIDのみを送信する
    const customIds = selectedCustoms.map(custom => custom.id).filter(id => id !== '');
  
    try {
      const response = await axios.post(`http://localhost:3000/drinks/update/${id}`, {
        custom_ids: customIds
      });
      if (response.data.status === 'success') {
        alert('カスタムが更新されました！');
        router.push('/History');
      } else {
        alert('更新に失敗しました。' + response.data.message);
      }
    } catch (error) {
      console.error('カスタムの更新に失敗しました:', error);
      alert('カスタムの更新に失敗しました。');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header/>
      <ChakraProvider>
        <Container maxW="container.md" centerContent>
          <TitleCustom />
          {drink && (
            <Box textAlign="center" mt={4}>
                <Image src={`https://product.starbucks.co.jp${drink.image}`} alt={drink.name} boxSize="300px" objectFit="cover" />
                <Box textAlign="center" mt="4">
                    <Text fontSize="2xl">{drink.drink_name} ({drink.size})</Text>
                </Box>              
            </Box>
          )}
          {selectedCustoms.map((custom, index) => (
            <Flex direction="column" align="center" mt={4} key={index}>
                <Select value={custom.id} onChange={(e) => handleCustomChange(index, e)} colorScheme="green" width="80%">
                <option value="">-</option>
                {allCustoms.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
                </Select>
            </Flex>
          ))}
          <Flex mt={4} justifyContent="center">
            <Button colorScheme="blue" onClick={finalizeCustoms}>これで決まり！</Button>
          </Flex>
        </Container>
      </ChakraProvider>
      <Footer/>           
    </>
  );
};

export default CustomFromHistory;
