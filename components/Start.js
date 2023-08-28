import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const Start = ({ navigation }) => {

  const image = require('../assets/tree-background.jpg');

  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>Welcome to ChatBox</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Enter username...'
        onSubmitEditing={() => navigation.navigate('Chat', {name: name})}
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