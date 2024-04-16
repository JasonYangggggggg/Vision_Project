import React, { useState, useRef } from 'react';
import { View, Button, Text, Alert, Linking,StyleSheet, Image, TouchableOpacity } from 'react-native';
import Collections from './Collections';
import ShowmyCounts from './ShowmyCounts';
import MySettings from './MySettings';
import Video from 'react-native-video';

// import MjpegView from 'react-native-mjpeg';
import { WebView } from 'react-native-webview';
import App from '../App';
const Wing = require('../assets/Wings.jpg');
const Button1 = require('../assets/button.png');
const BackButton = require('../assets/backbutton.png');
const Feed = require('../assets/TOGGLECAMERA.png');
const Wallpaper = require('../assets/wallpaper.jpg');
const Linkcam = require('../assets/linkcam.png');
const Gallery = require('../assets/Gallery.png')
const AddPhoto = require('../assets/Addphoto.png');


const MainPage = ({Title1, Title2, Title3, MaxCount}) => {
  const [showWebView, setShowWebView] = useState(false);
  const [videourl, setvideourl] = useState('');
  const [currPage, setCurrPage] = useState('MainPage');
  const [AData, setAData] = useState(0);
  const [BData, setBData] = useState(0);
  const [CData, setCData] = useState(0);
  const [TotalData, setTotal] = useState(0);
  // const [datastack, setstack] = useState<string[]>([]);
  const id = 123;
  
  const ADataCount = () =>{
       setAData(AData + 1);
       setstack(prevStack => [...prevStack, Title1 || 'A']);
  }
  const BDataCount = () => {
    setBData(BData + 1);
    setstack(prevStack => [...prevStack, Title2 || 'B']);
  }

  const CDataCount = () =>{
    setCData(CData + 1);
    setstack(prevStack => [...prevStack, Title3 || 'C']);
  }
  const updateTotal = () => {
    setTotal(AData + BData + CData);
  };

  React.useEffect(() => {
    updateTotal();
  }, [AData, BData, CData]);


  const toggleWebView = () => {
    setShowWebView(!showWebView);
  };
const StopCamera = async () => {
  try {
    const response = await fetch('http://ip:3000/stop_camera', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Request successfully sent to the endpoint
    console.log("here");
  } catch (error) {
    console.error('Error triggering GET request:', error);
  }
};

  const renderPage = () => {
    switch (currPage) {
      case 'Home':
        return <App />
      case 'MainPage':
        return (
          <View style={styles.container}>
            <Image source={Wallpaper}  style={styles.backgroundImage} />
            <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setCurrPage('Home')}>
                            <Image source ={BackButton} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>

                      
                        </TouchableOpacity>
                        <Text></Text>
            
            <View style={styles.centeredContainer}>
            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={toggleWebView}>
                                <Image source ={Feed} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>
                            </TouchableOpacity>
                            {showWebView && (
                                <View style={styles.webviewContainer}>
                                    <WebView
                                        source={{uri: 'http://ip:3000/video_feed'}}
                                        style={styles.webview}
                                    />
                                </View>
                            )}
                            <Text></Text>
            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => setCurrPage('Collections')}>
                                <Image source ={Gallery} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>
                            </TouchableOpacity>
            <Text></Text>
           
            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => setCurrPage('MySettings')}>
                                <Image source ={AddPhoto} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>
                            </TouchableOpacity>
            <Text>{videourl}</Text>
         
          <Text></Text>
     
      </View>
          </View>
        );
      case 'Collections':
       
        return <Collections />;

        case 'ShowMyCounts':
          return <ShowmyCounts Adata={AData} Bdata={BData} Cdata={CData} Total={TotalData} stackData={datastack} title1={Title1} title2={Title2} title3={Title3} maxCount={MaxCount} />;

        case 'MySettings':
          return <MySettings />
            
      default:
        return null;
    }
  };

  const saveData = async () => {
    try {
      const response = await fetch('http://{your IPV4 endpoint}:3001/addcollection',{
        'method':'POST',
        'headers':{
          'Content-Type': 'application/json',
        },
        
        body:JSON.stringify({id, Event_A: AData, Event_B:BData, Event_C: CData, Total:TotalData})
      });
      if(response.ok){
        console.log("Success");
        Alert.alert('Save Successful');
        setAData(0);
        setBData(0);
        setCData(0);
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert('Save failed');
    }
  }
  const styles = StyleSheet.create({
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
    webviewContainer: {
      marginTop: 20,
      width: '90%',
      height: '50%',
  },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
    backButton: {
      width: 100,
      height: 50,
      marginTop: '3%',
      marginLeft: '3%',
  },
  backButtonText: {
      color: '#333',
  },
  secondaryButton: {
    width: 200,
    height: 70,
},
    webview: {
      flex: 1,
      backgroundColor: 'transparent', // Set background color to transparent
    },
  });
  
  return (
    <View style={{ flex: 1 }}>
    {renderPage()}
  </View>
  );
};

export default MainPage;
