import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import * as Contacts from 'expo-contacts';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function HomeScreen() {

  const [contactList, setContactList] = useState<Contacts.ExistingContact[]>([]);
  const [filterContact, setFilterContact] = useState<Contacts.ExistingContact[]>([]);

  const pictureColor = [
    "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548"
  ]

    useEffect(() => {
    async function loadContacts() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const result = await Contacts.getContactsAsync();
        setContactList(result.data);
        setFilterContact(result.data);
      }
    }

    loadContacts();
  }, []);

  const filter = (text: string) => {
    const result = contactList.filter(contact => {
      return contact.firstName?.toLowerCase().includes(text.toLowerCase()) || contact.lastName?.toLowerCase().includes(text.toLowerCase());
    });
    setFilterContact(result);
  };



  return (
    <View style={styles.container}>
      <View style={[styles.headContent]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Messagerie</Text>
          <Plus style={styles.iconPlus} />
        </View>
        <View style={styles.searchBar}>
          <Search style={styles.iconSearch}  />
          <TextInput style={styles.input} placeholder="Rechercher..." onChangeText={filter} /> 
        </View>
      </View>
      <View style={styles.conversationContainer}>
        <ScrollView style={styles.scroll}>
          {filterContact.length > 0 &&
            filterContact.map((contact) => {
              return (
                <Link style={styles.link} key={contact.id} href={{
                  pathname: '/contact/[id]',
                  params: { id: contact.id }
                }}>
                <View style={styles.userCard}>
                  <View style={styles.userLeft}>
                    {contact.imageAvailable && (
                      <Image source={{ uri: contact.image?.uri }} style={styles.contactImage} />
                    )}
                    {!contact.imageAvailable && (
                      <View style={{...styles.contactImage, backgroundColor: pictureColor[Math.floor(Math.random() * pictureColor.length)]}}>
                        <Text style={styles.userFakePicture}>
                          {contact.firstName?.substring(0, 1).toUpperCase()}
                          {contact.lastName?.substring(0, 1).toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.userContent}>
                    <Text style={styles.userName}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {false && //lastMessage
                        <>Dernier message </>
                      }
                      {true &&
                        <>Pas de message</>
                      }
                    </Text>
                  </View>
                  <View style={styles.userRight}>
                    <Text style={styles.lastMessageDate}>Hier</Text>
                    {false && //hasUnreadMessages
                      <Text style={styles.unreadText}>1</Text>
                    }
                    {true &&
                      <View style={styles.unread}>
                        <Text style={styles.unreadText}>1</Text>
                      </View>
                    }

                  </View>
                </View>
                </Link>
              )
            })}
        </ScrollView>
      </View>
    </View>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContent: {
    backgroundColor: "#f5f5f5",
    paddingBottom: 10,
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    paddingTop: 50,
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
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  scroll: {
    flex: 1,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d0d0d0",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  userContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c1c1e",
    marginBottom: 4,
  },
  lastMessage: {
    color: "#8e8e93",
    fontSize: 14,
  },
  userRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginLeft: 8,
  },
  userLeft: {
    position: "relative",
  },
  lastMessageDate: {
    color: "#8e8e93",
    fontSize: 13,
    marginBottom: 6,

  },
  unread: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: "#2f6bff",
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  userFakePicture: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 12,  
  },
  link: {
    display: "flex",
    width: "100%",
  }
});