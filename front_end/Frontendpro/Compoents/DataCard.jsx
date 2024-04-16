import React from 'react';
import { View, Text } from 'react-native';


const DataCard = ({data}) => {
  if(data === null){
    return null;
  }
  return (
    <View>
    {data.map((data) => (
      <View style={{ marginBottom: 10 }}>
        <Text>Event_A: {data.Event_A}</Text>
        <Text>Event_B: {data.Event_B}</Text>
        <Text>Event_C: {data.Event_C}</Text>
        <Text>Total: {data.Total}</Text>
      </View>
    ))}
  </View>
  );
}


export default DataCard;
