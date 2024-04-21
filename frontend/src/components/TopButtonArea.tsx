import React from 'react';
import { Button, Flex } from "@chakra-ui/react";
import styled from 'styled-components';
import Link from 'next/link';

// スタイリングされたFlexコンテナを定義
const StyledFlex = styled(Flex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 8px; 
`;

// 右寄せボタン用のスタイリングを適用
const RightAlignedButton = styled(Button)`
    margin-left: 8px; // ボタン間の隙間を設定
    margin-top: 8px; 
`;

export const TopButtonArea = () => {
    return (
        <StyledFlex>
            <Link href="/" passHref>
                <Button as="a">ログアウト</Button>
            </Link>
            <div>
                <RightAlignedButton>飲んだ履歴</RightAlignedButton>
                <RightAlignedButton>ランダムで診断</RightAlignedButton>
            </div>
        </StyledFlex>
    )
}