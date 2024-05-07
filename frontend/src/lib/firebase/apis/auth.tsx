import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  
import { auth } from '@/lib/firebase/config'
import { setCookie } from 'nookies';
import { useAuth } from '@/contexts/AuthProvider'; 

/** firebaseの処理結果 */
export type FirebaseResult = {
  isSuccess: boolean
  message: string
  userId?: number
}

/** firebaseのエラー */
type FirebaseError = {
  code: string
  message: string
  name: string
}

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}
  
/**
 * EmailとPasswordでサインイン
 * @param email
 * @param password
 * @returns Promise<FirebaseResult>
 */
export const signInWithEmail = async (args: {
  email: string,
  password: string
}): Promise<FirebaseResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, args.email, args.password);
    const token = await userCredential.user.getIdToken();

    // トークンをクッキーに設定
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    // ユーザーIDをバックエンドから取得
    const response = await axios.get(`http://localhost:3000/find_user_id`, {
      params: { email: args.email }
    });

    if (response.status === 200) {
      return { isSuccess: true, message: 'ログインに成功しました', userId: response.data.id };
    } else {
      return { isSuccess: false, message: 'User ID lookup failed' };
    }
  } catch (error) {
    if (error instanceof Error && isFirebaseError(error)) {
      switch (error.code) {
        case 'auth/user-not-found':
          return { isSuccess: false, message: 'ユーザが見つかりませんでした' };
        case 'auth/wrong-password':
          return { isSuccess: false, message: 'パスワードが間違っています' };
        default:
          return { isSuccess: false, message: 'ログインに失敗しました' };
      }
    } else {
      return { isSuccess: false, message: 'An error occurred during login process' };
    }
  }
}
  
/**
 * EmailとPasswordでサインアップ
 * @param email
 * @param password
 * @param passwordConfirmation
 * @param name
 * @returns Promise<boolean>
 */
export const signUpWithEmail = async (args:{
  email: string,
  password: string,
  passwordConfirmation: string,
  name: string
}): Promise<FirebaseResult> =>{
  let result: FirebaseResult = { isSuccess: false, message: '' }
  try {
    // バックエンドへPOSTリクエストを送信
    const response = await axios.post('http://localhost:3000/signup', {
      user: {
        email: args.email,
        password: args.password,
        password_confirmation: args.passwordConfirmation,
        name: args.name
      }
    });

    // HTTPステータスコード201は、リソースが正常に作成されたことを意味します
    if (response.status === 201) {
      const userCredential = await createUserWithEmailAndPassword(auth, args.email, args.password);
      if (userCredential.user) {
        console.log('Firebase registration successful');
        result = { isSuccess: true, message: '登録に成功しました' };
        return result;
      }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/email-already-in-use'
    ) {
      result = {
        isSuccess: false,
        message: 'メールアドレスが既に使用されています',
      }
    } else {
      result = { isSuccess: false, message: '新規登録に失敗しました' }
    }
  }
  // エラーが発生した場合はfalseを返す
  return result;
}
  
  /**
   * ログアウト処理
   * @returns Promise<boolean>
   */
  export const logout = async (): Promise<FirebaseResult> => {
    let result: FirebaseResult = { isSuccess: false, message: '' }
  
    await signOut(auth)
      .then(() => {
        result = { isSuccess: true, message: 'ログアウトしました' }
      })
      .catch((error) => {
        result = { isSuccess: false, message: error.message }
      })
  
    return result
  }