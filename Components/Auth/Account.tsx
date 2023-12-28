import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";
import { UserContext } from "../../Context/UserContext";
export default function Account() {
  const [editedData, setEditedData] = useState(false);
  const { user, setUser } = useContext(UserContext);

  function edit() {
    updateDoc(doc(db, "Users", user[0]?.id), {
      name: user[0]?.name,
      email: user[0]?.email,
    });
    setEditedData(false);
  }
  return (
    <>
      {user[0]?.id ? (
        <View style={styles.container}>
          {editedData ? (
            <View>
              <TextInput
                onChangeText={(text) => setUser({ ...user, name: text })}
              >
                {user[0]?.name}
              </TextInput>
              <TextInput
                onChangeText={(text) => setUser({ ...user, email: text })}
              >
                {user[0]?.email}
              </TextInput>
              <Button onPress={edit} title="Kaydet"></Button>
              <Button
                onPress={() => setEditedData(false)}
                title="Vazgeç"
              ></Button>
            </View>
          ) : (
            <View style={styles.container}>
              <Text>Ad : {user[0]?.name}</Text>
              <Text>E-posta : {user[0]?.email}</Text>
              <Text>Rule : {user[0]?.rule}</Text>
              <Button
                title="Düzenle"
                onPress={() => setEditedData(true)}
              ></Button>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
