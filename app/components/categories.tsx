import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { globalHeight } from "../constants";
import { category } from "../navigation/types";

interface TypeProps {
  activeCategory: string;
  handleChangeCategory: (val: string) => void;
  categories: category[];
}

const Categories: React.FC<TypeProps> = ({
  activeCategory,
  handleChangeCategory,
  categories,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories &&
          categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            let activeButtonClass = isActive ? "bg-red-400" : "bg-black/10";
            return (
              <TouchableOpacity
                onPress={() => handleChangeCategory(cat.strCategory)}
                key={index}
                className="flex items-center space-y-1"
              >
                <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                  <Animated.Image
                    defaultSource={require("../assets/images/food.png")}
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: globalHeight(6), height: globalHeight(6) }}
                    className="rounded-full"
                  />
                </View>
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: globalHeight(1.6) }}
                >
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
};
export default Categories;
