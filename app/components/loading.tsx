import { View, ActivityIndicator } from "react-native";
import React from "react";

interface TypeProps {}

const Loading: React.FC<TypeProps> = ({ ...props }) => {
  return (
    <View className="flex items-center justify-center flex-1">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
