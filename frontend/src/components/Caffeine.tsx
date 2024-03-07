import {styled} from "styled-components";
import { Center, Stack, Switch } from "@chakra-ui/react";

export const Caffeine = () => {
    return (
        <>
            <Sdiv>
                <p>カフェインあり？</p>
            </Sdiv>
            <Center>
                <Stack direction='row' justifyContent="center" alignItems="center">
                    <p>ありでもOK!</p><Switch colorScheme='green' size='md' /><p>絶対なし！</p>
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