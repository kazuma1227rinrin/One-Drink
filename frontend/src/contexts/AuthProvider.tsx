import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase/config';
import { User, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import nookies from 'nookies';

// ユーザー情報とユーザーIDを含むコンテキストの型定義
interface AuthContextType {
    user: User | null;
    userId: number | null; // ユーザーIDを保持するためのステート
    setUserId: (id: number | null) => void; // ユーザーIDを設定するための関数
}

// コンテキストの初期値設定
const AuthContext = createContext<AuthContextType>({ user: null, userId: null, setUserId: () => {} });

// AuthProvider コンポーネントのPropsの型定義
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<number | null>(null); // ユーザーID用のステート
    const router = useRouter();

    useEffect(() => {
        // クッキーからトークンを読み取り
        const { token } = nookies.get(null);

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

        // ユーザー認証状態の変更を監視
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser !== user) {
                setUser(currentUser);
            } else if (!currentUser && user) {
                setUser(null);
                router.push('/');  // ユーザーがnullで以前はログインしていた場合のみルートを変更
            }
        });

        return () => unsubscribe();
    }, []);  // 依存配列を空にして、初回マウント時のみ実行

    // コンテキストプロバイダーにユーザーIDのステートとセッター関数を含める
    return (
        <AuthContext.Provider value={{ user, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const useAuth = () => useContext(AuthContext);
