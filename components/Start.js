import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';

// imports authorization utilities
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {

  const image = require('../assets/tree-background.jpg');

  const [name, setName] = useState('');

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid, name:name});
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>Welcome to ChatBox</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Enter username...'
        onSubmitEditing={signInUser}
        accessible={true}
        accessibilityLabel="Enter username"
        accessibilityHint="Enter username then press enter to proceed."
      />
      {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    textAlign: 'center',
    fontSize: 22,
    marginBottom: '50%',
    marginTop: 10,
  },

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});

export default Start;