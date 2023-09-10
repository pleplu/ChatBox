import { useEffect, useState } from 'react';
import { Bubble, InputToolbar, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Text, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {

  const { name, userID } = route.params;

  const [color, setColor] = useState('#f9f9f9');

  const [textColor, setTextColor] = useState('black');

  const [modalVisible, setModalVisible] = useState(false);

  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]), setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
    navigation.setOptions({title: name});

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
      });
      setMessages(newMessages);
    });

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  // UI options for message containers
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'black',
          padding: 5,
          marginBottom: 5,
        },
        left: {
          backgroundColor: '#f9f9f9',
          padding: 5,
          marginBottom: 5,
        }
      }}
    />
  }

  // UI options for text input
  const MessengerBarContainer = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#f9f9f9',
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 6,
          borderTopColor: "transparent",
        }}
      />
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={{height: 60, backgroundColor: '#f9f9f9'}}>
        <TouchableOpacity
          style={{position: 'absolute', top: 10, left: 20}}
          onPress={() => setModalVisible(true)}
          accessible={true}
          accessibilityLabel="Color options"
          accessibilityHint="Press icon to open background color selector."
          accessibilityRole="button">
          <Text style={[styles.text, {fontSize: 26, fontWeight: '700',}]}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title, {position: 'absolute', right: 60, left: 60, top: 10,}]}>ChatBox</Text>
      </View>

      <View style={{flex: 1,}}>
        <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={(props) => MessengerBarContainer(props)}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
        accessible={true}
        accessibilityLabel="Text input field"
        accessibilityHint="Text input field for sending messages in chat."
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.modalView, {backgroundColor: color, borderColor: textColor}]}>
          <Text style={[styles.text, {marginBottom: 20, color: textColor,}]}>Select a color</Text>
          <TouchableOpacity
            style={{position: 'absolute', top: 15, right: 15,}} 
            onPress={() => {setModalVisible(!modalVisible)}}
            accessible={true}
            accessibilityLabel="Exit"
            accessibilityHint="Press icon to close window."
            accessibilityRole="button">
            <Text style={styles.text}>❌</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => {setColor('black'), setTextColor('white')}} 
              style={[styles.button1, styles.button0]}
              accessible={true}
              accessibilityLabel="Black"
              accessibilityHint="Changes background color to black."
              accessibilityRole="button"> 
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {setColor('#f9f9f9'), setTextColor('black')}} 
              style={styles.button1}
              accessible={true}
              accessibilityLabel="White"
              accessibilityHint="Changes background color to white."
              accessibilityRole="button">
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {setColor('pink'), setTextColor('black')}} 
              style={[styles.button1, styles.button2]}
              accessible={true}
              accessibilityLabel="Pink"
              accessibilityHint="Changes background color to pink."
              accessibilityRole="button">
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {setColor('peachpuff'), setTextColor('black')}} 
              style={[styles.button1, styles.button3]}
              accessible={true}
              accessibilityLabel="Peach puff"
              accessibilityHint="Changes background color to peach puff."
              accessibilityRole="button">
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {setColor('paleturquoise'), setTextColor('black')}} 
              style={[styles.button1, styles.button4]}
              accessible={true}
              accessibilityLabel="Pale turquoise"
              accessibilityHint="Changes background color to pale turquoise."
              accessibilityRole="button">
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {setColor('plum'), setTextColor('black')}} 
              style={[styles.button1, styles.button5]}
              accessible={true}
              accessibilityLabel="Plum"
              accessibilityHint="Changes background color to plum."
              accessibilityRole="button">
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalView: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: '50%'
  },

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'monospace',
  },

  textInput: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'monospace',
  },

  text: {
    color: 'black', 
    fontWeight: '500', 
    fontSize: 18,
    fontFamily: 'monospace',
  },

  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  button0: {
    backgroundColor: 'black',
  },

  button1: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },

  button2: {
    backgroundColor: 'pink',
  },

  button3: {
    backgroundColor: 'peachpuff',
  },

  button4: {
    backgroundColor: 'paleturquoise',
  },

  button5: {
    backgroundColor: 'plum',
  },
});

export default Chat;
