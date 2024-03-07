import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";

export const Commitment=()=>{
    return(
        <>
        <Sdiv>
            <p>こだわりは？</p>
        </Sdiv>
        <SButtonGroup>
            <Button colorScheme='green'>カロリー控えめ</Button>
            <Button colorScheme='green'>タンパク質とりたい</Button>
            <Button colorScheme='green'>こだわりなし</Button>
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