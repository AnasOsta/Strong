import { View, Text, Modal, Button } from "react-native";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useContext } from "react";
import { DataContext } from "../Context/DataContext";

export default function GoalDetail(props) {
  const [edit, setEdit] = useState(false);
  const { data, setData, dataHistory, setDataHistory } =
    useContext(DataContext);
  const [enteredGoal, setEnteredGoal] = useState({
    text: "",
    locationE: {
      latitude: 40.7881,
      longitude: 30.399,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    year: "",
    month: "",
    day: "",
    hour: "",
    type: "",
    duration: "",
  });

  function editHandler() {
    setEdit(false);
  }
  function inputGoalHandler(text: any, eventName: any) {
    data.map((goal: any) => {
      if (goal.id == props.data.id) {
        setEnteredGoal((prev) => {
          return {
            ...prev,
            [eventName]: text,
          };
        });
      }
    });
  }

  function delet() {
    setData((currentData: any) => {
      return currentData.filter((goal: any) => {
        return goal.id !== props.data.id;
      });
    });
    props.onCancel();
  }

  function done() {
    setDataHistory((currentGoals: any) => [...currentGoals, props.data]);

    setData((currentData: any) => {
      return currentData.filter((goal: any) => {
        return goal.id !== props.data.id;
      });
    });
    props.onCancel();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View>
        <>
          <MapView
            style={{ width: "100%", height: "75%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={props.data.locationE}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <MapMarker coordinate={props.data.locationE} />
          </MapView>
          <Text>Spor Adı : {props.data.text}</Text>
          <Text>
            Tarih : {props.data.date.date} {props.data.date.time}
          </Text>
          <Text>Sport Tür : {props.data.spor.type}</Text>
          <Text>Süre : {props.data.spor.duration}</Text>
        </>

        <Button title="Tamamla" onPress={done} color={"#f31282"}></Button>
        <Button title="Sil" onPress={delet} color={"red"}></Button>
        <Button
          title="kapat"
          onPress={() => (props.onCancel(), setEdit(false))}
          color={"#f31282"}
        ></Button>
      </View>
    </Modal>
  );
}
