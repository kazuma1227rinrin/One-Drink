import { useSession, signIn, signOut } from "next-auth/react"

// セッションデータの型定義
type Session = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function Component() {
  const { data: session } = useSession() as { data: Session | null };

  if (session) {
    return (
      <>
        Signed in as {session.user.name ?? 'Unknown'} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}