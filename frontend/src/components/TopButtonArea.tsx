import React from 'react';
import { Button, Flex } from "@chakra-ui/react";
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

    const router = useRouter(); // useRouterフックを使用してrouterオブジェクトを取得

    // ルーティング関数
    const handleHistoryClick = () => {
        router.push('/History'); // '/History'へプログラム的に画面遷移
    };

    // ランダムで診断する関数
    const randomAnalyze = () => {
        alert("coming soon...")
    };

    return (
        <StyledFlex>
            <Link href="/" passHref>
                <Button as="a">ログアウト</Button>
            </Link>
            <div>
                <RightAlignedButton onClick={handleHistoryClick}>飲んだ履歴</RightAlignedButton>
                <RightAlignedButton onClick={randomAnalyze}>ランダムで診断</RightAlignedButton>
            </div>
        </StyledFlex>
    )
}