import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { TaskForm } from "./TaskForm";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface TaskModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Añadir tarea</Text>
          <TaskForm setModalVisible={setModalVisible} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    alignSelf: "flex-start",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
