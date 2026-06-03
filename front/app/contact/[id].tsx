import { Link, router, useLocalSearchParams } from "expo-router";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowBigLeft,
  EllipsisVertical,
  Mic,
  Paperclip,
  Phone,
  Send,
  Video,
} from "lucide-react-native";
import Message from "@/components/Message/Message";

export default function Contact() {
  const [contact, setContact] = useState<Contacts.ExistingContact>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<any[]>([
    {
      id: 1,
      text: "Salut, comment ça va ?",
      sender: "contact",
    },
    {
        id: 2,
        text: "Ça va bien, merci ! Et toi ?",
        sender: "user",
    },
    {
        id: 3,
        text: "Ça va, je suis en train de travailler sur un projet.",
        sender: "contact",
    }
  ]);

  const pictureColor = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
  ];

  useEffect(() => {
    async function loadContacts() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const result = await Contacts.getContactByIdAsync(id);
        setContact(result);
      }
    }

    loadContacts();
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: message.length + 1,
      text: input,
      sender: "user",
    };

    setMessage([...message, newMessage]);
    setInput("");

  }
    
  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.headContent}>
        <View style={styles.header}>
          <View style={styles.userLeft}>
            <Pressable onPress={() => router.back()}>
              <ArrowBigLeft />
            </Pressable>
            {contact?.imageAvailable && (
              <Image
                source={{ uri: contact.image?.uri }}
                style={styles.contactImage}
              />
            )}
            {!contact?.imageAvailable && (
              <View
                style={{
                  ...styles.contactImage,
                  backgroundColor:
                    pictureColor[
                      Math.floor(Math.random() * pictureColor.length)
                    ],
                }}
              >
                <Text style={styles.userFakePicture}>
                  {contact?.firstName?.substring(0, 1).toUpperCase()}
                  {contact?.lastName?.substring(0, 1).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.headerText}>
              {contact?.firstName} {contact?.lastName}
            </Text>
          </View>
          <View style={styles.userRight}>
            <Phone />
            <Video />
            <EllipsisVertical />
          </View>
        </View>
      </View>
      <View style={styles.messagesContainer}>
        {message.map((msg) => (
          <Text key={msg.id} style={{...styles.message, backgroundColor: msg.sender === "user" ? "#006AFF" : "#fff", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", color: msg.sender === "user" ? "#fff" : "#4a4a4a"}}>
            {msg.text}
          </Text>
        ))}
      </View>
      <View style={styles.messageInputContainer}>
        <Paperclip size={22} color="#8a8a8a" />
        <TextInput
          style={styles.messageInput}
          placeholder="Message..."
          placeholderTextColor="#8a8a8a"
          value={input}
          onChangeText={setInput}
        />
        {input.trim() === "" && <Mic size={22} color="#8a8a8a" />}
        {input.trim() !== "" && (
            <Pressable onPress={sendMessage}>
              <Send size={22} color="#8a8a8a" />
            </Pressable>
          )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headContent: {
    backgroundColor: "#f5f5f5",
    paddingBottom: 10,
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  userRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userFakePicture: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d0d0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopColor: "#D0D0D0",
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#ededed",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#4a4a4a",
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
    color: "#4a4a4a",
    borderColor: "#d0d0d0",
    borderWidth: 1,
  },
});
