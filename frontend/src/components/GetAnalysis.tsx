import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";
import axios from 'axios';
import { useRouter } from 'next/router';

interface GetAnalysisProps {
    handleAnalysis: () => void;
}

export const GetAnalysis=({ budget, hasNotCaffeine, feeling, commitment, drinkSize })=>{

    const router = useRouter();

    const handleAnalysis = async () => {

        // drinkSizeがnullまたはundefinedであれば、"tall"を設定
        const effectiveDrinkSize = drinkSize == null ? "tall" : drinkSize;   
        
        try {
          const response = await axios.post('http://localhost:3000/drink', { 
            budget, 
            hasNotCaffeine, 
            feeling, 
            commitment, 
            drinkSize: effectiveDrinkSize
          });
          router.push('/Result'); // ここを変更
        } catch (error) {
          console.error('Error posting budget to backend', error);
        }
    };

    return(
        <Sdiv>
            <Button onClick={handleAnalysis} colorScheme='orange'>診断結果を見る！</Button> {/* Linkタグを削除 */}
        </Sdiv>
    )
}

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 60px; 
    margin-bottom: 20px; 
`