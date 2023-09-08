import { Text, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { RootStackNavigationProp, item } from "../navigation/types";
import { globalHeight } from "../constants";

interface RecipeCardProps {
  item: item;
  index: number;
  navigation: RootStackNavigationProp<"RecipeDetail">; // Use the specific navigation parameters type
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Animated.Image
          defaultSource={require("../assets/images/food.png")}
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? globalHeight(25) : globalHeight(35),
          }}
          className="bg-black/5 rounded-3xl"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={{ fontSize: globalHeight(1.5) }}
          numberOfLines={1}
          className="ml-2 font-semibold text-neutral-600 "
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
export default RecipeCard;
