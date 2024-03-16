import { Header } from "@/components/Header";
import {Footer} from "@/components/Footer";
import {ChakraProvider} from "@chakra-ui/react";
import Link from 'next/link';
import { Button} from "@chakra-ui/react";
import {TitleResult} from "@/components/TitleResult";

export default function Result() {


    return (
        <>
        <div style={{ paddingBottom: '50px' }}>
            <Header/>
        <div>
        <ChakraProvider>
            <TitleResult/>

            <Link href="/Analyze">
                <Button>再診断</Button>
            </Link>
        </ChakraProvider>
        </div>
            <Footer/>        
        </div>
        </>
    );
}
