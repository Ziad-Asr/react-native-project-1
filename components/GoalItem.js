import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={() => props.onDeleteItem(props.id)}
        android_ripple={{ color: "#210644" }} // Android
        style={({ pressed }) => pressed && styles.pressedItem} // IOS & Android
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});

// android_ripple={{ color: "#210644" }} => To make this ripple color take the full size we made the <View/> parent
// and made pressable a child that takes all width and height
// This is for (android)only so it's alternative for (ios) => style={({ pressed }) => pressed && styles.pressedItem}
