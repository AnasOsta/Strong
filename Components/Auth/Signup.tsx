import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { dbauth, db } from "../../firebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function SignUp(props: any, { navigation }: any) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(text: any, eventName: any) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  const signUp = async () => {
    setLoading(true);
    const [name, email, password, passwordConfirm] = [
      values.name,
      values.email,
      values.password,
      values.passwordConfirm,
    ];
    try {
      if (password !== passwordConfirm) {
        alert("Passwords do not match");
        return;
      }
      await createUserWithEmailAndPassword(dbauth, email, password).then(
        (userCredential) => {
          addDoc(collection(db, "Users"), {
            id: dbauth.currentUser?.uid,
            name: name,
            email: email,
            rule: "user",
          });
        }
      );
      alert("Account Created");
      props.onSignUp();
    } catch (error) {
      console.log(error);
      alert("Sign Up Error" + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => handleChange(text, "name")}
        style={styles.input}
        placeholder="Kullanıcı Adı"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, "email")}
        placeholder="E-Posta"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, "password")}
        placeholder="Parola"
        secureTextEntry={true}
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, "passwordConfirm")}
        placeholder="Parola (Tekrar)"
        secureTextEntry={true}
        autoCapitalize="none"
      ></TextInput>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Kayıt Ol" onPress={signUp} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
});
