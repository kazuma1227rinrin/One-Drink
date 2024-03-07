import {styled} from "styled-components";
import {Button} from "@chakra-ui/react";

export const Feeling=()=>{
    return(
        <>
            <Sdiv>
                <p>今の気分は？</p>
            </Sdiv>
            <SButtonGroup>
                <Button colorScheme='green'>気分転換したい</Button>
                <Button colorScheme='green'>集中したい</Button>
                <Button colorScheme='green'>リラックスしたい</Button>
            </SButtonGroup>
        </>
    )
}

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 40px; 
`

const SButtonGroup = styled.div`
    display: flex;
    justify-content: center; 
    gap: 10px; 
`