import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Plus, Search} from 'lucide-react'
import Conversation from "@/components/Conversation/Conversation";
import { useEffect, useState } from "react";
import fakeConversation from "../assets/mocks/fakeConversation.json";

export default function HomeScreen() {

  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    setConversations(fakeConversation.conversations);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Messagerie</Text>
          <Plus style={styles.iconPlus} />
        </View>
        <View style={styles.searchBar}>
          <Search style={styles.iconSearch} />
          <TextInput style={styles.input} placeholder="Rechercher..." /> 
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.conversationContainer}>
          {conversations.map((conversation) => (
            <Conversation key={`conv-${conversation.id}`} conversation={conversation} />
          ))}
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContent: {
    backgroundColor: "#f5f5f5",
    paddingBottom: 10,
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
  },
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
    color: "#4a4a4a",
    width: "90%",
    ...({ outlineStyle: "none" } as any)
  },
  iconSearch: {
    fontSize: 24,
    color: '#4a4a4a'
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#D0D0D0",
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ececec"
  },
  conversationContainer: {
    padding: 10,
  },
  scroll: {
    flex: 1,
  }
});