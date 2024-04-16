import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
  Image,
} from "react-native";
import App from "../App";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-paper';
import MainPage from "./MainPage";
const Wing = require('../assets/Wings.jpg');
const Button1 = require('../assets/button.png');
const BackButton = require('../assets/backbutton.png');
const Feed = require('../assets/livefeed.png');
const Wallpaper = require('../assets/wallpaper.jpg');
const Linkcam = require('../assets/linkcam.png');
const Gallery = require('../assets/Gallery.png')
const AddPhoto = require('../assets/Addphoto.png');
const Upload = require('../assets/realupload.png');
const Library = require('../assets/library.png');
const Camera = require('../assets/camera.png');
const Settings = require('../assets/settings.png');
const Permission = require('../assets/Permission.png');
const MySettings = () =>{
  const [checkdata, setcheckdata] = useState('');
  const [fileData, setFileData] = useState(null);
  const [toggle, settoggle] = useState(false);
    const [currPage, setCurrPage] = useState('MySettings');
    const [inputOne, setInputOne] = useState(null);
    const [inputTwo, setInputTwo] = useState(null);
    const [inputThree, setInputThree] = useState(null);
    const [maxCount, setMaxCount] = useState(null);
    const [loading, setLoading] = useState(false);
   

    
    const checkStoragePermission = async() => {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      console.log("Granted: ", granted);
      return granted;
    }
    const edithandle = () => {
       settoggle(true);
    }
    const savehandle = () =>{
        setInputOne(inputOne);
        setInputTwo(inputTwo);
        setInputThree(inputThree);
        setMaxCount(maxCount);
        settoggle(false);
        Alert.alert("Save successful");
    }
    const openAppSettings = () => {
      Linking.openSettings();
  };
  
    const savePhotoData = async () => {
      try {
        const response = await fetch('http://ip:3001/savePhoto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: inputOne,
            PhotoData: fileData,
            Date: inputTwo,
          }),
        });
        
        if (response.ok) {
          Alert.alert('Save successful');
          const response1 = await fetch("http://ip:3000/get_all_data");
        if(response1.ok){
          Alert.alert('Device save successful');
        }
        else{
          Alert.alert("Device can not be reach");
        }
        } else {
          Alert.alert('Failed to save photo');
        }
        // const response1 = await fetch("http://ip:3000/get_all_data");
        const response2makesure = await fetch("http://ip:3000/get_all_data");
        if(response2makesure.ok){
          console.log("Make sure");
        }
        setFileData(null);
        setInputOne(null);
        setInputTwo(null);
      } catch (error) {
        console.error('Error saving photo data:', error);
        Alert.alert('Failed to save photo');
      }
    };
   const selectFile = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
          includeBase64: true,
          cropperCircleOverlay: true,
          avoidEmptySpaceAroundImage: true,
          freeStyleCropEnabled: true,
        }).then(image => {
          console.log(image);
          const data = `data:${image.mime};base64,${image.data}`;
          setFileData(data);
        })
   }
    const renderPage = () => {
        switch (currPage) {
          case 'MainPage':
            return <MainPage />;
          case 'MySettings':
           
            return ( 
              <View style={styles.container}>
                <Image source={Wallpaper}  style={styles.backgroundImage} />
              <View style={styles.buttonContainer}> 
              <TouchableOpacity style={styles.backButton}  onPress={() => setCurrPage('MainPage')}>
                                <Image source ={BackButton} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>
                            </TouchableOpacity>
                <Text>
                </Text>
                
                {/* <Button title="Select Picture" onPress={selectFile}></Button> */}
                <TouchableOpacity
                            style={styles.libraryButton}
                            onPress={selectFile}>
                            <Image source={Library} resizeMode={"contain"} style={{ width: '100%', height: '100%' }} />
                        </TouchableOpacity>
               
                <Text></Text>
              </View>
              <View style={styles.centeredContainer}>
            {/* <Button title="Open Settings" onPress={openAppSettings} /> */}
            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={openAppSettings}>
                                <Image source={Settings} resizeMode={"contain"} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity>
            <Text></Text>
            {/* <Button title="get permission" onPress={checkStoragePermission}></Button> */}
            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={checkStoragePermission}>
                                <Image source={Permission} resizeMode={"contain"} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity>
               <Text></Text>
                {/* <Text>Enter Name of the photo</Text>
                <TextInput placeholder="Enter Here" value={inputOne} onChangeText={text => setInputOne(text)} />
                <Text>Enter Date</Text>
                <TextInput placeholder="Enter Here" value={inputTwo} onChangeText={text => setInputTwo(text)}/> */}
                <TextInput
                            value={inputOne}
                            onChangeText={setInputOne}
                            placeholder="Enter a name for the photo"
                            placeholderTextColor="white"
                            style={styles.textInput}
                        />
                        <TextInput
                            value={inputTwo}
                            onChangeText={setInputTwo}
                            placeholder="Enter a date for the photo"
                            placeholderTextColor="white"
                            style={styles.textInput}
                        />
                <Text></Text>

                {/* <Image source={{uri:fileData}} /> */}

                {/* <Button title="Save to Database" onPress={savePhotoData}></Button> */}
                <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={savePhotoData}>
                            <Image source={Upload} resizeMode={"contain"} style={{ width: '100%', height: '100%' }} />
                        </TouchableOpacity>
                 <Text></Text>
                 <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri: fileData,
              }}
            />
            </View>
                </View>
                
                );
           
          default:
            return null;
        }
      };

    return (
        <View style={{ flex: 1 }}>
        {renderPage()}
       </View>
    )
};
const styles = {
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden"
  },
  backgroundImage:{
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonRight: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'right',
    justifyContent: 'center',
    width: '35%',
  },
  buttonLeft: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'left',
    justifyContent: 'center',
    width: '35%',
  },
  buttonsave:{
    backgroundColor:'grey',
    borderRadius:5,
     height:'5%',
     justifyContent: 'center',
     fontSize:'5%'

  },
  avatar: {
    borderRadius: 80,
    marginTop: 50,
    backgroundColor: 'white',
    height: 160,
    width: 160,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 100,
    height: 50,
    marginTop: 0,
    marginLeft: '3%',
},
libraryButton:{
  width: 100,
  height: 50,
  marginTop: 0,
  marginRight: '-20%',
},
centeredContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
uploadButton: {
  width: 150,
  height: 70,
},
textInput: {
  borderWidth: 1,
  borderColor: 'yellow',
  borderRadius: 4,
  width: '100%',
  padding: 10,
  marginBottom: 20,
  color: 'white',
  placeholderTextColor: 'white',
},
  
};

export default MySettings;