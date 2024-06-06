import { Header } from "@/components/Header";
import { TopButtonArea } from "@/components/TopButtonArea";
import { Title } from "@/components/Title";
import { BudgetSlider } from "@/components/BudgetSlider";
import { Caffeine } from "@/components/Caffeine";
import { Feeling } from "@/components/Feeling";
import { Commitment } from "@/components/Commitment";
import { DrinkSize } from "@/components/DrinkSize";
import { GetAnalysis } from "@/components/GetAnalysis";
import { Footer } from "@/components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import ProtectedPage from '@/components/ProtectedPage';
import styled from 'styled-components';

export default function Analyze() {

    const [budget, setBudget] = useState<number>(1000);
    const [hasNotCaffeine, setHasNotCaffeine] = useState(false);
    const [feeling, setFeeling] = useState<string>('');
    const [commitment, setCommitment] = useState<string>('');
    const [drinkSize, setDrinkSize] = useState<string>('');

    // 予算スライダーが更新されたとき、新しい予算の値をセットする。
    const handleBudgetChange = useCallback((newBudget: number) => {
        setBudget(newBudget);
    }, []);

    // 気分のボタンが押下されたとき、気分の値をセットする。
    const handleFeelingChange = useCallback((newFeeling: string) => {
        setFeeling(newFeeling);
    }, []);

    // こだわりのボタンが押下されたとき、こだわりの値をセットする。
    const handleCommitmentChange = useCallback((newCommitment: string) => {
        setCommitment(newCommitment);
    }, []);

    // ドリンクサイズのボタンが押下されたとき、ドリンクサイズの値をセットする。
    const handleDrinkSizeChange = useCallback((newDrinkSize: string) => {
        setDrinkSize(newDrinkSize);
    }, []);

    // カフェインオフスイッチがONになったとき、カフェインオフスイッチの値をセットする。
    const handleHasNotCaffeineChange = useCallback((newHasNotCaffeine: boolean) => {
        setHasNotCaffeine(newHasNotCaffeine);
    }, []);

    return (
        <ProtectedPage>
            <>
                <Header />
                <ChakraProvider>
                    <TopButtonArea />
                    <Title />
                    <Card>
                        <BudgetSlider onChange={handleBudgetChange} />
                        <Caffeine onChange={handleHasNotCaffeineChange} />
                        <Feeling onChange={handleFeelingChange} />
                        <Commitment onChange={handleCommitmentChange} />
                        <DrinkSize onChange={handleDrinkSizeChange} />
                        <GetAnalysis
                            budget={budget}
                            hasNotCaffeine={hasNotCaffeine}
                            feeling={feeling}
                            commitment={commitment}
                            drinkSize={drinkSize}
                        />
                    </Card>
                </ChakraProvider>
                <Footer />
            </>
        </ProtectedPage>
    );
}

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
`;
