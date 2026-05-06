import { Image, StyleSheet, Text, View } from "react-native";

export default function Conversation({conversation}: {conversation: any}) { 
  return (
    <View style={styles.conversationContainer}>
        <Image
          source={{ uri: conversation.avatar_url }}
          style={styles.avatar}
        />
    <View style={styles.conversationInfo}>
      <Text style={styles.conversationName}>{conversation.prenom} {conversation.nom}</Text>
      <Text>{conversation.dernier_message}</Text>
    </View>
      <Text>{conversation.heure}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    conversationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10
    },
    conversationInfo: {
        marginLeft: 10,
        flex: 1
    },
    conversationName:{
        fontSize: 16,
        fontWeight: 'bold',
        color: "#4a4a4a"
    }
});