import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";
import Link from 'next/link';
import axios from 'axios';

interface GetAnalysisProps {
    handleAnalysis: () => void;
}

export const GetAnalysis=({ budget, hasNotCaffeine, feeling, commitment, drinkSize })=>{

    const handleAnalysis = async () => {
        try {
          const response = await axios.post('http://localhost:3000/drink', { budget, hasNotCaffeine, feeling, commitment, drinkSize });
          console.log("これはなに", response.data); // バックエンドからのレスポンスをコンソールに表示
        } catch (error) {
          console.error('Error posting budget to backend', error);
        }
      };

    return(
        <Sdiv>
            <Link href="/Result">
                <Button onClick={handleAnalysis} colorScheme='orange'>診断結果を見る！</Button>
            </Link>
        </Sdiv>
    )
}

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 60px; 
    margin-bottom: 20px; 
`