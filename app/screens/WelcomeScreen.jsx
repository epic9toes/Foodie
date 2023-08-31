import { View, Text, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function WelcomeScreen() {
  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-black">
      <StatusBar style="light" />

      {/* Logo image with designs */}
      <View className="p-10 rounded-full bg-white/20">
        <View className="p-8 rounded-full bg-white/20">
          <Image
            source={require(`../assets/images/welcome.jpg`)}
            style={{ width: hp(20), height: hp(20) }}
            className="rounded-full"
          />
        </View>
      </View>

      {/* caption with motto */}
      <View className="flex items-center space-y-2">
        <Text className="text-6xl font-bold tracking-widest text-white">
          Foodie
        </Text>
        <Text className="text-lg font-medium tracking-widest text-white">
          Hunger no dey hear word!
        </Text>
      </View>
    </View>
  );
}
