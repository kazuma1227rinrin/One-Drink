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

    const userId = 0;

    useEffect(() => {
        const apiUrl = `http://localhost:3000/drink/${userId}`;

        const fetchResultData = async () => {
            try {
                const response = await axios.get<ResultData>(apiUrl);
                setResultData(response.data);
            } catch (error) {
                console.error("データの取得に失敗しました。", error);
            }
        };

        fetchResultData();
    }, []);

    if (!resultData) {
        return <div>Loading...</div>;
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
                    <Button colorScheme="blue" as="a" href="/Analyze">再診断</Button>
                    <Button colorScheme="green" onClick={() => router.push('/Custom')}>カスタムを編集</Button>
                    <Button colorScheme="teal">これを飲む！</Button>
                </Flex>
                <Pie data={chartData} />
            </ChakraProvider>
            <Footer />
        </>
    );
};

export default Result;

function removeHtmlTags(text: string): string {
    return text.replace(/<[^>]*>?/gm, '');
}
