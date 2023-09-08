import { StackNavigationProp } from "@react-navigation/stack";

export type item = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type RootStackParamList = {
  Home: undefined;
  RecipeDetail: {
    item: item;
  };
  // Define other screens and their parameters
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
