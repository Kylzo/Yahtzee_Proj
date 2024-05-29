import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-medium">{title}</Text>

      <View className="relative">
        <TextInput
          className="w-full h-12 px-4 border border-black/60 text-black rounded-md focus:border-black"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#f00"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute top-1/4 right-4"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeClosed}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
