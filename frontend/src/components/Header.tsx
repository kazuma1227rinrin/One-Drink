import { useState } from 'react';
import { styled } from "styled-components";
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { logout } from '@/lib/firebase/apis/auth';
import Popup from './Popup'; // ポップアップコンポーネントをインポート

export const Header = () => {
    const { userName } = useAuth();
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // ユーザ名を表示しないページのパス
    const hideUserNamePaths = ['/', '/Signup'];

    // ログアウト処理
    const handleLogout = async () => {
        setIsPopupOpen(true); // ポップアップを表示
    };

    // ポップアップを閉じる処理
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // ログアウト確認処理
    const handleConfirmLogout = async () => {
        const result = await logout();
        if (result.isSuccess) {
            router.push('/');
        } else {
            alert(result.message); // エラーメッセージを表示
        }
        setIsPopupOpen(false); // ポップアップを閉じる
    };

    return (
        <>
            <SHeader id="header">
                <SLeftArea>
                    {!hideUserNamePaths.includes(router.pathname) && userName && <SUserName>{userName}のページ</SUserName>}
                </SLeftArea>
                <STitle>One Drink</STitle>
                <SRightArea>
                    {!hideUserNamePaths.includes(router.pathname) && (
                        <SLogoutButton onClick={handleLogout}>ログアウト</SLogoutButton>
                    )}
                </SRightArea>
            </SHeader>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <p>ログアウトしますか？</p>
                <Button onClick={handleConfirmLogout} colorScheme="red" mr={3}>はい</Button>
                <Button onClick={handleClosePopup}>いいえ</Button>
            </Popup>
        </>
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
    background-color: #4CAF50;
    color: white;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 14px;
    &:hover {
        background-color: #45a049;
    }
`;
