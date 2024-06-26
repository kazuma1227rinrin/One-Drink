import { Header } from "@/components/Header";
import { TitleCustom } from "@/components/TitleCustom";
import { Footer } from "@/components/Footer";
import { useState, useEffect, ChangeEvent } from 'react';
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
import ProtectedPage from '@/components/ProtectedPage';
import styled from 'styled-components';

interface Custom {
    id: string;  // IDが文字列型の場合
    name?: string;  // nameはオプショナルなプロパティである場合
}

interface Drink {
    image: string;
    name: string;
    drink_name: string;
    size: string;
}

interface CustomOption {
    id: string;
    name: string;
}

const CustomFromHistory = () => {
    const router = useRouter();
    const { id } = router.query; // URLからidを取得
    const [drink, setDrink] = useState<Drink | null>(null);
    const [selectedCustoms, setSelectedCustoms] = useState<Custom[]>([]);
    const [allCustoms, setAllCustoms] = useState<CustomOption[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/${id}`);
                setDrink(response.data.drink);
                const initialCustoms = response.data.customs.map((custom: Custom) => ({ id: custom.id }));
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
        return () => {
            isActive = false;
        };    
    }, [id]);

    const handleCustomChange = (index: number, event: ChangeEvent<HTMLSelectElement>) => {
        const updatedCustoms = [...selectedCustoms];
        const value = event.target.value;
        updatedCustoms[index] = { id: value };
        setSelectedCustoms(updatedCustoms);
    };

    const finalizeCustoms = async () => {
        const customIds = selectedCustoms.map(custom => custom.id).filter(id => id !== '');
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/update/${id}`, {
                custom_ids: customIds
            });
            if (response.data.status === 'success') {
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
        <ProtectedPage>
            <>
                <Header />
                <ChakraProvider>
                    <Container maxW="container.md" centerContent>
                        <Card>
                        <TitleCustom />
                            {drink && (
                                <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                                    <Box display="flex" justifyContent="center">
                                        <Image src={`https://product.starbucks.co.jp${drink.image}`} alt={drink.name} boxSize="300px" objectFit="cover" />
                                    </Box>
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
                        </Card>
                    </Container>
                </ChakraProvider>
                <Footer />           
            </>
        </ProtectedPage>
    );
};

export default CustomFromHistory;

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
