import { Header } from "@/components/Header";
import { TitleResult } from "@/components/TitleResult";
import { Footer } from "@/components/Footer";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, Image, Text, Flex } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    PieController
} from 'chart.js';
import { useRouter } from 'next/router';
import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { useAuth } from '@/contexts/AuthProvider';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

interface ResultData {
    image: string;
    description: string;
    drink_name: string;
    size: string;
    calorie: number;
    protein: number;
    sugar: number;
}

const Result = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const router = useRouter();

    const { userId } = useAuth();
    console.log(userId);

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/drink/${userId}`;

        const fetchResultData = async () => {
            try {
                const response = await axios.get<ResultData>(apiUrl);
                setResultData(response.data);
            } catch (error) {
                console.error("データの取得に失敗しました。", error);
            }
        };

        fetchResultData();
    }, [userId]);

    const handleDrinkThis = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks/update_drink_result/${userId}`, {
                user_id: userId,
                custom_ids: []  // 結果画面から登録する場合、カスタムの更新は必要ないので空の配列を送る
            });
            if (response.data.status === 'success') {
                router.push('/History');
            } else {
                throw new Error('フラグの更新に失敗しました。');
            }
        } catch (error) {
            console.error("フラグの更新に失敗しました。", error);
        }
    };

    if (!resultData) {
        return <ProtectedPage><div>Loading...</div></ProtectedPage>;
    }

    const descriptionWithoutHtml = removeHtmlTags(resultData.description);

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
        <ProtectedPage>
        <>
            <Header />
            <ChakraProvider>
                <TitleResult />
                {resultData.image && (
                    <Box display="flex" justifyContent="center" mt="4">
                        <Image src={`https://product.starbucks.co.jp${resultData.image}`} alt="Drink Image" boxSize="300px" objectFit="cover" />
                    </Box>
                )}
                <Text fontSize="2xl" textAlign="center" mt="4">{resultData.drink_name} ({resultData.size})</Text>
                <Box padding="20px" boxShadow="lg" borderRadius="md" maxWidth="400px" margin="auto" mt="4">
                    <strong>説明:</strong> {descriptionWithoutHtml}
                </Box>
                <Text fontSize="xl" textAlign="center" mt="4">カロリー: {resultData.calorie} kcal</Text>
                <Flex justifyContent="center" mt="4">
                    <Button colorScheme="blue" as="a" href="/Analyze" mx="2">再診断</Button>
                    <Button colorScheme="green" onClick={() => router.push('/Custom')} mx="2">カスタムを編集</Button>
                    <Button colorScheme="teal" onClick={handleDrinkThis} mx="2">これを飲む！</Button>
                </Flex>
                <Pie data={chartData} />
            </ChakraProvider>
            <Footer />
        </>
        </ProtectedPage>
    );
};

export default Result;

function removeHtmlTags(text: string | null): string {
    if (!text) return '';
    return text.replace(/<[^>]*>?/gm, '');
}
