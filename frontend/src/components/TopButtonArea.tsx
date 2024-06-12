import React from 'react';
import { 
    Button, 
    Flex 
} from "@chakra-ui/react";
import styled from 'styled-components';
import { useRouter } from 'next/router';

// スタイリングされたFlexコンテナを定義
const StyledFlex = styled(Flex)`
    justify-content: flex-end;
    width: 100%;
    margin-top: 8px; 
`;

// ボタン用のスタイリングを適用
const CenteredButton = styled(Button)`
    margin: 0 8px; // ボタン間の隙間を設定
    margin-top: 8px;
`;

export const TopButtonArea = () => {

    const router = useRouter();

    // 履歴画面に遷移する関数
    const handleHistoryClick = () => {
        router.push('/History');
    };

    return (
        <StyledFlex>
            <CenteredButton onClick={handleHistoryClick}>飲んだ履歴</CenteredButton>
        </StyledFlex>
    )
}
