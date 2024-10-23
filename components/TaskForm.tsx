import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

type FormData = {
  name: string;
  description: string;
};

export const TaskForm = () => {
  const [myData, setMyData] = useState<FormData>({
    name: "",
    description: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: myData,
  });
  const onSubmit = (data: FormData) => {
    const { name, description } = data;
    setMyData((prevValue) => ({ ...prevValue, name, description }));
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>
        Nombre <Text style={styles.label__mandatory}>*</Text>
      </Text>
      <Controller
        control={control}
        rules={{ required: "El nombre es requerido" }}
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
      <Controller
        control={control}
        rules={{ required: "La descripción es requerida" }}
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

      <Button
        title="Guardar"
        color="#639605"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    padding: 20,
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input__textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: "#CC3872",
    marginBottom: 10,
  },
});
