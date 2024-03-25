import {styled} from "styled-components";

export const Header=()=>{
    return(
        <SHeader id="header">
            <h1>One Drink</h1>
        </SHeader>
    )
}

const SHeader = styled.div`
    background-color: #00704A;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    font-family: 'Arial', sans-serif;
`