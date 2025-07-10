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
import {
  INSERT_PLANT_DETAILS,
  INSERT_TRUSS_DETAILS,
} from '../graphql/mutation';
import { GET_PLANT_DETAILS, GET_TRUSS_DETAILS } from '../graphql/queries';
import Database from './Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

var loadingDone = '';
var loading = true;

export const ViewPlantTrussDetails = props => {
  const db = new Database();

  const [plantData, setPlantData] = useState([]);
  const [trussData, setTrussData] = useState([]);
  const [plantDataAws, setPlantDataAws] = useState([]);
  const [trussDataAws, setTrussDataAws] = useState([]);
  const [insertPlantDetails] = useMutation(INSERT_PLANT_DETAILS);
  const [insertTrussDetails] = useMutation(INSERT_TRUSS_DETAILS);
  const [getPlantDetails] = useLazyQuery(GET_PLANT_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setPlantDataAws(data?.plant_details);
      console.log('Plant data from AWS : ', data);

      try {
        AsyncStorage.setItem('@MySuperStore:plantKey', JSON.stringify(data));
        console.log('saved plant data');
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      getTrussDetails();
    },
  });
  const [getTrussDetails] = useLazyQuery(GET_TRUSS_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setTrussDataAws(data?.truss_details);
      console.log('Truss data from AWS : ', data);

      try {
        AsyncStorage.setItem('@MySuperStore:trussKey', JSON.stringify(data));
        console.log('saved truss data');
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      setTimeout(() => {
        db.deleteAllPlants()
          .then(data => {
            console.log('Plant data deleted from local database');
          })
          .catch(err => {
            console.log(err);
          });
      }, 200);

      db.deleteAllTruss()
        .then(data => {
          console.log('Truss data deleted from local database');
        })
        .catch(err => {
          console.log(err);
        });

      //saveAsyncData();

      //navigating to previous screen
      loading = false;
      props.navigation.goBack(null);
      loadingDone = 'yes';
    },
  });

  useEffect(() => {
    db.listPlants()
      .then(data => {
        console.log('data from local database', data);

        if (data.length !== 0) {
          setPlantData(data);
          //AsyncStorage.clear();
          getKeys();
        } else {
          loading = false;
          props.navigation.goBack(null);
          alert('No data to submit');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let objs = [];
    if (plantData?.length > 0) {
      plantData?.map(obj => {
        delete obj.plantId;
        delete obj?.__typename;
        delete obj?.id;
        objs.push(obj);
        for (var key in obj) {
          if (obj[key] == '' || obj[key] == 'NaN') {
            obj[key] = null;
          }
        }
      });
      console.log('here objs in plant', objs);
      insertPlantDetails({
        variables: {
          objects: objs,
        },
      })
        .then(res => {
          // res?.data?.insert_plant_details?.returning?.length > 0 && setPlantDataAws(res?.data?.insert_plant_details?.returning)
          console.log('res in plant mutation', res);
          db.listTruss()
            .then(data => {
              console.log('truss data in local db');
              if (data.length !== 0) {
                setTrussData(data);
                //AsyncStorage.clear();
                getKeys();
              } else {
                loading = false;
                props.navigation.goBack(null);
                alert('No data to submit');
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(e => {
          console.log('error in plant mutation', e);
        });
    }
  }, [plantData]);

  const getKeys = () => {
    try {
      if (Platform.OS == 'ios') {
        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      }

      if (Platform.OS == 'android') {
        AsyncStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing app data');
    }
  };

  useEffect(() => {
    let objs = [];
    if (trussData?.length > 0) {
      trussData?.map(obj => {
        delete obj.trussID;
        delete obj?.__typename;
        delete obj?.id;
        for (var key in obj) {
          if (obj[key] == '' || obj[key] == 'NaN') {
            obj[key] = null;
          }
        }
        objs.push(obj);
        console.log('here objs in truss', objs);
      });
      insertTrussDetails({
        variables: {
          objects: objs,
        },
      })
        .then(res => {
          // res?.data?.insert_truss_details?.returning?.length > 0 && setTrussDataAws(res?.data?.insert_truss_details?.returning)
          console.log('res in truss Detaaails', res);

          getPlantQuery();
        })
        .catch(e => {
          console.log('error in truss mutation', e);
        });
    }
  }, [trussData]);

  const getPlantQuery = () => {
    getPlantDetails();
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={loading}
        animationType={'fade'}
        visible={loading}
        onRequestClose={() => {
          console.log('Cannot close');
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

      {Platform.OS === 'ios' ? <View style={{ marginTop: 40 }}></View> : null}

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
          Uploading data {'\n'} Please wait...
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
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  textBottom: {
    fontSize: 24,
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

export default ViewPlantTrussDetails;
