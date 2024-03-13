import {styled} from "styled-components";
import { Center, Stack, Switch } from "@chakra-ui/react";
import React, {useState} from "react";


export const Caffeine = () => {
    // true: カフェインなし, false: カフェインあり
    const [isNotContainedCaffeine, setIsNotContainedCaffeine]=useState(false);
    // スイッチのON/OFFを判定する
    const handleSwitchChange = (event) => {
        setIsNotContainedCaffeine(event.target.checked);
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
                        isChecked={isNotContainedCaffeine}
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