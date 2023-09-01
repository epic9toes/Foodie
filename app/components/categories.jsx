import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function Categories({
  activeCategory,
  handleChangeCategory,
  categories,
}) {
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
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                  {/* <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  /> */}
                </View>
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: hp(1.6) }}
                >
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
}
