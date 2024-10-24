import { todoType } from "@/types/todoType";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

type taskListProps = {
  todos: todoType[];
  handleDeleteTask: (id: number) => void;
};

export const TaskList = ({ todos, handleDeleteTask }: taskListProps) => {
  const renderTask = ({ item }: ListRenderItemInfo<todoType>) => (
    <View key={item.id} style={styles.container__task}>
      <View style={styles.container__task__element}>
        {/* Text */}
        <View style={styles.container__task__element__text}>
          {/* Title */}
          <Text style={styles.container__task__element__title}>
            {item.title}
          </Text>
          {/* Subtitle */}
          <Text style={styles.container__task__element__subtitle}>
            {item.description}
          </Text>
        </View>

        {/* Delete */}
        <View>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <MaterialIcons name="delete" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <FlatList
      data={todos}
      renderItem={renderTask}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container__task: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  container__task__element: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  container__task__element__text: {
    paddingRight: 5,
    width: "90%",
  },
  container__task__element__title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#333333",
  },
  container__task__element__subtitle: {
    fontSize: 12,
    color: "##777777",
    fontWeight: "400",
  },
});
