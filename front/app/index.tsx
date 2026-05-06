import { StyleSheet, Text, TextInput, View } from "react-native";
import { Plus, Search} from 'lucide-react'

export default function HomeScreen() {


  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messagerie</Text>
        <Plus style={styles.iconPlus} />
      </View>
      <View style={styles.searchBar}>
        <Search />
        <TextInput style={styles.input}></TextInput> 
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconPlus: {
    fontSize: 24,
    color: '#25a0ec'
  },
  input: {
    color: "white",
    width: "90%",
    ...({ outlineStyle: "none" } as any)
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#D0D0D0",
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});