import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, Square3Stack3DIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";

export default function RecipeDetailScreen(props) {
  const navigation = useNavigation();
  let item = props.route.params;
  const [isFav, setIsFav] = useState(false);
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRecipeDetail = async (id) => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (res && res.data) {
        // const filteredArray = res.data.meals.filter((obj) => {
        //   return Object.keys(obj).some((key) => {
        //     const value = obj[key];
        //     return value !== "" && value !== null;
        //   });
        // });
        setMealData(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  useEffect(() => {
    getRecipeDetail(item.idMeal);
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      {/* Bcak Button */}
      <View className="absolute flex-row items-center justify-between w-full pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 ml-5 bg-white rounded-full"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#FF0000"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="p-2 mr-5 bg-white rounded-full"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meal description  */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="justify-between px-4 pt-8 space-y-4">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              className="flex-1 font-bold text-neutral-600"
              style={{ fontSize: hp(3) }}
            >
              {mealData?.strMeal}
            </Text>

            <Text
              className="flex-1 font-medium text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {mealData?.strArea}
            </Text>
          </View>

          {/* misc */}
          <View className="flex-row justify-around">
            {/* Cooking time */}
            <View className="flex p-2 bg-red-300 rounded-full">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  35
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Mins
                </Text>
              </View>
            </View>

            {/* User Servings */}
            <View className="flex p-2 bg-red-300 rounded-full">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  04
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Serves
                </Text>
              </View>
            </View>

            {/* Calories */}
            <View className="flex p-2 bg-red-300 rounded-full">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  103
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Cals
                </Text>
              </View>
            </View>

            {/* Cooking difficulty */}
            <View className="flex p-2 bg-red-300 rounded-full">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  -
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* ingredients  */}
          <View className="space-y-4">
            <Text
              className="flex-1 font-bold text-neutral-700 "
              style={{ fontSize: hp(2.5) }}
            >
              Ingredients
            </Text>
            <View className="ml-3 space-y-2">
              {ingredientsIndexes(mealData).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-red-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-600"
                      >
                        {mealData[`strMeasure${i}`]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {mealData[`strIngredient${i}`]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Instructions  */}
          <View className="space-y-4">
            <Text
              className="flex-1 font-bold text-neutral-700 "
              style={{ fontSize: hp(2.5) }}
            >
              Instructions
            </Text>
            <Text className="text-neutral-700" style={{ fontSize: hp(1.6) }}>
              {mealData?.strInstructions}
            </Text>
          </View>

          {/* Recipe Video */}
          {mealData.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="flex-1 font-bold text-neutral-700"
              >
                Recipe Video
              </Text>
              <View></View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
