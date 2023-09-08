import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { globalHeight } from "../constants";
import { RootStackNavigationProp } from "../navigation/types";

type WelcomeScreenProps = {
  navigation: RootStackNavigationProp<"Home">;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () =>
        (ring1padding.value = withSpring(ring1padding.value + globalHeight(5), {
          stiffness: 100,
        }))
    );
    setTimeout(
      () =>
        (ring2padding.value = withSpring(
          ring1padding.value + globalHeight(5.5),
          { stiffness: 300 }
        ))
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-black">
      <StatusBar style="light" />

      {/* Logo image with designs */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="rounded-full bg-white/20"
          style={{ padding: ring1padding }}
        >
          <Image
            source={require(`../assets/images/welcome.jpg`)}
            style={{ width: globalHeight(20), height: globalHeight(20) }}
            className="rounded-full"
          />
        </Animated.View>
      </Animated.View>

      {/* caption with motto */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: globalHeight(7) }}
          className="font-bold tracking-widest text-white "
        >
          Foodie
        </Text>
        <Text
          style={{ fontSize: globalHeight(2) }}
          className="font-medium tracking-widest text-white "
        >
          Hunger no dey hear word!
        </Text>
      </View>
    </View>
  );
};
export default WelcomeScreen;
