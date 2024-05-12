import { useAuth } from '@/contexts/AuthProvider';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ProtectedPageProps {
    children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({children}) => {
  const { user } = useAuth();
  const router = useRouter();

  console.log('Current user:', user); // ユーザー情報をログに出力

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        router.push('/'); // ログインページへ遷移
      }, 3000); // 3秒後に実行

      return () => clearTimeout(timer); // コンポーネントのアンマウント時にタイマーをクリア
    }
  }, [user, router]);

  if (!user) {
    return (
      <div style={{
        height: "100vh",  // ビューポートの高さに合わせる
        display: "flex",
        justifyContent: "center",  // 水平方向の中央揃え
        alignItems: "center",  // 垂直方向の中央揃え
        fontSize: "15px",  // フォントサイズ
        textAlign: "center"  // テキストを中央に揃える
      }}>
        ログインしてください。3秒後にログイン画面に移動します。
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
