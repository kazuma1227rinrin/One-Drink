import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthProvider';  // AuthProvider の正しいパスを指定してください

// pagePropsにsessionを含むAppPropsの型を拡張します。
type ExtendedAppProps = AppProps & {
  pageProps: {
    session?: any; // sessionの型を指定します。詳細な型定義が必要な場合は適宜変更してください。
  };
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* AuthProvider を追加して、Firebaseユーザー情報をアプリケーション全体で利用できるようにします */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  )
}
