import { StyleSheet, View, Text, Pressable } from "react-native";

function UsersItem(props) {
  return (
    <View style={styles.goalStyle}>
      <Text style={styles.TextStyle}>User ID : {props.data.id}</Text>
      <Text style={styles.TextStyle}>User Name : {props.data.name}</Text>
      <Text style={styles.TextStyle}>User Email : {props.data.email}</Text>
      <Text style={styles.TextStyle}>User Rule : {props.data.rule}</Text>
    </View>
  );
}

export default UsersItem;

const styles = StyleSheet.create({
  goalStyle: {
    margin: 8,
    height: 150,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    backgroundColor: "#9964DE",
    justifyContent: "center",
  },
  TextStyle: {
    alignItems: "center",
    marginRight: 50,
  },
});
