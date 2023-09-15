# ChatBox

Welcome to ChatBox!

ChatBox is a fully fleshed out messaging app with image and location utilites as well as limited offline functionality. 

The Dependencies for this project are as follows:

"@react-native-async-storage/async-storage": "1.18.2",
"@react-native-community/netinfo": "9.3.10",
"@react-navigation/native": "^6.1.7",
"@react-navigation/native-stack": "^6.9.13",
"expo": "~49.0.8",
"expo-image-picker": "~14.3.2",
"expo-location": "~16.1.0",
"expo-media-library": "~15.4.1",
"expo-status-bar": "~1.6.0",
"firebase": "^9.23.0",
"react": "18.2.0",
"react-native": "0.72.4",
"react-native-gifted-chat": "^2.4.0",
"react-native-maps": "1.7.1",
"react-native-safe-area-context": "4.6.3",
"react-native-screens": "~3.22.0"

You will also need to downgrade your current version of node to 16.19.0 if neccessary as well as creating your own database on Firebase.

To create your own databse for use with this app simply navigate to https://console.firebase.google.com after creating a free account.

From here select "Add project" and go through the intial steps of naming your project and chosing whether or not to implement Google analytics.

Then "Build" a "Firestorm Database" using the corresponding options from the menu on the left of your screen. 

Create your database using the default setting and choose the region closest to you.

Then, once your database has initalized, selcted the "Rules" tab and change "allow read, write: if false;" to "allow read, write: if true;".

From the Rules tab, navigate to "Project setting" by clicking on the gear besides "Project Overview" at the top of the menu on the left of your screen.

Register your app by selecting the "</>" button at the bottom of the page. Choose a name and then select "Register app".

Lastly copy your app's personal Firebase configuration using the data provided by Firebase. The code will look like this:

const firebaseConfig = {
  YOUR_DATA_HERE
};

Paste this code over the matching code already in the app to link your own databse.

Also be sure to create "Storage" for your app using the same intial steps you followed to create a database. Change "allow read, write: if false;" to "allow read, write: if true;" in "Rules" as well.


