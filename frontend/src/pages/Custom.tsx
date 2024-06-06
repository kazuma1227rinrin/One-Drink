import { Header } from "@/components/Header";
import { TitleCustom } from "@/components/TitleCustom";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  
import axios from 'axios';
import { 
    ChakraProvider, 
    Box, 
    Text, 
    Image, 
    Select,
    Flex,
    Button 
} from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthProvider';
import ProtectedPage from '@/components/ProtectedPage';
import styled from 'styled-components';

// ResultDataの型定義
interface ResultData {
    image: string;
    drink_name: string;
    size: string;
    customs: CustomOption[];
}

// CustomOptionの型定義
interface CustomOption {
    id: number;
    name: string;
}

const Custom = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [customOptions, setCustomOptions] = useState<CustomOption[]>([]); 
    const router = useRouter();    
    const { userId } = useAuth();
    console.log(userId); 
    
    useEffect(() => {
        // バックエンドのAPIエンドポイント
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/custom/${userId}`;

        const fetchResultData = async () => {
            try {
                // axiosを使用してバックエンドからデータを取得
                const response = await axios.get<ResultData>(apiUrl);
                setResultData(response.data);
                setCustomOptions(response.data.customs);
            } catch (error) {
                console.error("データの取得に失敗しました。", error);
            }
        };

        fetchResultData();
    }, []); 

    const finalizeCustoms = async () => {
        const selectedCustoms = document.querySelectorAll<HTMLSelectElement>("select");
        const customIds = Array.from(selectedCustoms).map(select => select.value);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/update_drink_result/${userId}`, {
                user_id: userId,
                custom_ids: customIds.filter(id => id !== '-') // '-' でないものだけ送信
            });

            if (response.data.status === 'success') {
                router.push('/History');
            } else {
                throw new Error('保存に失敗しました。');
            }
        } catch (error) {
            console.error("APIからの応答に問題がありました。", error);
        }
    };    

    if (!resultData) {
        return <ProtectedPage><div>データをロード中...</div></ProtectedPage>;
    }

    return (
        <ProtectedPage>
            <>
                <Header />
                <ChakraProvider>
                    <TitleCustom />
                    <Card>
                        {resultData.image && (
                            <Box display="flex" justifyContent="center" mt="4">
                                <Image src={`https://product.starbucks.co.jp${resultData.image}`} alt="Drink Image" boxSize="300px" objectFit="cover" />
                            </Box>
                        )}
                        <Box textAlign="center" mt="4">
                            <Text fontSize="2xl">{resultData.drink_name} ({resultData.size})</Text>
                        </Box>
                        {customOptions.length > 0 && (
                            <Box mt="4" maxWidth="sm" width="100%" marginX="auto">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Select key={index} placeholder="-" colorScheme="green" mt={index ? 2 : 0}>
                                        {customOptions.map(option => (
                                            <option key={option.id} value={option.id}>{option.name}</option> 
                                        ))}
                                    </Select>
                                ))}
                            </Box>
                        )}
                        <Flex mt="4" justifyContent="center" gap="4">
                            <Button colorScheme="teal" onClick={() => router.back()}>結果画面に戻る</Button>
                            <Button colorScheme="teal" onClick={finalizeCustoms}>これで決まり！</Button>                    
                        </Flex>
                    </Card>
                </ChakraProvider>
                <Footer />
            </>
        </ProtectedPage>
    );
}

export default Custom;

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
