import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://192.168.0.155:3000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
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
          "http://192.168.0.155:3000/api/current-user",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.log(error);
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, []);

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
