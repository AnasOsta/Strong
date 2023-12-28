import { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import GoalItem from "../../Components/GoalItem";
import { DataContext } from "../../Context/DataContext";

export default function HistoryScreen({ navigation }: any) {
  const { dataHistory } = useContext(DataContext);

  function goalHandlerDetal() {}
  return (
    <View style={styles.appContainer}>
      <FlatList
        data={dataHistory}
        renderItem={(item) => {
          return (
            <GoalItem
              text={item.item.name}
              date={item.item.date}
              loc={item.item.locationE}
              onDetal={goalHandlerDetal}
              id={item.item.id}
            />
          );
        }}
        alwaysBounceVertical={false}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
