import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TaskModal } from "@/components/TaskModal";

type todoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function TasksScreen() {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response?.json();
        setTodos(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#639605" />;
  }

  if (error) {
    return (
      <View style={styles.container__task}>
        <View style={styles.container__task__element}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
    );
  }

  const handleAddTask = () => {
    setOpenModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.container__pageTitle}>Mis Tareas</Text>
      {todos.map((todo: todoType) => (
        <View key={todo.id} style={styles.container__task}>
          <View style={styles.container__task__element}>
            {/* Text */}
            <View style={styles.container__task__element__text}>
              {/* Title */}
              <Text style={styles.container__task__element__title}>
                {todo.title}
              </Text>
              {/* Subtitle */}
              <Text style={styles.container__task__element__subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris,
                ac elementum ultrices mauris. Cursus urna
              </Text>
            </View>

            {/* Delete */}
            <View>
              <MaterialIcons name="delete" size={24} color="#B3B3B3" />
            </View>
          </View>
        </View>
      ))}

      {/* Add Task Btn */}
      <Button
        title="Añadir tarea"
        color="#639605"
        onPress={() => handleAddTask()}
      />

      {/* Task modal */}
      <TaskModal modalVisible={openModal} setModalVisible={setOpenModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  container__pageTitle: {
    marginVertical: 20,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555",
  },
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
    paddingHorizontal: 5,
  },
  container__task__element__text: {
    paddingRight: 5,
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
  error: {
    color: "#CC3872", // Color para el mensaje de error
    marginBottom: 10,
  },
});
