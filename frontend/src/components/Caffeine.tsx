import {styled} from "styled-components";
import { Center, Stack, Switch } from "@chakra-ui/react";
import React, {useState} from "react";


export const Caffeine = ({ onChange }) => {

    // true: カフェインなし, false: カフェインあり
    const [hasNotContainedCaffeine, setHasNotContainedCaffeine]=useState(false);

    const handleSwitchChange = (event) => {
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