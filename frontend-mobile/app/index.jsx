import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full items-center justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[100px]"
          />
          <View className="mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Yahtzee
            </Text>

            <Text className="text-black/80 font-medium text-center mt-7">
              Venez jouer au meilleur jeu de tous les temps !
            </Text>
            <Text className="text-black/80 font-medium text-center mt-1">
              Vous ne serez absolument pas déçu et vivrez une expérience
              incroyable !
            </Text>
          </View>

          <CustomButton
            title="Se connecter"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-14"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
