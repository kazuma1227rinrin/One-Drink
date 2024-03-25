import {styled} from "styled-components";

export const Footer=()=>{
    return(
        <footer>
            <SFooter>
            </SFooter>
        </footer>
    )
}

const SFooter=styled.div`
    background-color: #00704A;
    color: #fff;
    text-align: center;
    padding: 40px 0;
    font-family: 'Arial', sans-serif;    
    bottom: 0; // 下端から0の位置に
    `