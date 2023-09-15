// imports the screens
import Start from './components/Start';
import Chat from './components/Chat';

// imports react / react-native utilites
import { useEffect } from "react";
import { Alert } from 'react-native';

// imports react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// imports firestorm database / offline utilites
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";

// creates the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  // determines if user is online or offline
  const connectionStatus = useNetInfo();
 
  // alerts user of connection status and determines database access accordingly
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyAE9Wla8JqL1tLE0Oc_Se6PYBMMc87yMpg",
    authDomain: "chatbox-c94a2.firebaseapp.com",
    projectId: "chatbox-c94a2",
    storageBucket: "chatbox-c94a2.appspot.com",
    messagingSenderId: "71864105681",
    appId: "1:71864105681:web:8659748b21de2eedd8e3f0",
    measurementId: "G-WG5WZD671V"
  };

  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">

        <Stack.Screen name="Home" component={Start} />

        <Stack.Screen name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;