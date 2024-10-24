import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

// Validaciones para formulario de Mis Datos
const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre deberia tener al menos 2 caracteres"),
  email: yup
    .string()
    .required("Email es requerido")
    .email("Debe ser un email valido"),
  phone: yup
    .string()
    .required("El teléfono")
    .min(5, "El teléfono deberia tener al menos 5 números"),
});

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
    resolver: yupResolver(schema),
  });

  // Al realizar el Submit del formulario, guardo los datos
  // !Para el futuro, hay que crear sección de perfil para mostrar estos datos guardados
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
        {/* Form controller para Nombre */}
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

        {/* Form controller para Email */}
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

        {/* Form controller para Tel. */}
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

        {/* Btn de guardar */}
        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttontextConfirm}>Guardar</Text>
        </TouchableOpacity>
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
