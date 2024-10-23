import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function HomeScreen() {
  const [myData, setMyData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: myData,
  });
  const onSubmit = (data: FormData) => {
    const { name, email, phone } = data;
    setMyData((prevValue) => ({ ...prevValue, name, email, phone }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.container__pageTitle}>Mis Datos</Text>
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
          Email <Text style={styles.label__mandatory}>*</Text>
        </Text>
        <Controller
          control={control}
          rules={{ required: "El email es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>
          Teléfono <Text style={styles.label__mandatory}>*</Text>
        </Text>
        <Controller
          control={control}
          rules={{ required: "El teléfono es requerido" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}

        <Button
          title="Guardar"
          color="#639605"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555555", // Color de las etiquetas
  },
  label__mandatory: {
    color: "#CC3872",
  },
  input: {
    height: 40,
    borderColor: "#ccc", // Color del borde del input
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: "#CC3872", // Color para el mensaje de error
    marginBottom: 10,
  },
});
