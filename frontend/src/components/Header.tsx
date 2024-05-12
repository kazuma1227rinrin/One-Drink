import { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

export const Header = () => {
    const { userName } = useAuth();
    const router = useRouter();  // useRouter フックでルート情報を取得

    // ユーザ名を表示しないページのパス
    const hideUserNamePaths = ['/', '/Signup'];

    return (
        <SHeader id="header">
            <h1>One Drink</h1>
            {/* 指定されたパスにいないときのみユーザ名を表示 */}
            {!hideUserNamePaths.includes(router.pathname) && userName && <SUserName>{userName}のページ</SUserName>}
        </SHeader>
    );
}

const SHeader = styled.div`
    background-color: #00704A;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    font-family: 'Arial', sans-serif;
    position: relative;
`;

const SUserName = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #FFFFF0;
`;
