import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { GET_PLANT_DETAILS, GET_TRUSS_DETAILS } from '../graphql/queries';
import Database from './Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

var loading = true;

export const GetAwsData = props => {
  const db = new Database();
  const [plantData, setPlantData] = useState([]);

  const [plantDataAws, setPlantDataAws] = useState([]);
  const [trussDataAws, setTrussDataAws] = useState([]);

  const [getPlantDetails] = useLazyQuery(GET_PLANT_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setPlantDataAws(data?.plant_details);
      console.log('Plant data from AWS : ', data);
      try {
        AsyncStorage.setItem('@MySuperStore:plantKey', JSON.stringify(data));
      } catch (error) {
        // Error saving data
        console.log(error);
      }
      //Close this screen
      loading = false;
      props.navigation.navigate('SiteSelection');
    },
  });
  const [getTrussDetails] = useLazyQuery(GET_TRUSS_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setTrussDataAws(data?.truss_details);
      console.log('Truss data from AWS : ', data);

      try {
        AsyncStorage.setItem('@MySuperStore:trussKey', JSON.stringify(data));
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      getPlantDetails();
    },
  });

  useEffect(() => {
    getTrussQuery();
  }, []);

  //Use below query
  const getTrussQuery = () => {
    getTrussDetails();
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={loading}
        animationType={'fade'}
        visible={loading}
        onRequestClose={() => {
          console.log('Not allowed to close');
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#1A8917"
            />
          </View>
        </View>
      </Modal>

      {Platform.OS === 'ios' ? <View style={{ marginTop: 20 }}></View> : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
        }}
      >
        <View style={styles.headerImage1}>
          <TouchableOpacity>
            <Image source={require('../assets/back.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerImage2}>
          <Image source={require('../assets/fresh3.png')} />
        </View>

        <View style={{ height: 20, width: 20 }}>
          <Text style={{ alignSelf: 'center' }}></Text>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.marginSmallDimensionTop}></View>

        <View style={styles.marginSmallDimensionTop}></View>

        <View style={styles.marginSmallDimensionTop}></View>

        <View style={styles.marginSmallDimensionTop}></View>

        <Text style={styles.textBottom}>
          Getting data from the server, please don't exit this page or close the
          app{'\n'} Please wait...
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 30,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  headerImage1: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  headerImage2: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  textBottom: {
    fontSize: 18,
    paddingBottom: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  textContainer: {
    flexShrink: 1,
  },

  marginDimensionTop: {
    marginTop: 44,
  },

  marginSmallDimensionTop: {
    marginTop: 18,
  },

  containerView: {
    marginLeft: 95,
    marginRight: 95,
  },

  buttonContainer: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 10,
    margin: 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    //fontStyle: 'italic'
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default GetAwsData;
