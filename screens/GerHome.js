import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

var screenWidth = Dimensions.get('window').width / 1.6;

export default class GerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isItConnected: '',
    };
  }

  handleBackButton = () => {
    BackHandler.exitApp();
  };

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert('You are online!');
        } else {
          Alert.alert('You are offline!');
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      Alert.alert('You are offline!');
    } else {
      Alert.alert('You are online!');
    }
  };

  handleConnectivityChange = state => {
    if (state.isConnected) {
      this.setState({ isItConnected: 'Online' });
    } else {
      this.setState({ isItConnected: 'Offline' });
    }
  };

  checkInternetConnection = () => {
    if (this.state.isItConnected == 'Online') {
      this.props.navigation.navigate('ViewPlantTrussDetails');
    } else {
      this.errorMessage();
    }
  };

  errorMessage = () => {
    Alert.alert(
      'No Internet Connection',
      'Make sure your device is connected to the internet',
      [
        {
          text: 'OK',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? <View style={{ marginTop: 20 }}></View> : null}

        <View style={styles.headerImage}>
          <Image source={require('../assets/fresh3.png')} />
        </View>

        <View style={styles.marginDimensionTop}></View>

        <View style={styles.marginSmallDimensionTop}></View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.containerView}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger1DormaPlumRow')}
            >
              <Text style={styles.buttonText}>GER 1 - Dorma Plum</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger1DuelleRow')}
            >
              <Text style={styles.buttonText}>GER 1 - Duelle</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger2ClobogoRow')}
            >
              <Text style={styles.buttonText}>GER 2 - Clobogo</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger3GustelleRow')}
            >
              <Text style={styles.buttonText}>GER 3 - Gustelle</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger3ProdelleRow')}
            >
              <Text style={styles.buttonText}>GER 3 - Dunistar</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger3DuelleRow')}
            >
              <Text style={styles.buttonText}>GER 3 - Duelle</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger3IcariaRow')}
            >
              <Text style={styles.buttonText}>GER 3 - Icaria</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger4PatzcuaroRow')}
            >
              <Text style={styles.buttonText}>GER 4 - Patzcuaro</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger4XaveriusRow')}
            >
              <Text style={styles.buttonText}>GER 4 - Xaverius</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger4RhodiumRow')}
            >
              <Text style={styles.buttonText}>GER 4 - Rhodium</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger4SanPirloRow')}
            >
              <Text style={styles.buttonText}>GER 4 - San Pirlo</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5AngelleRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Angelle</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5DuelleRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Duelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5BambelloRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Bambello</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5IcariaRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Icaria</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5ProdelleRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Prodelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5DormaPlumRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Dorma Plum</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5TattooRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Tattoo</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5AdorelleRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Adorelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate('Ger5BellamariaRow')
              }
            >
              <Text style={styles.buttonText}>GER 5 - Bellamaria</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5CrystelleRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Crystelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Ger5TomVioletRow')}
            >
              <Text style={styles.buttonText}>GER 5 - Tom Violet</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>
          </View>

          <TouchableOpacity onPress={() => this.checkInternetConnection()}>
            <View style={styles.headerImage2}>
              <Image source={require('../assets/submit2.png')} />
            </View>
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.textBottom}>
              Press submit button only when there is internet connection.
            </Text>
          </View>

          <View style={styles.marginSmallDimensionTop}></View>
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

  headerImage2: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  textContainer: {
    flexShrink: 1,
  },

  textBottom: {
    fontSize: 20,
    width: screenWidth,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  headerImage: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    resizeMode: 'cover',
  },

  marginDimensionTop: {
    marginTop: 20,
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
    fontSize: 26,
    color: '#2C3E50',
    fontWeight: 'bold',
  },

  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    //fontStyle: 'italic'
  },
});
