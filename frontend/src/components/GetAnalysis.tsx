import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";
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

export const GetAnalysis=({ budget, hasNotCaffeine, feeling, commitment, drinkSize }: GetAnalysisProps)=>{

    const router = useRouter();
    const { userId } = useAuth();
    console.log(userId);         

    const handleAnalysis = async () => {

        // drinkSizeがnullまたはundefinedであれば、"tall"を設定        
        const effectiveDrinkSize = drinkSize || "tall";  
        
        try {
          const response = await axios.post(`http://localhost:3000/drink/${userId}`, { 
            budget, 
            hasNotCaffeine, 
            feeling, 
            commitment, 
            drinkSize: effectiveDrinkSize
          });
          router.push('/Result'); 
        } catch (error) {
          console.error('Error posting budget to backend', error);
        }
    };

    return(
        <Sdiv>
            <Button onClick={handleAnalysis} colorScheme='orange'>診断結果を見る！</Button>
        </Sdiv>
    )
}

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 60px; 
    margin-bottom: 20px; 
`