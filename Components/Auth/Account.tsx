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
export default function Account(props: any) {
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
            <View style={styles.container1}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setUser({ ...user, name: text })}
              >
                {user[0]?.name}
              </TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setUser({ ...user, email: text })}
              >
                {user[0]?.email}
              </TextInput>
              <Button color={"#0CBBCF"} onPress={edit} title="Kaydet"></Button>
              <Button
                color={"#BE0E0E"}
                onPress={() => setEditedData(false)}
                title="Vazgeç"
              ></Button>
            </View>
          ) : (
            <View style={styles.container1}>
              <Text style={styles.TextStyle}>Ad : {user[0]?.name}</Text>
              <Text style={styles.TextStyle}>E-posta : {user[0]?.email}</Text>
              <Text style={styles.TextStyle}>Rule : {user[0]?.rule}</Text>
              <Button
                color={"#0CBBCF"}
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
  container1: {
    borderWidth: 1,
    borderColor: "#C2BEBE",
    padding: 20,
  },
  container: {
    justifyContent: "center",
    padding: 50,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  TextStyle: {
    height: 50,
    width: 250,
  },
});
