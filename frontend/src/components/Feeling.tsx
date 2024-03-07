import React, { useState } from 'react';
import {styled} from "styled-components";
import {Button} from "@chakra-ui/react";

export const Feeling=()=>{
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button) => {
        setActiveButton(button); // 押されたボタンをアクティブにする
    };
    
    return(
        <>
            <Sdiv>
                <p>今の気分は？</p>
            </Sdiv>
            <SButtonGroup>
                <Button colorScheme='green' variant={activeButton === 'refresh' ? 'solid' : 'outline'} onClick={() => handleButtonClick('refresh')}>
                    気分転換したい
                </Button>
                <Button colorScheme='green' variant={activeButton === 'focus' ? 'solid' : 'outline'} onClick={() => handleButtonClick('focus')}>
                    集中したい
                </Button>
                <Button colorScheme='green' variant={activeButton === 'relax' ? 'solid' : 'outline'} onClick={() => handleButtonClick('relax')}>
                    リラックスしたい
                </Button>
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