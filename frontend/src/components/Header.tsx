import { useEffect, useState, useRef } from 'react';
import { styled } from "styled-components";
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { 
    Button, 
    useDisclosure, 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogContent, 
    AlertDialogOverlay  
} from "@chakra-ui/react";
import { logout } from '@/lib/firebase/apis/auth';

export const Header = () => {
    const { userName } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

    // ユーザ名を表示しないページのパス
    const hideUserNamePaths = ['/', '/Signup'];

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
        <SHeader id="header">
            <SLeftArea>
                {!hideUserNamePaths.includes(router.pathname) && userName && <SUserName>{userName}のページ</SUserName>}
            </SLeftArea>
            <STitle>One Drink</STitle>
            <SRightArea>
                {!hideUserNamePaths.includes(router.pathname) && (
                    <SLogoutButton onClick={onOpen}>ログアウト</SLogoutButton>
                )}
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
            </SRightArea>
        </SHeader>
    );
}

const SHeader = styled.div`
    background-color: #00704A;
    color: #fff;
    padding: 20px 0;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SUserName = styled.div`
    margin-left: 20px;
    font-size: 14px;
    color: #FFFFF0;
`;

const STitle = styled.h1`
    flex-grow: 1;
    text-align: center;
    margin: 0;
`;

const SLeftArea = styled.div`
    display: flex;
    align-items: center;
`;

const SRightArea = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

const SLogoutButton = styled(Button)`
    background-color: #ff4b5c;
    color: white;
    &:hover {
        background-color: #ff7878;
    }
`;
