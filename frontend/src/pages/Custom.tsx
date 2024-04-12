import { Header } from "@/components/Header";
import {TitleCustom} from "@/components/TitleCustom";
import {Footer} from "@/components/Footer";

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

const Custom = () => {
    const [resultData, setResultData] = useState(null);
    const [customOptions, setCustomOptions] = useState([]); 
    const router = useRouter();    
    const userId = 0;
    
    useEffect(() => {
        // バックエンドのAPIエンドポイント
        const apiUrl = `http://localhost:3000/custom/${userId}`;

        const fetchResultData = async () => {
            try {
                // axiosを使用してバックエンドからデータを取得
                const response = await axios.get(apiUrl);
                setResultData(response.data);
                setCustomOptions(response.data.customs);
            } catch (error) {
                console.error("データの取得に失敗しました。", error);
            }
        };

        fetchResultData();
    }, []); 

    const finalizeCustoms = async () => {
        const selectedCustoms = document.querySelectorAll("select");
        const customIds = Array.from(selectedCustoms).map(select => select.value);

        try {
            const response = await axios.post('http://localhost:3000/drinks/update_drink_result', {
                user_id: userId,
                custom_ids: customIds.filter(id => id !== '-') // '-' でないものだけ送信
            });

            if (response.data.status === 'success') {
                alert('カスタマイズが保存されました！');
                router.push('/History');
            } else {
                throw new Error('保存に失敗しました。');
            }
        } catch (error) {
            console.error("APIからの応答に問題がありました。", error);
        }
    };    

    if (!resultData) {
        return <div>データをロード中...</div>;
    }

    return (
      <>
        <div style={{ paddingBottom: '1px' }}>
            <Header/>
        </div>      
        <div>
            <ChakraProvider>
                <TitleCustom />
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
            </ChakraProvider>
        </div>        
        <div>
            <Footer/>        
        </div>            
      </>
    );
}
  
export default Custom;