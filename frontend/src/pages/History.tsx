import { Header } from "@/components/Header";
import {TitleHistory} from "@/components/TitleHistory";
import {Footer} from "@/components/Footer";

import styled from 'styled-components';
import { 
    ChakraProvider,
    Link,
    Button,
    Flex
} from '@chakra-ui/react';

const History = () => {

    return (
      <>
        <div style={{ paddingBottom: '1px' }}>
            <Header/>
        </div>        
        <div>
            <ChakraProvider>
                <StyledFlex>
                    <Link href="/Analyze" passHref>
                        <Button>診断画面に戻る</Button>
                    </Link>                    
                </StyledFlex>                
                <TitleHistory />
            </ChakraProvider>
        </div>          
        <div>
            <Footer/>        
        </div>           
      </>
    );
}

// スタイリングされたFlexコンテナを定義
const StyledFlex = styled(Flex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 8px; 
`;
  
export default History;