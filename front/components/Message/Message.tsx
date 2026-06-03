import { StyleSheet, Text, View } from "react-native";

export default function Message({
  message,
  color,
}: {
  message: any;
  color: string;
}) {
  {
    return (
      <View style={styles.page}>
        <Text style={{ backgroundColor: color , padding: 10, borderRadius: 10 }}>{message}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
