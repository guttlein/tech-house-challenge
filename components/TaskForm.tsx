import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskContext } from "@/context/TaskContext";
import { todoType } from "@/types/todoType";

type FormData = {
  name: string;
  description: string;
};

interface TaskFormProps {
  setModalVisible: (visible: boolean) => void;
  taskCounter: number;
  setTaskCounter: (id: number) => void;
}
// Validaciones para el formulario de Tareas
const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre deberia tener al menos 2 caracteres"),
  description: yup.string().required("La descripción es requerida"),
});

export const TaskForm: React.FC<TaskFormProps> = ({
  setModalVisible,
  taskCounter,
  setTaskCounter,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  // Traigo del contexto el set state para las tareas
  const { setTodos } = useContext(TaskContext);

  // Al hacer el submit del formulario, guardo los campos y se los agrego a la lista de tareas para luego mostrarlas
  const onSubmit = (data: FormData) => {
    const { name: title, description } = data;
    setTodos((prevValue: todoType[]) => [
      ...prevValue,
      { id: taskCounter, title, description },
    ]);
    setTaskCounter((prevValue: number) => prevValue + 1);
    setModalVisible(false);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>
        Nombre <Text style={styles.label__mandatory}>*</Text>
      </Text>

      {/* Form controller para el Nombre */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>
        Descripción <Text style={styles.label__mandatory}>*</Text>
      </Text>
      {/* Form controller para la descripción */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input__textArea}
            placeholder="Descripción"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={4}
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      {/* Form Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttontextConfirm}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555555",
  },
  label__mandatory: {
    color: "#CC3872",
  },
  input: {
    height: 40,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input__textArea: {
    borderColor: "#C9C9C9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: "#CC3872",
    marginBottom: 10,
  },
  buttonCancel: {
    backgroundColor: "#fff",
    color: "#555555",
    borderRadius: 5,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "#639605",
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonTextCancel: {
    color: "#555555",
    fontWeight: "bold",
  },
  buttontextConfirm: {
    color: "white",
    fontWeight: "bold",
  },
});
