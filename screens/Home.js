import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import isEmpty from "validator/lib/isEmpty";
import isDate from "validator/lib/isDate";

const Home = () => {
  const [addHeading, setAddHeading] = useState("");
  const [addDestination, setAddDestination] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addRisk, setAddRisk] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  //Add trip
  const addTrip = (trip) => {
    const isValid = validateAll();
    if (!isValid) return;
    if (
      addHeading.length == 0 ||
      addDestination.length == 0 ||
      addDate.length == 0 ||
      addRisk.length == 0
    ) {
      alert("Need to fill all required fields!");
    } else {
      Alert.alert(
        "Check again before submit!",
        `Name: ${addHeading} \n Destination: ${addDestination} \n  Date: ${addDate} \n Risk Assessment: ${addRisk} \n Description: ${addDescription}`,
        [
          { text: "Submit", onPress: () => console.log("Yes is pressed!") },
          { text: "Cancel", onPress: () => noHandler() },
        ]
      );
    }

    const noHandler = () => {
      setAddHeading(addHeading);
      setAddDestination(addDestination);
      setAddDate(addDate);
      setAddRisk(addRisk);
      setAddDescription(addDescription);
    };
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(addHeading)) {
      msg.addHeading = "Please input name of trip";
    }

    if (isEmpty(addDestination)) {
      msg.addDestination = "Please input destination";
    }

    if (isEmpty(addDate)) {
      msg.addDate = "Please input date of trip";
    } else if (!isDate(addDate)) {
      msg.addDate =
        "Your date is not correct. Please enter the correct format!";
    }

    if (isEmpty(addRisk)) {
      msg.addRisk = "Please input Risk Assessment";
    }

    setValidationMsg(msg);

    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.firstText}>ADD A NEW TRIP</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          name="heading"
          placeholder="Name of trip*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddHeading(heading)}
          value={addHeading}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.errMsg}>{validationMsg.addHeading}</Text>
        <TextInput
          style={styles.input}
          placeholder="Destination*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(destination) => setAddDestination(destination)}
          value={addDestination}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.errMsg}>{validationMsg.addDestination}</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY/MM/DD*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(date) => setAddDate(date)}
          value={addDate}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.errMsg}>{validationMsg.addDate}</Text>
        <TextInput
          style={styles.input}
          placeholder="Risk Assessment: Yes or No*"
          placeholderTextColor="#aaaaaa"
          onChangeText={(risk) => setAddRisk(risk)}
          value={addRisk}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.errMsg}>{validationMsg.addRisk}</Text>
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  errMsg: {
    marginLeft: 10,
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
    fontStyle: "italic",
  },
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
  formContainer: {
    // flexDirection: 'row',
    height: 400,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
  firstText: {
    marginTop: 10,
    marginLeft: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
});
