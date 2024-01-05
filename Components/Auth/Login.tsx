import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { dbauth } from "../../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { registerIndieID } from "native-notify";

const Login = (props: any, { navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      console.log(new Date());
      setLoading(true);
      const user = await signInWithEmailAndPassword(dbauth, email, password);
      registerIndieID(user.user.uid, 17399, "4plE8NDxbDLTMcXbY7WxDg");
      alert("Sign In Successful");
    } catch (error) {
      console.log(error);
      alert("Sign In Error" + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-Posta"
            keyboardType="email-address"
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Parola"
            secureTextEntry={true}
            autoCapitalize="none"
          ></TextInput>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button color={"#0CBBCF"} title="Giriş Yap" onPress={signIn} />
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    padding: 50,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  welcome: {
    color: "black",
    fontSize: 30,
  },
});
