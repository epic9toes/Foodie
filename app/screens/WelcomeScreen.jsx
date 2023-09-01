import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5), 100))
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring1padding.value + hp(5.5), 300))
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
            style={{ width: hp(20), height: hp(20) }}
            className="rounded-full"
          />
        </Animated.View>
      </Animated.View>

      {/* caption with motto */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold tracking-widest text-white "
        >
          Foodie
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium tracking-widest text-white "
        >
          Hunger no dey hear word!
        </Text>
      </View>
    </View>
  );
}
