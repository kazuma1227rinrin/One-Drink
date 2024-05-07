import admin from 'firebase-admin';
import serviceAccount from '@/path/to/serviceAccountKey.json'; // Firebase Admin SDKの設定ファイルのパス

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const verifyIdToken = (token) => {
  return admin.auth().verifyIdToken(token);
}
