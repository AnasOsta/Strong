import { StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";

function GoalItem(props) {
  return (
    <View style={styles.goalStyle}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={props.onDetal.bind(this, props.id)}
        style={styles.pressableStyle}
      >
        <MapView
          style={{ width: "100%", height: "80%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={props.loc}
        >
          <MapMarker coordinate={props.loc} />
        </MapView>
        <Text style={styles.goalText}>{props.text}</Text>
        <Text style={styles.goalText}>{props.date.date}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalStyle: {
    margin: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
  pressableStyle: {
    alignItems: "center",
    height: 200,
    justifyContent: "center",
  },
});
