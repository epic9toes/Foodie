import { View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { globalHeight, globalWidth } from "../../constants";

interface TypeProps {
  imageUrl: string;
}

const RecipeImage: React.FC<TypeProps> = ({ imageUrl }) => {
  return (
    <View className="flex-row justify-center">
      <Animated.Image
        defaultSource={require("../../assets/images/food.png")}
        source={{ uri: imageUrl }}
        style={{
          width: globalWidth(98),
          height: globalHeight(50),
          borderRadius: 53,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          marginTop: 4,
        }}
        sharedTransitionTag={imageUrl}
      />
    </View>
  );
};

export default RecipeImage;
