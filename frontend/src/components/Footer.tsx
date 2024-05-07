import styled from "styled-components";

export const Footer = () => {
    return (
        <footer>
            <SFooter>
                © 2024 kzm
            </SFooter>
        </footer>
    );
}

const SFooter = styled.div`
    background-color: #00704A;
    color: #fff;
    text-align: right;
    padding: 40px 20px;
    font-family: 'Arial', sans-serif;
    bottom: 0; // 下端から0の位置に
`;
