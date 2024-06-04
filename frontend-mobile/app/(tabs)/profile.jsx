import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { setIsAuthenticated, token } = useAuth();
  const [form, setForm] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null); // Efface les erreurs de formulaire s'il n'y en a pas

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `http://10.71.128.192:3000/api/player?id_player=${user.id_player}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      setIsSubmitting(false);

      if (!res.ok) {
        setError(data.message);
        return;
      }

      const response = await fetch(
        "http://10.71.128.192:3000/api/current-user",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setIsSubmitting(false);
      setError("Une erreur s'est produite lors de la mise à jour du profil.");
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://10.71.128.192:3000/api/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        await AsyncStorage.removeItem("jwt-token");
        setIsAuthenticated(false);
        router.push("/sign-in");
      } else {
        console.error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://10.71.128.192:3000/api/current-user",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="justify-center w-full h-full px-4 my-6">
          {user && (
            <>
              <Text className="mt-5 text-2xl font-semibold text-center">
                Profil de {user.pseudo}
              </Text>

              <FormField
                title="Pseudo"
                defaultValue={user.pseudo}
                handleChangeText={(e) => setForm({ ...form, pseudo: e })}
                otherStyles="mt-7"
              />

              <FormField
                title="Email"
                defaultValue={user.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
              />

              <FormField
                title="Password"
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
              />

              <CustomButton
                title="Mettre à jour"
                handlePress={handleSubmit}
                containerStyles="mt-7"
                isLoading={isSubmitting}
              />

              <Text>{error}</Text>

              <CustomButton
                title="Se déconnecter"
                handlePress={handleLogOut}
                containerStyles="mt-7"
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
