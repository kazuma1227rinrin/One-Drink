import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import React from 'react';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  ChakraProvider,
  useToast,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { signUpWithEmail } from '@/lib/firebase/apis/auth';
import { FirebaseResult } from '@/lib/firebase/apis/auth';
import { useAuth } from '@/contexts/AuthProvider';

type formInputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

export default function SignUpScreen() {
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const [password, setPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { setUserId, setUserName } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    await signUpWithEmail({
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      name: data.name
    }).then((res: FirebaseResult) => {
      if (res.isSuccess) {
        setUserId(res.userId ?? null);
        setUserName(data.name);
        console.log('新規登録成功');
        toast({
          title: res.message,
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        console.log('新規登録失敗');
        toast({
          title: 'メールアドレス重複登録エラー',
          description: res.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }).catch((error) => {
      console.error('登録処理中にエラーが発生しました', error);
      toast({
        title: "エラー",
        description: "登録処理中に問題が発生しました。後ほど再試行してください。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  });

  const passwordClick = () => setPassword(!password);
  const confirmClick = () => setConfirm(!confirm);

  return (
    <>
      <Header />
      <ChakraProvider>
        <Flex height='100vh' justifyContent='center' alignItems='center'>
          <VStack spacing='5'>
            <Heading>新規登録</Heading>
            <form onSubmit={onSubmit}>
              <VStack alignItems='left'>
                <FormControl isInvalid={Boolean(errors.name)}>
                  <FormLabel htmlFor='name' textAlign='start'>
                    ニックネーム
                  </FormLabel>
                  <Input
                    id='name'
                    {...register('name', {
                      required: '必須項目です',
                      maxLength: {
                        value: 20,
                        message: '20文字以内で入力してください',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel htmlFor='email' textAlign='start'>
                    メールアドレス
                  </FormLabel>
                  <Input
                    id='email'
                    {...register('email', {
                      required: '必須項目です',
                      maxLength: {
                        value: 50,
                        message: '50文字以内で入力してください',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                        message: 'メールアドレスの形式が違います',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.password)}>
                  <Flex alignItems="center">
                    <FormLabel htmlFor='password' mb="0">パスワード</FormLabel>
                    <Tooltip
                      label={
                        <div style={{ textAlign: 'left' }}>
                          ・8文字以上<br />
                          ・50文字以下<br />
                          ・大文字必須<br />
                          ・半角英数字
                        </div>
                      }
                      aria-label="パスワード説明"
                      hasArrow
                    >
                      <IconButton>
                        <InfoOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Flex>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={password ? 'text' : 'password'}
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
                        pattern: {
                          value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                          message: '半角英数字かつ少なくとも1つの大文字を含めてください',
                        },
                      })}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={passwordClick}>
                        {password ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.passwordConfirmation)}>
                  <FormLabel htmlFor='confirm'>パスワード確認</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={confirm ? 'text' : 'password'}
                      {...register('passwordConfirmation', {
                        required: '必須項目です',
                        minLength: {
                          value: 8,
                          message: '8文字以上で入力してください',
                        },
                        maxLength: {
                          value: 50,
                          message: '50文字以内で入力してください',
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                          message: '半角英数字かつ少なくとも1つの大文字を含めてください',
                        },
                        validate: (value) =>
                          value === getValues('password') || 'パスワードが一致しません',
                      })}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={confirmClick}>
                        {confirm ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.passwordConfirmation && errors.passwordConfirmation.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  marginTop='4'
                  color='white'
                  bg='teal.400'
                  isLoading={isSubmitting}
                  type='submit'
                  paddingX='auto'
                  _hover={{
                    borderColor: 'transparent',
                    boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  新規登録
                </Button>
              </VStack>
            </form>
            <Button
              as={NextLink}
              href='/'
              bg='white'
              width='100%'
              _hover={{
                borderColor: 'transparent',
                boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              ログインはこちらから
            </Button>
          </VStack>
        </Flex>
      </ChakraProvider>
      <Footer />
    </>
  );
}

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3182ce; /* アイコンの色 */
  &:hover {
    color: #2b6cb0; /* ホバー時の色 */
  }
  margin-left: 8px; /* パスワード入力フォームとの間にスペースを作る */
`;
