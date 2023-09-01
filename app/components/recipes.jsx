import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import RecipeCard from "./recipeCard";
import { mealData } from "../constants";
import Loading from "./loading";

export default function Recipes({ categories, recipes }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Recipes
      </Text>
      {categories.length === 0 || recipes.length === 0 ? (
        <Loading size={"large"} className="mt-20" />
      ) : (
        <View>
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        </View>
      )}
    </View>
  );
}
