import { View, Text, TextInput } from "react-native";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { globalHeight } from "../constants";

export default function Search() {
  return (
    <View className="mx-4 flex-row  items-center rounded-full bg-black/5 p-[6px]">
      <TextInput
        placeholder="Search any recipe"
        placeholderTextColor={"gray"}
        style={{ fontSize: globalHeight(1.7) }}
        className="flex-1 pl-3 mb-1 text-base tracking-wider"
      />
      <View className="p-3 bg-white rounded-full ">
        <MagnifyingGlassIcon
          size={globalHeight(2.5)}
          strokeWidth={3}
          color={"gray"}
        />
      </View>
    </View>
  );
}
