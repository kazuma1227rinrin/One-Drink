import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase/config';
import { User, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import nookies from 'nookies';

interface AuthContextType {
    user: User | null;
    userId: number | null;
    setUserId: (id: number | null) => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, userId: null, setUserId: () => {} });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        // クッキーからトークンを読み取り
        const { token, savedUserId } = nookies.get(null);

        // クッキーから読み取ったuserIdを状態に設定
        if (savedUserId) {
            setUserId(parseInt(savedUserId));
        }

        // トークンがあればFirebaseで認証状態を確認
        if (token) {
            signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    if (userCredential.user) {
                        setUser(userCredential.user);
                    }
                })
                .catch((error) => {
                    console.error('Auth token is invalid', error);
                    nookies.destroy(null, 'token');  // トークンが無効ならクッキーを削除
                });
        }

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser !== user) {
                setUser(currentUser);
            } else if (!currentUser && user) {
                setUser(null);
                router.push('/');  // ユーザーがnullで以前はログインしていた場合のみルートを変更
            }
        });

        return () => unsubscribe();
    }, [router, user]);

    useEffect(() => {
        // userIdが変更されたとき、クッキーに保存
        nookies.set(null, 'savedUserId', userId?.toString() ?? '', {
            maxAge: 30 * 24 * 60 * 60,  // 有効期限を設定
            path: '/'
        });
    }, [userId]);

    return (
        <AuthContext.Provider value={{ user, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);