import axios from 'axios';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { auth } from '@/lib/firebase/config';
import { setCookie } from 'nookies';
import nookies from 'nookies';

/** firebaseの処理結果 */
export type FirebaseResult = {
  isSuccess: boolean;
  message: string;
  userId?: number;
  userName?: string;
};

/** firebaseのエラー */
type FirebaseError = {
  code: string;
  message: string;
  name: string;
};

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e;
};

/**
 * EmailとPasswordでサインイン
 * @param email
 * @param password
 * @returns Promise<FirebaseResult>
 */
export const signInWithEmail = async (args: { email: string; password: string }): Promise<FirebaseResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, args.email, args.password);
    const token = await userCredential.user.getIdToken();
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/find_user_id`, {
      params: { email: args.email },
    });

    if (response.status === 200) {
      return {
        isSuccess: true,
        message: 'ログインに成功しました',
        userId: response.data.id,
        userName: response.data.name,
      };
    } else {
      throw new Error(response.data.code);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('HTTP error code:', error.response.status);
      const errorMessage = error.response.data.error || error.response.data.code;
      return { isSuccess: false, message: errorMessage };
    } else if (error instanceof Error) {
      console.error('Error code:', error.message);
      switch (error.message) {
        case 'auth/user-not-found':
          return { isSuccess: false, message: 'メールアドレスが存在しません' };
        case 'auth/wrong-password':
          return { isSuccess: false, message: 'パスワードが間違っています' };
        default:
          return { isSuccess: false, message: 'ログインに失敗しました' };
      }
    } else {
      console.error('Unknown error:', error);
      return { isSuccess: false, message: 'An error occurred during login process' };
    }
  }
};

/**
 * EmailとPasswordでサインアップ
 * @param email
 * @param password
 * @param passwordConfirmation
 * @param name
 * @returns Promise<FirebaseResult>
 */
export const signUpWithEmail = async (args: { email: string; password: string; passwordConfirmation: string; name: string }): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '新規登録に失敗しました' };

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
      user: {
        email: args.email,
        password: args.password,
        password_confirmation: args.passwordConfirmation,
        name: args.name,
      },
    },{
      withCredentials: true
    });

    if (response.status === 201) {
      const userCredential = await createUserWithEmailAndPassword(auth, args.email, args.password);
      if (userCredential.user) {
        console.log('Firebase registration successful');
        const userId = response.data.id;
        const userName = response.data.name;
        result = { isSuccess: true, message: '登録に成功しました', userId, userName };
        return result;
      }
    } else if (response.data && response.data.errors) {
      const message = response.data.errors.join(', ');
      if (message.includes('Email has already been taken')) {
        result = { isSuccess: false, message: 'メールアドレスは既に使用されています' };
      } else {
        result = { isSuccess: false, message: message };
      }
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.errors.join(', ');
      if (message.includes('Email has already been taken')) {
        result = { isSuccess: false, message: 'メールアドレスは既に使用されています' };
      } else {
        result = { isSuccess: false, message: '新規登録に失敗しました' };
      }
    } else if (error instanceof Error && isFirebaseError(error)) {
      if (error.code === 'auth/email-already-in-use') {
        result = { isSuccess: false, message: 'メールアドレスが既に使用されています' };
      } else {
        result = { isSuccess: false, message: error.message };
      }
    } else {
      result = { isSuccess: false, message: '予期せぬエラーが発生しました' };
    }
  }
  return result;
};

/**
 * ログアウト処理
 * @returns Promise<FirebaseResult>
 */
export const logout = async (): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' };

  await signOut(auth)
    .then(() => {
      nookies.destroy(null, 'token');
      nookies.destroy(null, 'savedUserId');
      nookies.destroy(null, 'savedUserName');
      result = { isSuccess: true, message: 'ログアウトしました' };
    })
    .catch((error) => {
      result = { isSuccess: false, message: error.message };
    });

  return result;
};
