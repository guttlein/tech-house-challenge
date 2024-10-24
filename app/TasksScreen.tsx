import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TaskModal } from "@/components/TaskModal";
import { TaskContext } from "@/context/TaskContext";
import { responseType, todoType } from "@/types/todoType";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris,ac elementum ultrices mauris. Cursus urna";

export default function TasksScreen() {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response.json();
        const dataSliced = data.slice(0, 3);
        const responseToSave = dataSliced.map(
          ({ completed, userId, ...task }: responseType) => ({
            ...task,
            description: lorem,
          })
        );
        setTodos(responseToSave);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrio un error inesperado");
        }
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
  const handleDeleteTask = (id: number) => {
    const task = todos.find((element) => element.id === id);
    if (task) {
      const taskToDelete = todos.indexOf(task);
      setTodos(todos.toSpliced(taskToDelete, 1));
    }
  };

  return (
    <TaskContext.Provider value={{ setTodos }}>
      <View style={styles.container}>
        <Text style={styles.container__pageTitle}>Mis Tareas</Text>

        {/* Render Task List */}
        {todos.length > 0 &&
          todos?.map((todo: todoType) => (
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
                    {todo.description}
                  </Text>
                </View>

                {/* Delete */}
                <View>
                  <TouchableOpacity onPress={() => handleDeleteTask(todo.id)}>
                    <MaterialIcons name="delete" size={24} color="#B3B3B3" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

        {/* Add Task Btn */}

        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.buttontextConfirm}>Añadir tarea</Text>
        </TouchableOpacity>

        {/* Task modal */}
        <TaskModal modalVisible={openModal} setModalVisible={setOpenModal} />
      </View>
    </TaskContext.Provider>
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
  error: {
    color: "#CC3872",
    marginBottom: 10,
  },
  buttontextConfirm: {
    color: "white",
    fontWeight: "bold",
  },
  buttonConfirm: {
    backgroundColor: "#639605",
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
});
