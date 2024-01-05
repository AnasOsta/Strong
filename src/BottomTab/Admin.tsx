//import liraries
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { dbauth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import UsersItem from "../../Components/UsersItem";
// create a component
const Admin = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      if (dbauth.currentUser) {
        setUsers([]);
        // Reference to the Firestore collection
        const myCollectionRef = collection(db, "Users");

        // Fetch data from Firestore
        const querySnapshot = await getDocs(myCollectionRef);

        // Extract data from the query snapshot
        querySnapshot.forEach((doc) => {
          setUsers((currentUser) => [
            ...currentUser,
            {
              ...doc.data(),
              id: doc.id,
            },
          ]);
        });
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

  return (
    <View style={styles.appContainer}>
      {dbauth.currentUser?.uid ? (
        <>
          <FlatList
            data={users}
            renderItem={(item) => {
              return (
                <>
                  <UsersItem data={item.item} />
                </>
              );
            }}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </>
      ) : (
        <>{console.log(false)}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
export default Admin;
