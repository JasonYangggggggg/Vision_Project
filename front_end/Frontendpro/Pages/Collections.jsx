import { Text, View, Button,ScrollView, TouchableOpacity, Image } from "react-native"
import React, { useState } from 'react';
import DataCard from "../Compoents/DataCard";
import {Avatar} from 'react-native-paper';
import axios from 'axios';
import App from "../App";
import MainPage from "./MainPage";
const Wallpaper = require('../assets/wallpaper.jpg');
const BackButton = require('../assets/backbutton.png');
const Collections = () =>{
  const [currPage, setCurrPage] = useState('Collections');
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fetch('http://ip:3001/getinformation');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const deleteData = async (id) => {
    console.log("get in here");
    try {
      await axios.delete(`http://ip:3001/deletedata/${id}`);
      console.log('Data deleted successfully');
      // now update the device
      const response1 = await fetch("http://ip:3000/get_all_data");
      if(response1.ok){
        console.log("Device update success");
      }
      else{
        console.log("Failed");
      }
      // make sure the data pipeline is correct
      const response2 = await fetch("http://ip:3000/get_all_data");
      if(response2.ok){
        console.log("Device now have the newest data from the database");
      }
      else{
        console.log("Second attempt failed");
      }
      //refresh the page
      setLoading(true);
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
    const renderData = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <ScrollView>
        
        {Data.map((item) => (
          <TouchableOpacity key={item._id} onPress={() => deleteData(item._id)}>
          <Avatar.Image size={140}
          style={styles.avatar}
          source={{
            uri: item.PhotoData,
          }}
           />
           </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  React.useEffect(() => {
     getData();
    
  }, []);
  const renderPage = () => {
      switch (currPage) {
        case 'Home':
          return <App />;

        case 'MainPage':
          return <MainPage />;
        case 'Collections':
         
          return ( 
            <View style={styles.container}>
          <ScrollView >
          <View >
          <Image source={Wallpaper}  style={styles.backgroundImage} />
            {/* <Button style={{backgroundColor: 'blue', padding: 10, borderRadius: 5, width: 100, height: 30, justifyContent: 'center', alignItems:'center',}} title='Back to Home Page' onPress={() => setCurrPage('MainPage')}></Button> */}
            <TouchableOpacity style={styles.backButton}  onPress={() => setCurrPage('MainPage')}>
                                <Image source ={BackButton} resizeMode={"contain"} style={{width : '100%', height: '100%' }}/>
                            </TouchableOpacity>
                 <Text></Text>
                  {renderData()}    
              </View>
              </ScrollView>
              </View>
              )
         
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
  
  backButton: {
    width: 100,
    height: 50,
    marginTop: 0,
    marginLeft: '3%',
},
  
};

export default Collections;