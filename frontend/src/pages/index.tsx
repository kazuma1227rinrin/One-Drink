import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import React, { useState } from 'react';
import Link from 'next/link'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  ChakraProvider,
  useToast,
} from '@chakra-ui/react';
import {signInWithEmail} from '@/lib/firebase/apis/auth';
import { FirebaseResult } from '@/lib/firebase/apis/auth';
import { useAuth } from '@/contexts/AuthProvider';

type formInputs = {
  email: string;
  password: string;
}

export default function Home() {
  const toast = useToast()
  const router = useRouter()
  const { 
    handleSubmit, 
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const [show, setShow] = useState<boolean>(false);

  const { setUserId } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    // バリデーションチェック
    await signInWithEmail({
      email: data.email,
      password: data.password,
    }).then((res: FirebaseResult) => {
      if (res.isSuccess) {
        setUserId(res.userId ?? null);
        console.log('ログイン成功')
        router.push('/Analyze');
        toast({
          title: "ログイン成功",
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true
        });        
      } else {
        console.log('ログイン失敗')
        console.log('res.message:', res)
        toast({
          title: "ログイン失敗",
          description: "ログインに失敗しました",
          status: "error",
          duration: 5000,
          isClosable: true
        });        
      }
    })
  })

  return (
    <>
      <Header />
      <ChakraProvider>
        <Flex
          flexDirection="column"
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <VStack spacing="5">
            <Heading>ログイン</Heading>
            <form onSubmit={onSubmit}>
              <VStack spacing="4" alignItems="left">
                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel htmlFor="email" textAlign='start'>
                    メールアドレス
                  </FormLabel>
                  <Input 
                    id="email" 
                    {...register('email', {
                      required: '必須項目です',
                      maxLength: {
                        value: 50,
                        message: '50文字以内で入力してください',
                      },
                    })} 
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? 'text' : 'password'}
                      {...register('password', {
                        required: '必須項目です',
                        minLength: {
                          value: 8,
                          message: '8文字以上で入力してください',
                        },
                        maxLength: {
                          value: 50,
                          message: '50文字以内で入力してください',
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>              
                <Button
                  marginTop="4"
                  color="white"
                  bg="teal.400"
                  isLoading={isSubmitting}
                  type="submit"
                  paddingX="auto"
                  _hover={{
                    borderColor: 'transparent',
                    boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
                  }}                  
                >
                  ログイン
                </Button>                
                <Button
                  as={NextLink}
                  bg="white"
                  color="black"
                  href="/Signup"
                  width="100%"
                  _hover={{
                    borderColor: 'transparent',
                    boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
                  }}                  
                >
                  新規登録はこちらから
                </Button>
              </VStack>
            </form>
          </VStack>
        </Flex>  
      </ChakraProvider>        
      <Footer />      
    </>
  );
}
