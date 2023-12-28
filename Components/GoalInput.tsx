import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { DataContext } from "../Context/DataContext";
import { Picker } from "@react-native-picker/picker";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import DatePicker from "react-native-modern-datepicker";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

function GoalInput(props: any) {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today =
    new Date().getFullYear() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getDate() +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  const { data, setData } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [enteredGoal, setEnteredGoal] = useState({
    name: "",
    locationE: {
      latitude: 40.7881,
      longitude: 30.399,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    date: today.substring(0, today.indexOf(" ")),
    time: today.substring(today.indexOf(" ") + 1),
    type: "koşmak",
    duration: "",
  });
  function inputGoalHandler(text: any, eventName: any) {
    setEnteredGoal((prev) => {
      if (eventName == "date") {
        return {
          ...prev,
          ["date"]: text.substring(0, text.indexOf(" ")),
          ["time"]: text.substring(text.indexOf(" ") + 1),
        };
      }
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function addGoalHandler() {
    setData((currentGoals: any) => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        userId: user[0].id,
        completed: false,
        name: enteredGoal.name,
        locationE: enteredGoal.locationE,
        date: {
          date: enteredGoal.date,
          time: enteredGoal.time,
        },
        spor: {
          type: enteredGoal.type,
          duration: enteredGoal.duration,
        },
      },
    ]);
    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: user[0].id,
      appId: 17399,
      appToken: "4plE8NDxbDLTMcXbY7WxDg",
      title: "Strong App",
      message: enteredGoal.name,
    });
    setEnteredGoal({
      name: "",
      locationE: {
        latitude: 40.7881,
        longitude: 30.399,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      date: today.substring(0, today.indexOf(" ")),
      time: today.substring(today.indexOf(" ") + 1),
      type: "koşmak",
      duration: "",
    });

    props.onCancel();
  }

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Error getting current position:", error);
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/Images/target.png")}
        />
        <TouchableOpacity
          style={styles.inputBtn}
          onPress={() => setOpenStartDatePicker(true)}
        >
          <Text>{enteredGoal.date}</Text>
        </TouchableOpacity>
        <Modal
          visible={openStartDatePicker}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                minimumDate={today}
                current={enteredGoal.date}
                onSelectedChange={(date: any) => {
                  inputGoalHandler(date, "date");
                  setOpenStartDatePicker(false);
                }}
                options={{
                  backgroundColor: "#080516",
                  textHeaderColor: "#469ab6",
                  textDefaultColor: "#FFFFFF",
                  selectedTextColor: "#FFF",
                  mainColor: "#469ab6",
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />
            </View>
          </View>
        </Modal>

        <View style={{ padding: 5 }}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChange={(text) => inputGoalHandler(text, "locationE")}
            // onUserLocationChange={(e) => console.log(e)}
            region={{
              latitude: currentLocation?.latitude || 0,
              longitude: currentLocation?.longitude || 0,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Egzersiz Adı........"
          onChangeText={(text) => inputGoalHandler(text, "name")}
          value={enteredGoal.name}
        />

        <View style={styles.dateContainer}>
          <TextInput
            placeholder="Süre (dakika)"
            onChangeText={(text) => inputGoalHandler(text, "duration")}
            value={enteredGoal.duration}
            style={styles.datePicker}
          />

          <Picker
            style={{ width: "75%" }}
            selectedValue={enteredGoal.type}
            onValueChange={(itemValue, itemIndex) =>
              inputGoalHandler(itemValue, "type")
            }
          >
            <Picker.Item label="koşmak" value="koşmak" />
            <Picker.Item label="yürümek" value="yürümek" />
            <Picker.Item label="Ip atlamak" value="Ip atlamak" />
            <Picker.Item label="boks" value="boks" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Ekle" onPress={addGoalHandler} color={"#5e0acc"} />
          </View>
          <View style={styles.button}>
            <Button title="iptal" onPress={props.onCancel} color={"#f31282"} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C5C5C5",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#000000",
    width: "90%",
    borderRadius: 6,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  map: {
    width: "75%",
    height: "30%",
    padding: 200,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    padding: 8,
    width: "25%",
  },
  dateContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
