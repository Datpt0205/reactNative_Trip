import React, {useState} from 'react'
import {Text, View, TextInput, StyleSheet, Pressable} from 'react-native'
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const Detail = ({route}) => {

    const tripRef = firebase.firestore().collection('trips');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
    const [textDestination, onChangeDestinationText] = useState(route.params.item.destination);
    const [textDate, onChangeDateText] = useState(route.params.item.date);
    const [textRisk, onChangeRiskText] = useState(route.params.item.risk);
    const [textDescription, onChangeDescriptionText] = useState(route.params.item.description);
    const navigation = useNavigation()

    const updateTrip = () => {
        if(textHeading && textHeading.length > 0) {
            tripRef
            .doc(route.params.item.id)
            .update({
                heading:textHeading,
                destination:textDestination,
                date:textDate,
                risk:textRisk,
                description:textDescription,
            })
            .then(() => {
                navigation.navigate('Home')
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }
    return (
       <View style={styles.container}>
        <TextInput
        style={styles.textField}
        onChangeText={onChangeHeadingText} 
        value = {textHeading}
        placeholder = "Name of Trip"
        />
        <TextInput
        style={styles.textField}
        onChangeText={onChangeDestinationText} 
        value = {textDestination}
        placeholder = "Destination"
        />
        <TextInput
        style={styles.textField}
        onChangeText={onChangeDateText} 
        value = {textDate}
        placeholder = "dd/MM/yyyy"
        />
        <TextInput
        style={styles.textField}
        onChangeText={onChangeRiskText} 
        value = {textRisk}
        placeholder = "Risk Assessment: Yes or No"
        />
        <TextInput
        style={styles.textField}
        onChangeText={onChangeDescriptionText} 
        value = {textDescription}
        placeholder = "Description"
        />
        <Pressable
        style={styles.buttonUpdate}
        onPress={() =>{updateTrip()}}
        > 
            <Text>UPDATE TRIP</Text>
        </Pressable>

       </View>
    )
  }
  
  export default Detail

  const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom:10,
        padding: 10, 
        fontSize:15,
        color: '#000000',
        backgroundColor: '#e0e0e0',
        borderRadius:5,
    },
    buttonUpdate: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius:4,
        elevation:10,
        backgroundColor: '#0de065',
    }
  })