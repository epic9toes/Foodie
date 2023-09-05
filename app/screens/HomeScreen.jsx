import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BellIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import Search from "../components/search";
import { globalHeight, URL_API } from "../constants";
import HeaderHome from "../components/headerHome";

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
      const res = await axios.get(`${URL_API}categories.php`);
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const res = await axios.get(`${URL_API}filter.php?c=${category}`);
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
            style={{ width: globalHeight(5), height: globalHeight(5) }}
          />
          <BellIcon size={globalHeight(4)} color="gray" />
        </View>

        {/* greetings and motto */}
        <View>
          <HeaderHome />
        </View>

        {/* Search bar */}
        <View>
          <Search />
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
