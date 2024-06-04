import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  defaultValue,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-medium text-black">{title}</Text>

      <View className="relative">
        <TextInput
          className="w-full h-12 px-4 text-black border rounded-md border-black/60 focus:border-black"
          value={value}
          defaultValue={defaultValue}
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
