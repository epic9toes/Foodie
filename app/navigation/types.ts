import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  RecipeDetail: {
    item: {
      strMeal: string;
      strMealThumb: string;
      idMeal: string;
    };
  };
  // Define other screens and their parameters
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
