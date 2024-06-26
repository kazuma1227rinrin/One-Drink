import React from 'react';
import {styled} from "styled-components";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

// Propsの型定義を追加
interface BudgetSliderProps {
    onChange: (value: number) => void;
  }

export const BudgetSlider = ({ onChange }: BudgetSliderProps) => {
    const [value, setValue] = React.useState(1000);

    const handleChange = (val: number) => {
        setValue(val);
        onChange(val); // 外部から渡されたonChangeを呼び出す
    };

    return (
      <>
        <Sp>予算はいくら？</Sp>
        <Box width="50%" mx="auto"> {/* コンテナを中央に配置し、幅を小さく設定 */}
            <Slider
                colorScheme='green'
                aria-label="price-range"
                defaultValue={1000}
                min={400}
                max={2000}
                step={100}
                // onChange={(val) => setValue(val)}
                onChange={handleChange}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                    <Box color="green" as="p" mt="-10" ml="-5" fontSize="sm">
                        {`¥${value}`}
                    </Box>
                </SliderThumb>
            </Slider>
        </Box>
      </>
    );
};

const Sp = styled.p`
text-align: center; /* テキストを中央に配置する */
margin: 0; /* 上下のマージンをなくす */
padding: 20px; /* 余白を追加する */
margin-bottom: 20px;
`