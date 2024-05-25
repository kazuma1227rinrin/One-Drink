import {styled} from "styled-components";
import { Center, Stack, Switch } from "@chakra-ui/react";
import React, {useState} from "react";

interface CaffeineProps {
    onChange: (value: boolean) => void;  // 適切な型を設定
}

export const Caffeine = ({ onChange }: CaffeineProps) => {

    // true: カフェインなし, false: カフェインあり
    const [hasNotContainedCaffeine, setHasNotContainedCaffeine]=useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isSwitchOn = event.target.checked;
        setHasNotContainedCaffeine(isSwitchOn);
        onChange(isSwitchOn);
    };

    return (
        <>
            <Sdiv>
                <p>カフェインあり？</p>
            </Sdiv>
            <Center>
                <Stack direction='row' justifyContent="center" alignItems="center">
                    <p>ありでもOK!</p>
                    <Switch 
                        colorScheme='green' 
                        size='md' 
                        onChange={handleSwitchChange}
                        isChecked={hasNotContainedCaffeine}
                    />
                    <p>絶対なし！</p>
                </Stack>
            </Center>
        </>
    )
}

const Sdiv =styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 40px; 
`