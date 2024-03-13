import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";
import Link from 'next/link';

interface GetAnalysisProps {
    handleAnalysis: () => void;
  }

export const GetAnalysis=({ handleAnalysis }: GetAnalysisProps)=>{

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