import { Header } from "@/components/Header";
import {TitleResult} from "@/components/TitleResult";
import {Footer} from "@/components/Footer";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, Image, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    PieController
  } from 'chart.js';

  ChartJS.register(ArcElement, Tooltip, Legend, PieController);

    // HTMLタグを除去する関数
    const removeHtmlTags = (text) => {
        return text.replace(/<[^>]*>/g, '');
    };  

const Result = () => {
    const [resultData, setResultData] = useState(null);

    // 実際には動的にユーザーIDを取得するか、あるいは固定値を指定します。
    // この例では固定値として 0 を使用しています。
    const userId = 0;

    useEffect(() => {
        // バックエンドのAPIエンドポイント
        const apiUrl = `http://localhost:3000/drink/${userId}`;

        const fetchResultData = async () => {
            try {
                // axiosを使用してバックエンドからデータを取得
                const response = await axios.get(apiUrl);
                setResultData(response.data);
            } catch (error) {
                console.error("データの取得に失敗しました。", error);
            }
        };

        fetchResultData();
    }, []); // 空の依存配列を指定して、コンポーネントのマウント時にのみ実行  

    if (!resultData) {
        return <div>データをロード中...</div>;
    }

    // 説明文からHTMLタグを除去
    const descriptionWithoutHtml = removeHtmlTags(resultData.description);    

    // Chart.jsのデータ
    const chartData = {
        labels: ['タンパク質', '糖質', 'その他の水分'],
        datasets: [{
            data: [resultData.protein, resultData.sugar, 350],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };    

    return (
        <>
        <div style={{ paddingBottom: '1px' }}>
            <Header/>
        </div>
        <div>
            <ChakraProvider>
                <TitleResult />
                {resultData.image && (
                <Box display="flex" justifyContent="center" mt="4">
                    <Image src={`https://product.starbucks.co.jp${resultData.image}`} alt="Drink Image" boxSize="300px" objectFit="cover" />
                </Box>
                )}
                <Box textAlign="center" mt="4">
                    <Text fontSize="2xl">{resultData.drink_name} ({resultData.size})</Text>
                </Box>                      
                <Box mt="4" display="flex" flexDirection="column" alignItems="center">
                    <Box maxWidth="400px" textAlign="center" padding="20px" boxShadow="lg" borderRadius="md">
                        <Text><strong>説明:</strong> {descriptionWithoutHtml}</Text>
                    </Box>
                </Box>
                <Box textAlign="center" mt="4">
                    <Text fontSize="xl">カロリー: {resultData.calorie}kcal</Text>
                </Box>   
                <Box display="flex" justifyContent="center" mt="4">
                    <Flex alignItems="center" justifyContent="center" mt="4" gap="2">
                        <Link href="/Analyze" passHref>
                            <Button as="a" colorScheme="blue">再診断</Button>
                        </Link>
                        <Button colorScheme="green">カスタムを編集</Button>
                        <Button colorScheme="teal">これを飲む！</Button>
                    </Flex>
                </Box>   
                <Box textAlign="center" mt="4">
                    <Pie data={chartData} /> 
                </Box>                               
            </ChakraProvider>
        </div>
        <div>
            <Footer/>        
        </div>        
        </>
    );
};

export default Result;
