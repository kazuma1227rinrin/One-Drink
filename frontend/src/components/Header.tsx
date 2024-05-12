import { styled } from "styled-components";
import { useAuth } from '@/contexts/AuthProvider';

export const Header = () => {
    const { userName } = useAuth();

    return (
        <SHeader id="header">
            <h1>One Drink</h1>
            {userName && <SUserName>{userName}のページ</SUserName>}
        </SHeader>
    )
}

const SHeader = styled.div`
    background-color: #00704A;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    font-family: 'Arial', sans-serif;
    position: relative;  // 追加：ポジショニングの基準点
`;

const SUserName = styled.div`
    position: absolute;  // 絶対位置指定
    right: 10px;  // 右端から10pxの位置
    bottom: 10px;  // 下端から10pxの位置
    font-size: 14px;  // フォントサイズを小さく
    color: #FFFFF0;
`;
