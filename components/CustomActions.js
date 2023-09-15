import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

// imports firebase storage utilities
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//imports image and location utilities
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CustomActions = ({ onSend, storage, userID }) => {

  // generates a unique image path
  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }

  // takes unique image path and uploads photos to firebase storage, and sends image in chat
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
    });
  }

  // asks permission to access gallery then executes function
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  }

  // asks permission to access camera then executes function
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  }

  // renders approximate location of user
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

  const actionSheet = useActionSheet();

  // renders action button options
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      },
    );
  }

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="Action button"
      accessibilityHint="Press button to open image or location chat options."
      accessibilityRole="button">
        <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black', 
    fontWeight: '500', 
    fontSize: 22,
    fontFamily: 'monospace',
    marginTop: -10,
  },

  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: .75,
    backgroundColor: '#f9f9f9',
    padding: 5,
    marginLeft: 10,
    marginBottom: 8,
  },
})

export default CustomActions;