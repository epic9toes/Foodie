import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ClockIcon, FireIcon, UsersIcon } from "react-native-heroicons/outline";
import { Square3Stack3DIcon } from "react-native-heroicons/solid";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import Animated, { FadeInDown } from "react-native-reanimated";
import YoutubeIframe from "react-native-youtube-iframe";
import { URL_API } from "../constants";
import { ErrorHandler } from "../helpers/errorHandler";
import BackButton from "../components/RecipeDetailComp/backBtn";
import { RootStackParamList } from "../navigation/types";

type RecipeDetailScreenProps = {
  route: RouteProp<RootStackParamList, "RecipeDetail">;
};

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const item = route.params;
  const { strMeal, strMealThumb, idMeal } = item;
  const [isFav, setIsFav] = useState<boolean>(false);
  const [mealData, setMealData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getRecipeDetail = async (id: string) => {
    try {
      const res = await axios.get(`${URL_API}lookup.php?i=${id}`);

      if (res?.data) {
        setMealData(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(ErrorHandler(error));
    }
  };

  const ingredientsIndexes = (meal: Record<string, string>) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  useEffect(() => {
    getRecipeDetail(idMeal);
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
        <Animated.Image
          defaultSource={require("../assets/images/food.png")}
          source={{ uri: strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          sharedTransitionTag={strMeal}
        />
      </View>

      {/* Back Button */}
      <BackButton isFav={isFav} setIsFav={setIsFav} />

      {/* meal description  */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="justify-between px-4 pt-8 space-y-4">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
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
          </Animated.View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
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
          </Animated.View>

          {/* ingredients  */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
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
          </Animated.View>

          {/* Instructions  */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              className="flex-1 font-bold text-neutral-700 "
              style={{ fontSize: hp(2.5) }}
            >
              Instructions
            </Text>
            <Text className="text-neutral-700" style={{ fontSize: hp(1.6) }}>
              {mealData?.strInstructions}
            </Text>
          </Animated.View>

          {/* Recipe Video */}
          {mealData.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="flex-1 font-bold text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(mealData?.strYoutube) || ""}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
