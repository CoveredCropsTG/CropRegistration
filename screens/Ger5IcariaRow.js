import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

var screenWidth = Dimensions.get('window').width / 1.6;

export default class Ger5IcariaRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? <View style={{ marginTop: 15 }}></View> : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
          }}
        >
          <View style={styles.headerImage1}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('GerHome')}
            >
              <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerImage2}>
            <Text style={styles.text}>GER 5 - Icaria</Text>
          </View>

          <View style={{ height: 20, width: 20 }}>
            <Text style={{ alignSelf: 'center' }}></Text>
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.marginDimensionTop}></View>

          <View style={styles.containerView}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate('Ger5IcariaPlantsRow1')
              }
            >
              <Text style={styles.buttonText}>Row 13</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },

  headerImage1: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  headerImage2: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  marginDimensionTop: {
    marginTop: 44,
  },

  marginSmallDimensionTop: {
    marginTop: 18,
  },

  containerView: {
    marginLeft: 100,
    marginRight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  buttonContainer: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 50,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 28,
    color: '#58B132',
    fontWeight: 'bold',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },

  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    //fontStyle: 'italic'
  },
});
