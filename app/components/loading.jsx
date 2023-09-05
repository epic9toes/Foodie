import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading(props) {
  return (
    <View className="flex items-center justify-center flex-1">
      <ActivityIndicator {...props} />
    </View>
  );
}
