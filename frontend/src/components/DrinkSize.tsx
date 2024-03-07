import React, { useState } from 'react';
import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";

const Sdiv = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 40px; 
`

export const DrinkSize=()=>{

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button); // 押されたボタンをアクティブにする
    };

    return(
        <>
        <Sdiv>
            <p>大きさは？</p>
        </Sdiv>
        <SButtonGroup>
        <Button colorScheme='green' variant={activeButton === 'short' ? 'solid' : 'outline'} onClick={() => handleButtonClick('short')}>
                Short
            </Button>
            <Button colorScheme='green' variant={activeButton === 'tall' ? 'solid' : 'outline'} onClick={() => handleButtonClick('tall')}>
                Tall
            </Button>
            <Button colorScheme='green' variant={activeButton === 'grande' ? 'solid' : 'outline'} onClick={() => handleButtonClick('grande')}>
                Grande
            </Button>
            <Button colorScheme='green' variant={activeButton === 'venti' ? 'solid' : 'outline'} onClick={() => handleButtonClick('venti')}>
                Venti
            </Button>
        </SButtonGroup>
        </>
    )
}



const SButtonGroup = styled.div`
    display: flex;
    justify-content: center; 
    gap: 10px; 
`