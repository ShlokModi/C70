import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookId: '',
        scannedStudentId: ''
      }
    }

    getCameraPermissions = async (Id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: Id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state
      if(buttonState === "BookId"){
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
      });
    }
    else if (buttonState === "StudentId"){
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
      });
    }
  }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
            <Image source = {require('../assets/booklogo.jpg')}style = {{width: 200, height: 200}}/>
            <Text style = {{textAlign: "center", fontSize: 30}}>Wily</Text>
            </View>
            <TextInput style={styles.inputBox} placeholder = "Book Id" value = {this.state.scannedBookId}/>
            <TouchableOpacity
            onPress={this.getCameraPermissions("BookId")}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
          
              

          <TextInput style={styles.inputBox} placeholder = "Student Id" value = {this.state.scannedStudentId}/>
          <TouchableOpacity
            onPress={this.getCameraPermissions("StudentId")}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>

          

        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#FF0000',
      padding: 10,
      margin: 10,
      borderRadius:20,
      textAlign: "center",
      
    },
    buttonText:{
      fontSize: 25,
      color:"#0000FF",
      
    },
    inputBox:{
      width: 200,
      height: 50,
      fontSize: 20,
      borderWidth: 1.5
    }
  });