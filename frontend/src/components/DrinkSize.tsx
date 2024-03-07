import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 40px; 
`

export const DrinkSize=()=>{
    return(
        <>
        <Sdiv>
            <p>大きさは？</p>
        </Sdiv>
        <SButtonGroup>
            <Button colorScheme='green'>Short</Button>
            <Button colorScheme='green'>Tall</Button>
            <Button colorScheme='green'>Grande</Button>
            <Button colorScheme='green'>Venti</Button>
        </SButtonGroup>
        </>
    )
}



const SButtonGroup = styled.div`
    display: flex;
    justify-content: center; 
    gap: 10px; 
`