import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";
import Link from 'next/link';

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 60px; 
    margin-bottom: 20px; 
`

export const GetAnalysis=()=>{
    return(
        <Sdiv>
            <Link href="/Result">
                <Button colorScheme='orange'>診断結果を見る！</Button>
            </Link>
        </Sdiv>
    )
}