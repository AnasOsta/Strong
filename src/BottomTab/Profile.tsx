import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { dbauth, db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "react-native";
import { User, UserContext } from "../../Context/UserContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { unregisterIndieDevice } from "native-notify";

import Icon from "react-native-vector-icons/Ionicons";
import Login from "../../Components/Auth/Login";
import Account from "../../Components/Auth/Account";
import SignUp from "../../Components/Auth/Signup";

const ProfileScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext<User | undefined>(UserContext);
  const Tab = createMaterialTopTabNavigator();

  const fetchData = async () => {
    try {
      if (dbauth.currentUser) {
        // Reference to the Firestore collection
        const myCollectionRef = collection(db, "Users");

        // Fetch data from Firestore
        const querySnapshot = await getDocs(myCollectionRef);

        // Extract data from the query snapshot
        const newData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().id === dbauth.currentUser?.uid) {
            newData.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        });
        // Update the state with the retrieved data
        setUser(newData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(dbauth, (user1) => {
      if (user1) {
        fetchData();
      }
    });
  }, []);

  const signOut = async () => {
    try {
      unregisterIndieDevice(user.id, 17399, "4plE8NDxbDLTMcXbY7WxDg");
      setUser({
        id: "null",
        name: "null",
        email: "null",
        rule: "null",
      });
      await dbauth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user.id !== "null" ? (
        <>
          <>
            <Account />
          </>
          <Button title="Çıkış Yap" onPress={signOut} color="red" />
        </>
      ) : (
        <>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: "#C5C5C5",
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === "Login") {
                  iconName = focused ? "log-in" : "log-in-outline";
                } else if (rn === "SignUp") {
                  iconName = focused ? "person-add" : "person-add-outline";
                }
                return <Icon name={iconName} size={25} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="SignUp" component={SignUp} />
          </Tab.Navigator>
        </>
      )}
    </>
  );
};
export default ProfileScreen;
