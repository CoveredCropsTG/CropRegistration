import React, {Component} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

var screenWidth = Dimensions.get('window').width / 1.6;

export default class Har123 extends Component {
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
      this.setState({isItConnected: 'Online'});
    } else {
      this.setState({isItConnected: 'Offline'});
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? <View style={{marginTop: 20}}></View> : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
          }}>
          <View style={styles.headerImage1}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HarHome')}>
              <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerImage}>
            <Image source={require('../assets/fresh3.png')} />
          </View>

          <Text></Text>
        </View>

        <View style={styles.marginDimensionTop}></View>

        <View style={styles.marginSmallDimensionTop}></View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.containerView}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har1IntenseRow')}>
              <Text style={styles.buttonText}>HAR 1 - Intense</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har1ClobogoRow')}>
              <Text style={styles.buttonText}>HAR 1 - Clobogo</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har2AngelleRow')}>
              <Text style={styles.buttonText}>HAR 2 - Angelle</Text>
            </TouchableOpacity>

            <View style={styles.marginSmallDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har3GustelleRow')}>
              <Text style={styles.buttonText}>HAR 3 - Gustelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har3BambelloRow')}>
              <Text style={styles.buttonText}>HAR 3 - Bambello</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har3DunistarRow')}>
              <Text style={styles.buttonText}>HAR 3 - Dunistar</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Har3AngelleRow')}>
              <Text style={styles.buttonText}>HAR 3 - Angelle</Text>
            </TouchableOpacity>

            <View style={styles.marginDimensionTop}></View>
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

  headerImage1: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
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
