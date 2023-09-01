import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (res && res.data) {
        setRecipes(res.data.meals);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  };

  return (
    <View className="flex-1 bg-white ">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="flex-row items-center justify-between mx-4 mb-2 ">
          <Image
            source={require(`../assets/images/avatar.png`)}
            style={{ width: hp(5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and motto */}
        <View className="mx-4 mb-2 space-y-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello, Sunny
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.6) }}
            >
              Try dey cook your own
            </Text>
          </View>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.6) }}
          >
            food for <Text className="text-red-500">house</Text>
          </Text>
        </View>

        {/* Search bar */}
        <View className="mx-4 flex-row  items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 pl-3 mb-1 text-base tracking-wider"
          />
          <View className="p-3 bg-white rounded-full ">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* category section */}
        <View>
          {categories && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
