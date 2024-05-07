import { useAuth } from '@/contexts/AuthProvider';
import React, { ReactNode } from 'react';

interface ProtectedPageProps {
    children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({children}) => {
  const { user } = useAuth();

  console.log('Current user:', user); // ユーザー情報をログに出力

  if (!user) {
    return <div>Loading or not authenticated...</div>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
