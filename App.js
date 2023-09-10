// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyAE9Wla8JqL1tLE0Oc_Se6PYBMMc87yMpg",
    authDomain: "chatbox-c94a2.firebaseapp.com",
    projectId: "chatbox-c94a2",
    storageBucket: "chatbox-c94a2.appspot.com",
    messagingSenderId: "71864105681",
    appId: "1:71864105681:web:8659748b21de2eedd8e3f0",
    measurementId: "G-WG5WZD671V"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">

        <Stack.Screen name="Home" component={Start} />

        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;