import React, { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChakraProvider, Button, Image, Text, Box } from "@chakra-ui/react";
import Link from 'next/link';
import { TitleResult } from "@/components/TitleResult";
import axios from 'axios';

export default function Result() {
    const [productName, setProductName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/analysis', {
                    budget: 1000, // 例
                    hasNotCaffeine: true,
                    // その他のパラメータ...
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log("レスポンス: ", response.data);

                // レスポンスから商品名と画像URLを取得してステートを更新
                setProductName(response.data.product_name);
                setImageUrl(response.data.image_url);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div style={{ paddingBottom: '50px' }}>
                <Header/>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ChakraProvider>
                        <TitleResult/>
                        {imageUrl && (
                            <Image
                                src={`https://product.starbucks.co.jp${imageUrl}`}
                                alt="選択された商品の画像"
                                boxSize="300px"
                                objectFit="cover"
                                marginY={4} // 上下のマージンで少し間隔を開ける
                            />
                        )}
                        {productName && <Text fontSize="2xl" marginTop="2">{productName}</Text>}
                        <Link href="/Analyze">
                            <Button marginTop="4">再診断</Button>
                        </Link>
                    </ChakraProvider>
                </Box>
                <Footer/>        
            </div>
        </>
    );
}
