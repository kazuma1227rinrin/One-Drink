import React, { useRef } from 'react';
import { 
    Button, 
    Flex, 
    useDisclosure, 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogContent, 
    AlertDialogOverlay  
} from "@chakra-ui/react";
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { logout } from '@/lib/firebase/apis/auth';

// スタイリングされたFlexコンテナを定義
const StyledFlex = styled(Flex)`
    justify-content: space-between;
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);    

    // 履歴画面に遷移する関数
    const handleHistoryClick = () => {
        router.push('/History');
    };

    // ランダムで診断する関数
    const randomAnalyze = () => {
        alert("coming soon...")
    };

    // ログアウト処理
    const handleLogout = async () => {
        const result = await logout();
        if (result.isSuccess) {
            router.push('/'); 
        } else {
            alert(result.message); // エラーメッセージを表示
        }
    };    

    return (
        <>
        <StyledFlex>
            <Flex>
                <Button onClick={onOpen} marginTop="8px">ログアウト</Button>
            </Flex>
            <Flex>
                <CenteredButton onClick={handleHistoryClick}>飲んだ履歴</CenteredButton>
                <CenteredButton onClick={randomAnalyze}>ランダムで診断</CenteredButton>
            </Flex>
        </StyledFlex>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        ログアウト確認
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        ログアウトしてもよろしいですか？
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            キャンセル
                        </Button>
                        <Button colorScheme="red" onClick={() => {
                            handleLogout();
                            onClose();
                        }} ml={3}>
                            ログアウト
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>  
        </>      
    )
}
