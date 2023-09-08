import { View, Text } from "react-native";
import React from "react";
import { globalHeight } from "../constants";

export default function HeaderHome() {
  return (
    <View className="mx-4 mb-2 space-y-2">
      <Text
        className="text-neutral-600"
        style={{ fontSize: globalHeight(1.7) }}
      >
        Hello, Sunny
      </Text>
      <View>
        <Text
          className="font-semibold text-neutral-600"
          style={{ fontSize: globalHeight(3.6) }}
        >
          Try dey cook your own
        </Text>
      </View>
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: globalHeight(3.6) }}
      >
        food for <Text className="text-red-500">house</Text>
      </Text>
    </View>
  );
}
