//this is the login page 

import React, {Component} from 'react';
import {Keyboard, Button, Animated, Easing, TextInput, AppRegistry, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Divider, Overlay} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {styles, FadeInView, ImageStyles, MakeTextInputBox} from '../additionalFunctions';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMenu from 'react-native-dropdown-menu';
import {MapView}from 'expo';
export default class LoginPage extends React.Component{

  static navigationOptions = {
    title: 'Map'
  }; 

  constructor(props) {
    super(props);
    this.map;
    this.state = {
      waypointCount: 1,
      type: "",
      isLoading: true,
      markers: [],
    initalFlightPin:{
      latitude: 34.0522,
      longitude: -118.2437,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    initalFlightPinTwoVal:{
      latitude: 34.0522,
      longitude: -118.2437,
    },
    };
  }

  connectMarkers(){
      //connect the markers here//
      if(this.state.markers.length===this.state.waypointCount && this.state.waypointCount!==0){
        //then it is full and now we need to connect them
        /************************TODO************************ */
        console.log("TARGET HIT!!!");
        var markersAltered = this.state.markers;
        markersAltered.push(this.state.initalFlightPinTwoVal);
        console.log(markersAltered);
        return(
        <MapView.Polyline
            coordinates={markersAltered}
            strokeColor="#000"
            fillColor="blue"
            strokeWidth={4}/>
        )
  }
}
  removeMarkers(){
    //remove the markers here////
    this.setState({markers: [], waypointCount: 0});
  }

  addToMapMarkers(myElement){
    console.log("I got a touch response!");
    if(this.state.markers.length<this.state.waypointCount){
      console.log(myElement);
      console.log("Adding a new Marker!");
      //this.state.markers.push(myElement);
      let prevArray = this.state.markers;
      prevArray.push(myElement);
      console.log("markers array size--> "+prevArray.length);
      this.setState({ markers: prevArray});
    }else{
        this.removeMarkers();
    }
  }

  updateMe(dataMine){
    this.setState({markers: [], waypointCount: dataMine});
  }

    render() {
      console.log("I'm going to render the map now", this.state);
      var data = [[1, 2, 3,4], 
      ["Land at Last Waypoint", "Return to Launch Point"]];
        return (
          <View  style={{
            flex: 1,
      
          }}>
            
            
            <MapView
                style={{
                  flex: 4,
                  bottom: 0,
                }}
                provider="google"
                initialRegion={this.state.initalFlightPin}
                onPress={ (event) => 
                  this.addToMapMarkers(event.nativeEvent.coordinate)}
                >
                

                {this.state.markers.map((marker, index) =>{
                  return(
                    <MapView.Marker
                    key={index}
                      coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                      title={`Marker ${index}`}
                      description={"Waypoint added by user"}
                    />
                  )
                })}
              
                <MapView.Marker
                coordinate={{latitude: this.state.initalFlightPin.latitude, longitude: this.state.initalFlightPin.longitude}}
                title={"Pin #1"}
                description={"Initial Flight Pin"}
                />
                {this.connectMarkers()}

                
              </MapView>
              <View style={{flex: 1.7}}>
              <DropdownMenu
                style={{ padding: 10,left:0,justifyContent: 'center' , alignSelf: 'flex-end'}}
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                // arrowImg={}      
                // checkImage={}   
                // optionTextStyle={{color: '#333333'}}
                // titleStyle={{color: '#333333'}} 
                handler={(selection, row) => this.setState({markers: [], waypointCount: data[selection][row]})}
                data={data}
              />
            </View>
          </View>
          
              
              
       
            );
          }
        }