import { View, Text, Button } from "react-native"
import React, { useState } from 'react';
import App from "../App";
const ShowmyCounts = ({Adata, Bdata, Cdata, Total, stackData, title1, title2, title3, maxCount}) => {
   
    const [currPage, setCurrPage] = useState('ShowMyCounts');
    const renderPage = () => {
        switch (currPage) {
          case 'Home':
            return <App Title1={title1} Title2={title2} Title3={title3} MaxCount={maxCount} />;
          case 'ShowMyCounts':
            const stacksplit = [stackData.toString()];
            return (
            <View>
            <Button title="Go back to home" onPress={() => setCurrPage('Home')}></Button>
            <Text>{title1 || "Event_A"}: {Adata}</Text>
            <Text>{title2 || "Event_B"}: {Bdata}</Text>
            <Text>{title3 || "Event_C"}: {Cdata}</Text>
            <Text>{maxCount || '0'}</Text>
            <Text>TotalData: {Total}</Text>
            <Text>---------------------------------------------------------------------</Text>
           <View style={{ flexDirection: 'column' }}>
            {stacksplit.map((line, index) => (
              <Text key={index} style={{ marginBottom: 5 }}>{line}</Text> 
            ))}
            </View>
        </View>
            );
           
          default:
            return null;
        }
      };

    return(
        <View style={{ flex: 1 }}>
        {renderPage()}
       </View>
      
    )
};


export default ShowmyCounts;