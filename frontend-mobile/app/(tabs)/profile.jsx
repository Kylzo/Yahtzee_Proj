import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { setIsAuthenticated, token } = useAuth();
  const router = useRouter();

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
        console.log(error);
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
    <View className="justify-center w-full h-full px-4">
      {user && (
        <>
          <Text>Profil de {user.pseudo}</Text>
          <CustomButton title="Se déconnecter" handlePress={handleLogOut} />
        </>
      )}
    </View>
  );
};

export default Profile;
