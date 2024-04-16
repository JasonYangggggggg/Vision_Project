import React, { useState, useRef } from 'react';
import { View, Button, Text, Alert, Linking,StyleSheet, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import MainPage from './Pages/MainPage';
const Wing = require('./assets/Wings.jpg');
const Button1 = require('./assets/button.png');

import { WebView } from 'react-native-webview';


const App = () => {
  const [currPage, setCurrPage] = useState('Home');

  const renderPage = () => {
    switch (currPage) {
      case 'Main':
        return <MainPage setCurrPage={setCurrPage} />; // Pass setCurrPage as props to MainPage
        // Include other cases if needed
      default:
        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
               <Image source={Wing} resizeMode={"contain"} style={{flex: 20,width: '80%', height: '90%',left:40}} />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: '25%'}}>
                  <TouchableOpacity
                      style={styles.getStartedButton}
                      onPress={() => setCurrPage('Main')}>
                    <Image source={Button1} resizeMode={"contain"} style={{width: '100%', height: '100%'}}/>
                  </TouchableOpacity>
                </View>
              
            </View>
        );
    }
  };

  return (
      <View style={{ flex: 1 }}>
        {renderPage()}
      </View>
  );
};

const styles = StyleSheet.create({
  getStartedButton: {
    width: 200,
    height: 50,
  },
  backgroundColor:{
    flex: 1,
   
  }
  // Other styles
});

export default App;