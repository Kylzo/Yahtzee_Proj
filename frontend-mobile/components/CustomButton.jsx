import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`bg-black h-12 rounded-md items-center justify-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white text-base ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
