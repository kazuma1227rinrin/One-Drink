import { Header } from "@/components/Header";
import {TopButtonArea} from "@/components/TopButtonArea";
import {Title} from "@/components/Title";
import {PriceSlider} from "@/components/PriceSlider";
import {Caffeine} from "@/components/Caffeine";
import {Feeling} from "@/components/Feeling";
import {Commitment} from "@/components/Commitment";
import {DrinkSize} from "@/components/DrinkSize";
import {GetAnalysis} from "@/components/GetAnalysis";
import {Footer} from "@/components/Footer";
import {ChakraProvider} from "@chakra-ui/react";

export default function Analyse() {
    return (
        <>
        <div style={{ paddingBottom: '50px' }}>
        <Header/>
        <div>
        <ChakraProvider>
            <TopButtonArea/>
            <Title/>
            <PriceSlider/>
            <Caffeine/>
            <Feeling/>
            <Commitment/>
            <DrinkSize/>
            <p></p>
            <GetAnalysis/>
        </ChakraProvider>
        </div>
        <Footer/>        
        </div>
        </>
    );
}
