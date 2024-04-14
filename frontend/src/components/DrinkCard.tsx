import { Box, Image, Flex, Text, Button, useToggle, useBoolean } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

// DrinkCardコンポーネント
const DrinkCard = ({ drink }) => {
  const [favorite, setFavoriteActions] = useBoolean(false);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Flex justifyContent="space-between" alignItems="center">
        <StarIcon 
            cursor="pointer" 
            color={favorite ? "yellow.400" : "gray.400"} 
            onClick={() => setFavoriteActions.toggle()} 
        />
        <Image src={drink.image} alt={drink.name} boxSize="100px" objectFit="cover" />
      </Flex>
      <Text mt={2}>{drink.name} ({drink.size}) - {drink.calories}kcal</Text>
      <Text>タンパク質: {drink.protein}g</Text>
      <Text mt={2}>{drink.description}</Text>
      <Text fontStyle="italic">{drink.comment}</Text>
      <Button mt={2}>カスタム編集</Button>
      <Button mt={2}>コメントを追加</Button>
    </Box>
  );
};

export default DrinkCard;