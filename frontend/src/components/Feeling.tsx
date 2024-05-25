import React, { useState } from 'react';
import {styled} from "styled-components";
import {Button} from "@chakra-ui/react";

interface FeelingProps {
    onChange: (value: string) => void; // または適切な型
}

export const Feeling=({ onChange }: FeelingProps)=>{
    
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        onChange(button); // 親コンポーネントのonChangeを呼び出す
    };

    return(
        <>
            <Sdiv>
                <p>今の気分は？</p>
            </Sdiv>
            <SButtonGroup >
                <Button 
                    colorScheme='green' 
                    variant={activeButton === 'refresh' ? 'solid' : 'outline'} 
                    onClick={() => handleButtonClick('refresh')} 
                >
                    気分転換したい
                </Button>
                <Button 
                    colorScheme='green' 
                    variant={activeButton === 'focus' ? 'solid' : 'outline'} 
                    onClick={() => handleButtonClick('focus')} 
                >
                    集中したい
                </Button>
                <Button 
                    colorScheme='green' 
                    variant={activeButton === 'relax' ? 'solid' : 'outline'} 
                    onClick={() => handleButtonClick('relax')} 
                >
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