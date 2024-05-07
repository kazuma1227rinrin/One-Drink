import React, { useState } from 'react';
import {Button} from "@chakra-ui/react";
import {styled} from "styled-components";

interface CommitmentProps {
    onChange: (value: string) => void;
}

export const Commitment=({ onChange }: CommitmentProps)=>{

    const [activeButton, setActiveButton] = useState<string | null>(null);
    
    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        onChange(button); // 親コンポーネントのonChangeを呼び出す
    };

    return(
        <>
        <Sdiv>
            <p>こだわりは？</p>
        </Sdiv>
        <SButtonGroup>
            <Button 
                colorScheme='green' 
                variant={activeButton === 'lowCalorie' ? 'solid' : 'outline'} 
                onClick={() => handleButtonClick('lowCalorie')}
            >
                カロリー控えめ
            </Button>
            <Button 
                colorScheme='green' 
                variant={activeButton === 'protein' ? 'solid' : 'outline'} 
                onClick={() => handleButtonClick('protein')}
            >
                タンパク質とりたい
            </Button>
            <Button 
                colorScheme='green' 
                variant={activeButton === 'noCommitment' ? 'solid' : 'outline'} 
                onClick={() => handleButtonClick('noCommitment')}
            >
                こだわりなし
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