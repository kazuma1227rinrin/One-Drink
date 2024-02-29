import React from 'react'
import { useSession, signIn } from 'next-auth/react'

const Login = () => {
    // useSession()を使用して、ログインしているかどうかを判定する。
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <p>あなたはログインしていません</p>
        {/* signIn()フックを使用して、Googleでログインできるようにする。 */}
        <button onClick={() => signIn('google', null, { prompt: 'login' })}>
          Googleでログイン
        </button>
      </div>
    )
  }
  return null
}

export default Login