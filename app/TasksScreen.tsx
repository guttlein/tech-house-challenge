import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { TaskModal } from "@/components/TaskModal";
import { TaskContext } from "@/context/TaskContext";
import { responseType, todoType } from "@/types/todoType";
import { TaskList } from "@/components/TaskList";

// Texto Default en caso de no traer descripción
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris,ac elementum ultrices mauris. Cursus urna";

export default function TasksScreen() {
  // Estado para tareas
  const [todos, setTodos] = useState<todoType[]>([]);
  // Estado de carga para traer las tareas.
  const [loading, setLoading] = useState<boolean>(true);
  // Estado de error para mostrar mensaje
  const [error, setError] = useState<string | null>(null);
  // Estado del modal para crear nueva tarea
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Creo un contador incremental para evitar que los ID se repitan al crear y eliminar elementos de la lista
  // !Lo inicio desde 4 ya que trae los 3 primeros elementos desde el fetch
  const [taskCounter, setTaskCounter] = useState(4);

  useEffect(() => {
    // Trae las tareas del fetch, extrae las 3 primeras y se deshace de los elementos innecesarios para guardarlo en la lista de estados
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

  // Muestra indicador de carga mientras trae las tareas del fetch
  if (loading) {
    return <ActivityIndicator size="large" color="#639605" />;
  }

  // Muestra error en caso de que algun error ocurra con el fetch
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

  // Busca el elemento por su ID y lo elimina
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
        <TaskList todos={todos} handleDeleteTask={handleDeleteTask} />

        {/* Add Task Btn */}

        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.buttonTextConfirm}>Añadir tarea</Text>
        </TouchableOpacity>

        {/* Task modal */}
        <TaskModal
          modalVisible={openModal}
          setModalVisible={setOpenModal}
          taskCounter={taskCounter}
          setTaskCounter={setTaskCounter}
        />
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
  error: {
    color: "#CC3872",
    marginBottom: 10,
  },
  buttonTextConfirm: {
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
