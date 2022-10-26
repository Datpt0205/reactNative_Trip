import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import { firebase } from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const tripRef = firebase.firestore().collection("trips");
  const [addHeading, setAddHeading] = useState("");
  const [addDestination, setAddDestination] = useState("");
  const [addDate, setAddDate] = useState(new Date(1598051730000));
  const [addRisk, setAddRisk] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const navigation = useNavigation();
  
  //fetch data
  useEffect(() => {
    tripRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const trips = [];
      querySnapshot.forEach((doc) => {
        const { heading, destination, date, risk, description } = doc.data();
        trips.push({
          id: doc.id,
          heading,
          destination,
          date,
          risk,
          description,
        });
      });
      setTrips(trips);
    });
  }, []);

  //delete from firestore db

  const deleteTrip = (trips) => {
    tripRef
      .doc(trips.id)
      .delete()
      .then(() => {
        //show a successful alert
        alert("Deleted successfully");
      })
      .catch((err) => {
        alert(err);
      });
  };

  //Add trip
  const addTrip = (trip) => {
    //get the timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      heading: addHeading,
      destination: addDestination,
      date: addDate,
      risk: addRisk,
      description: addDescription,
      createdAt: timestamp,
    };
    if (
      addHeading.length == 0 ||
      addDestination.length == 0 ||
      addDate.length == 0 ||
      addRisk.length == 0
    ) {
      alert("Need to fill all required fields!");
    } else {
      tripRef
        .add(data)
        .then(() => {
          setAddHeading("");
          setAddDestination("");
          setAddDate("");
          setAddRisk("");
          setAddDescription("");
          //release keyboard
          Keyboard.dismiss();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.firstText}>ADD A NEW TRIP</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name of trip*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddHeading(heading)}
          value={addHeading}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Destination*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(destination) => setAddDestination(destination)}
          value={addDestination}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="dd/MM/yyyy*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(date) => setAddDate(date)}
          value={addDate}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Risk Assessment: Yes or No*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(risk) => setAddRisk(risk)}
          value={addRisk}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(description) => setAddDescription(description)}
          value={addDescription}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTrip}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={trips}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTrip(item)}
                style={styles.tripIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0] + item.heading.slice(1)}
                </Text>
                <Text style={styles.itemDestination}>
                  {item.destination[0].toUpperCase() +
                    item.destination.slice(1)}
                </Text>
              </View>
              <View style={styles.innerContainer}>
                <Text style={styles.itemDate}>
                  {"Date: " + item.date[0].toUpperCase() + item.date.slice(1)}
                </Text>
                <Text style={styles.itemRisk}>
                  {"Risk Assessment: " + item.risk[0].toUpperCase() + item.risk.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "grid",
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 22,
  },
  itemDestination: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 22,
    paddingTop: 10,
  },
  itemDate: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 22,
  },
  itemRisk: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 22,
    paddingTop: 10,
  },
  itemDescription: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 22,
  },
  formContainer: {
    // flexDirection: 'row',
    height: 300,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    marginTop: 10,
  },
  button: {
    height: 47,
    borderRadius: 15,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 310,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  tripIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  firstText: {
    marginTop: 10,
    marginLeft: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
});
