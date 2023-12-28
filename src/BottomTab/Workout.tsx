import { useState, useContext } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DataContext } from "../../Context/DataContext";

import GoalItem from "../../Components/GoalItem";
import GoalInput from "../../Components/GoalInput";
import GoalDetail from "../../Components/GoalDetail";
export default function Workout({ navigation }: any) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [detal, setDetal] = useState(false);
  const { data } = useContext(DataContext);
  const [currentData, setCurrentData] = useState({
    id: null,
    text: "",
    locationE: {
      latitude: 40.7881,
      longitude: 30.399,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    date: {
      year: "",
      month: "",
      day: "",
      hour: "",
    },
    spor: {
      type: "",
      duration: "",
    },
  });
  function endAddGoalHandler() {
    setModalIsVisible(false);
    setDetal(false);
  }
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function goalHandlerDetal(id) {
    data.map((goal) => {
      if (goal.id == id) {
        setCurrentData(goal);
        setDetal(true);
      }
    });
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <Button
          title="Yeni Egzersiz Ekle"
          color={"#5e0acc"}
          onPress={startAddGoalHandler}
        />

        <GoalDetail
          data={currentData}
          onCancel={endAddGoalHandler}
          visible={detal}
        />
        <GoalInput onCancel={endAddGoalHandler} visible={modalIsVisible} />

        <View style={styles.goalsContainer}>
          <FlatList
            data={data}
            renderItem={(item) => {
              return (
                <>
                  <>
                    <GoalItem
                      text={item.item.name}
                      loc={item.item.locationE}
                      date={item.item.date}
                      onDetal={goalHandlerDetal}
                      id={item.item.id}
                    />
                  </>
                </>
              );
            }}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
