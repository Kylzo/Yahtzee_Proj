import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("http://192.168.0.155:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      setIsSubmitting(false);

      if (response.ok) {
        const { token } = data;
        await AsyncStorage.setItem("jwt-token", token);
        router.push("/sign-in");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setIsSubmitting(false);
      setError(true);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="justify-center w-full h-full px-4 my-6">
          <View className="items-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="h-[100px]"
            />
          </View>
          <Text className="mt-5 text-2xl font-semibold text-center">
            Inscrivez vous pour jouer !
          </Text>

          <FormField
            title="Pseudo"
            value={form.pseudo}
            handleChangeText={(e) => setForm({ ...form, pseudo: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="S'inscrire"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <Text>{error}</Text>

          <View className="flex-row justify-center gap-1 pt-5">
            <Text>Vous avez déjà un compte?</Text>
            <Link href="/sign-in" className="font-semibold">
              Se connecter
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
