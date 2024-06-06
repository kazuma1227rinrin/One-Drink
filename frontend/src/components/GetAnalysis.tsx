// GetAnalysis.tsx
import {Button, useToast} from "@chakra-ui/react";
import styled from "styled-components";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

interface GetAnalysisProps {
    budget: number;
    hasNotCaffeine: boolean;
    feeling: string;
    commitment: string;
    drinkSize: string;
}

export const GetAnalysis = ({ budget, hasNotCaffeine, feeling, commitment, drinkSize }: GetAnalysisProps) => {
    const router = useRouter();
    const { userId, userName } = useAuth();
    const toast = useToast();
    console.log(userId, userName);

    const handleAnalysis = async () => {
        // drinkSizeがnullまたはundefinedであれば、"tall"を設定
        const effectiveDrinkSize = drinkSize || "tall";

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/drink/${userId}`, {
                budget,
                hasNotCaffeine,
                feeling,
                commitment,
                drinkSize: effectiveDrinkSize
            });

            if (response.data.error) {
                toast({
                    title: 'エラー',
                    description: response.data.error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
            } else {
                router.push('/Result');
            }
        } catch (error) {
            console.error('Error posting budget to backend', error);
            toast({
                title: '商品が見つかりませんでした！',
                description: '他の条件で試してみてください。',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Card>
            <Button onClick={handleAnalysis} colorScheme='orange'>診断結果を見る！</Button>
        </Card>
    );
};

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;
