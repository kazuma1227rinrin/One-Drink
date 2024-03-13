import { Header } from "@/components/Header";
import {TopButtonArea} from "@/components/TopButtonArea";
import {Title} from "@/components/Title";
import {BudgetSlider} from "@/components/BudgetSlider";
import {Caffeine} from "@/components/Caffeine";
import {Feeling} from "@/components/Feeling";
import {Commitment} from "@/components/Commitment";
import {DrinkSize} from "@/components/DrinkSize";
import {GetAnalysis} from "@/components/GetAnalysis";
import {Footer} from "@/components/Footer";
import {ChakraProvider} from "@chakra-ui/react";
import { useState } from "react";

export default function Analyze() {

    const [budget, setBudget] = useState(1000);
    const [hasCaffeine, setHasCaffeine] = useState(false);
    const [feeling, setFeeling] = useState(null);
    const [commitment, setCommitment] = useState(null);
    const [drinkSize, setDrinkSize] = useState(null);

    const handleAnalysis = async () => {
        const response = await fetch("http://localhost:3000/analysis", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            budget,
            hasCaffeine,
            feeling,
            commitment,
            drinkSize,
        }),
        });

        const data = await response.json();
        // データを Result コンポーネントに渡す
    };
    
    return (
        <>
        <div style={{ paddingBottom: '50px' }}>
            <Header/>
        </div>
        <ChakraProvider>
            <TopButtonArea/>
            <Title/>
            <BudgetSlider budget={budget} setBudget={setBudget}/>
            <Caffeine hasCaffeine={hasCaffeine} setHasCaffeine={setHasCaffeine}/>
            <Feeling feeling={feeling} setFeeling={setFeeling}/>
            <Commitment commitment={commitment} setCommitment={setCommitment}/>
            <DrinkSize drinkSize={drinkSize} setDrinkSize={setDrinkSize}/>
            <GetAnalysis handleAnalysis={handleAnalysis}/>
        </ChakraProvider>
        <div>
            <Footer/>        
        </div>
        </>
    );
}
