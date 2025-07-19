import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

const { height } = Dimensions.get("window");

function GoalInput({ visible, onAddGoal, onCancel }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const slideAnim = useRef(new Animated.Value(height)).current; // modal Y position
  const overlayOpacity = useRef(new Animated.Value(0)).current; // overlay opacity

  useEffect(() => {
    if (visible) {
      // Reset values
      slideAnim.setValue(height);
      overlayOpacity.setValue(0);

      // Start slide up first
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Then fade in the overlay
        Animated.timing(overlayOpacity, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Fade out overlay first
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      // Then slide down modal
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  function goalInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <Modal visible={visible} animationType="none" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalRoot}>
          {/* Overlay */}
          <Animated.View
            pointerEvents="none"
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />

          {/* Modal sliding content */}
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../assets/goal.png")}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your course goal!"
              placeholderTextColor="white"
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Add Goal" onPress={addGoalHandler} />
              </View>
              <View style={styles.button}>
                <Button title="Cancel" onPress={onCancel} color="red" />
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  modalContainer: {
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#533d96ff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 12,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
