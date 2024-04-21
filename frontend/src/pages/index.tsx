import { Inter } from 'next/font/google';
import Link from 'next/link';
import {Button} from "@chakra-ui/react";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Link href="/Analyze" passHref>
        <Button>診断ページへ</Button>
      </Link>
    </>
  );
}
