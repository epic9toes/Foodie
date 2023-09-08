import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { globalHeight } from "../../constants";
import { useNavigation } from "@react-navigation/native";

// Define an interface for the props
interface BackButtonProps {
  isFav: boolean;
  setIsFav: (val: boolean) => void;
}

const BackButton: React.FC<BackButtonProps> = ({ isFav, setIsFav }) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      entering={FadeIn.delay(200).duration(1000)}
      className="absolute flex-row items-center justify-between w-full pt-14"
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="p-2 ml-5 bg-white rounded-full"
      >
        <ChevronLeftIcon
          size={globalHeight(3.5)}
          strokeWidth={4.5}
          color={"#FF0000"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsFav(!isFav)}
        className="p-2 mr-5 bg-white rounded-full"
      >
        <HeartIcon
          size={globalHeight(3.5)}
          strokeWidth={4.5}
          color={isFav ? "red" : "gray"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BackButton;
