import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  
import { auth } from '@/lib/firebase/config'
import { setCookie } from 'nookies';
import { useAuth } from '@/contexts/AuthProvider'; 
import nookies from 'nookies';

/** firebaseの処理結果 */
export type FirebaseResult = {
  isSuccess: boolean
  message: string
  userId?: number
  userName?: string;
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
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    const response = await axios.get(`http://localhost:3000/find_user_id`, {
      params: { email: args.email }
    });

    if (response.status === 200) {
      return { 
        isSuccess: true, 
        message: 'ログインに成功しました', 
        userId: response.data.id,
        userName: response.data.name 
      };
    } else {
      throw new Error(response.data.code);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("HTTP error code:", error.response.status);
      const errorMessage = error.response.data.error || error.response.data.code;
      return { isSuccess: false, message: errorMessage };
    } else if (error instanceof Error) {
      console.error("Error code:", error.message);
      switch (error.message) {
        case 'auth/user-not-found':
          return { isSuccess: false, message: 'メールアドレスが存在しません' };
        case 'auth/wrong-password':
          return { isSuccess: false, message: 'パスワードが間違っています' };
        default:
          return { isSuccess: false, message: 'ログインに失敗しました' };
      }
    } else {
      console.error("Unknown error:", error);
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
export const signUpWithEmail = async (args: {
  email: string,
  password: string,
  passwordConfirmation: string,
  name: string
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '新規登録に失敗しました' };

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      user: {
        email: args.email,
        password: args.password,
        password_confirmation: args.passwordConfirmation,
        name: args.name
      }
    });

    if (response.status === 201) {
      const userCredential = await createUserWithEmailAndPassword(auth, args.email, args.password);
      if (userCredential.user) {
        console.log('Firebase registration successful');
        result = { isSuccess: true, message: '登録に成功しました' };
        return result;
      }      
    } else if (response.data && response.data.errors) {
      const message = response.data.errors.join(", ");
      if (message.includes("Email has already been taken")) {
        result = { isSuccess: false, message: 'メールアドレスは既に使用されています' };
      } else {
        result = { isSuccess: false, message: message };
      }
      return result;
    }
  } catch (error) {
    // errorがunknown型のため、まずErrorオブジェクトかどうかをチェックする
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response: { data: { errors: string[] } } };
      const message = err.response.data.errors.join(", ");
      if (message.includes("Email has already been taken")) {
        result = { isSuccess: false, message: 'メールアドレスは既に使用されています' };
      } else {
        result = { isSuccess: false, message: '新規登録に失敗しました' };
      }
    } else if (error instanceof Error && isFirebaseError(error)) {
      // Firebaseのエラーコードをチェック
      if (error.code === 'auth/email-already-in-use') {
        result = { isSuccess: false, message: 'メールアドレスが既に使用されています' };
      } else {
        result = { isSuccess: false, message: error.message };
      }
    } else {
      // その他のエラー
      result = { isSuccess: false, message: '予期せぬエラーが発生しました' };
    }
  }
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
        nookies.destroy(null, 'token');
        nookies.destroy(null, 'savedUserId');
        nookies.destroy(null, 'savedUserName');        
        result = { isSuccess: true, message: 'ログアウトしました' }
      })
      .catch((error) => {
        result = { isSuccess: false, message: error.message }
      })
  
    return result
  }