import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { verifyIdToken } from '@/lib/firebase/admin';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = cookies.token; // 仮にtokenというクッキーに保存されているとします

    console.log('Received token:', token); // トークンの値をログ出力

    // トークンの検証
    const decodedToken = await verifyIdToken(token);
    console.log('Decoded token:', decodedToken); // デコードされたトークンの内容をログ出力

    if (!decodedToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // ユーザー情報など必要なデータをpropsとして渡す
    return {
      props: { user: decodedToken }, // decodedTokenはFirebaseからのレスポンスに基づく
    };
  } catch (err) {
    console.error('Error during token verification:', err); // エラー内容をログ出力
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
