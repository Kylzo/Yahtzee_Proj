import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext.js";

import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      // Mettre url dans une variable
      const response = await fetch("http://192.168.0.155:3000/api/login", {
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
        setIsAuthenticated(true);
        router.push("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError("Une erreur est survenue");
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
            Connectez vous pour jouer !
          </Text>

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
            title="Se connecter"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <Text>{error}</Text>

          <View className="flex-row justify-center gap-1 pt-5">
            <Text>Vous n'avez pas de compte?</Text>
            <Link href="/sign-up" className="font-semibold">
              S'inscrire
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
