import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

var screenWidth = Dimensions.get('window').width / 1.6;
var nameSelected, rowSelected, plantNumberSelected;

export default class Ger2DataChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      rowNumber: '',
      plantNumber: '',
      weekNumber: '',
      week1: '',
      week2: '',
      week3: '',

      allPlantDataWeek1: [],
      allTrussDataWeek1: [],
      leavesPerPlantWeek1: '',
      fullySetTrussWeek1: '',
      setTrussLengthWeek1: '',
      weeklyGrowthWeek1: '',
      flowerTrussHeightWeek1: '',
      leafLengthWeek1: '',
      leafWidthWeek1: '',
      stemDiameterWeek1: '',
      lastWeekStmDiameterWeek1: '',

      allPlantDataWeek2: [],
      allTrussDataWeek2: [],
      leavesPerPlantWeek2: '',
      fullySetTrussWeek2: '',
      setTrussLengthWeek2: '',
      weeklyGrowthWeek2: '',
      flowerTrussHeightWeek2: '',
      leafLengthWeek2: '',
      leafWidthWeek2: '',
      stemDiameterWeek2: '',
      lastWeekStmDiameterWeek2: '',

      allPlantDataWeek3: [],
      allTrussDataWeek3: [],
      leavesPerPlantWeek3: '',
      fullySetTrussWeek3: '',
      setTrussLengthWeek3: '',
      weeklyGrowthWeek3: '',
      flowerTrussHeightWeek3: '',
      leafLengthWeek3: '',
      leafWidthWeek3: '',
      stemDiameterWeek3: '',
      lastWeekStmDiameterWeek3: '',

      leavesPerPlant: '',
      fullySetTruss: '',
      setTrussLength: '',
      weeklyGrowth: '',
      flowerTrussHeight: '',
      leafLength: '',
      leafWidth: '',
      stemDiameter: '',
      lastWeekStmDiameter: '',

      //Truss Details
      fruitLoadWeek1: '',
      pruningFlowerWeek1: '',
      flowerTrussWeek1: '',
      floweringSpeedWeek1: '',
      pruningSetWeek1: '',
      settingTrussWeek1: '',
      settingSpeedWeek1: '',
      pruningHarvestWeek1: '',
      harvestTrussWeek1: '',
      harvestSpeedWeek1: '',

      fruitLoadWeek2: '',
      pruningFlowerWeek2: '',
      flowerTrussWeek2: '',
      floweringSpeedWeek2: '',
      pruningSetWeek2: '',
      settingTrussWeek2: '',
      settingSpeedWeek2: '',
      pruningHarvestWeek2: '',
      harvestTrussWeek2: '',
      harvestSpeedWeek2: '',

      fruitLoadWeek3: '',
      pruningFlowerWeek3: '',
      flowerTrussWeek3: '',
      floweringSpeedWeek3: '',
      pruningSetWeek3: '',
      settingTrussWeek3: '',
      settingSpeedWeek3: '',
      pruningHarvestWeek3: '',
      harvestTrussWeek3: '',
      harvestSpeedWeek3: '',

      fruitLoad: '',
      pruningFlower: '',
      flowerTruss: '',
      floweringSpeed: '',
      pruningSet: '',
      settingTruss: '',
      settingSpeed: '',
      pruningHarvest: '',
      harvestTruss: '',
      harvestSpeed: '',
    };
  }

  componentDidMount() {
    nameSelected = this.props.route.params.name;
    rowSelected = this.props.route.params.row;
    plantNumberSelected = this.props.route.params.plant;
    this.setState({
      className: nameSelected,
      rowNumber: rowSelected,
      plantNumber: plantNumberSelected,
    });

    var weekNumber = moment().week() - 1;
    var yearNumber = moment().year();
    var toText = yearNumber.toString(); //convert to string
    var lastChar = toText.slice(-2); //gets last character
    var lastDigit = +lastChar; //convert last character to number
    var weekNumberText = lastDigit + '00';
    var convertWeekNumber = +weekNumberText;
    var completeWeekNumber = convertWeekNumber + weekNumber;

    var lastWeek = completeWeekNumber - 1;
    var lastToLastWeek = completeWeekNumber - 2;
    var threeLastWeeks = completeWeekNumber - 3;

    this.setState({
      weekNumber: completeWeekNumber,
      week1: lastWeek,
      week2: lastToLastWeek,
      week3: threeLastWeeks,
    });

    LogBox.ignoreAllLogs(true);

    this.renderEntryData();
    this.renderEntryDataLastToLast();
    this.renderEntryDataLastThreeWeeks();
    this.getAsyncData();
  }

  getAsyncData() {
    //Plant Details
    try {
      AsyncStorage.getItem('leavesPerPlant' + nameSelected)
        .then(text1Value => {
          this.setState({
            leavesPerPlant: JSON.parse(text1Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('fullySetTruss' + nameSelected)
        .then(text2Value => {
          this.setState({
            fullySetTruss: JSON.parse(text2Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('setTrussLength' + nameSelected)
        .then(text3Value => {
          this.setState({
            setTrussLength: JSON.parse(text3Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('weeklyGrowth' + nameSelected)
        .then(text4Value => {
          this.setState({
            weeklyGrowth: JSON.parse(text4Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('floweringTrussHeight' + nameSelected)
        .then(text5Value => {
          this.setState({
            flowerTrussHeight: JSON.parse(text5Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('leafLength' + nameSelected)
        .then(text6Value => {
          this.setState({
            leafLength: JSON.parse(text6Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('leafWidth' + nameSelected)
        .then(text7Value => {
          this.setState({
            leafWidth: JSON.parse(text7Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('stmDiameter' + nameSelected)
        .then(text8Value => {
          this.setState({
            stemDiameter: JSON.parse(text8Value),
          });
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('lastWeekStmDiameter' + nameSelected)
        .then(text9Value => {
          this.setState({
            lastWeekStmDiameter: JSON.parse(text9Value),
          });
        })
        .done();
    } catch (error) {}

    //END

    //Truss Details

    try {
      AsyncStorage.getItem('fruitLoad' + nameSelected)
        .then(text49Value => {
          if (text49Value !== null) {
            this.setState({
              fruitLoad: JSON.parse(text49Value),
            });
          }
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('floweringTrussss' + nameSelected)
        .then(text50Value => {
          if (text50Value !== null) {
            this.setState({
              flowerTruss: JSON.parse(text50Value),
            });
          }
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('settingTrussNumber' + nameSelected)
        .then(text51Value => {
          if (text51Value !== null) {
            this.setState({
              settingTruss: JSON.parse(text51Value),
            });
          }
        })
        .done();
    } catch (error) {}
    try {
      AsyncStorage.getItem('harvestTruss' + nameSelected)
        .then(text52Value => {
          if (text52Value !== null) {
            this.setState({
              harvestTruss: JSON.parse(text52Value),
            });
          }
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('pruneFlowering' + nameSelected)
        .then(text53Value => {
          if (text53Value !== null) {
            this.setState({
              pruningFlower: JSON.parse(text53Value),
            });
          }
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('prunSetting' + nameSelected)
        .then(text54Value => {
          if (text54Value !== null) {
            this.setState({
              pruningSet: JSON.parse(text54Value),
            });
          }
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('pruningHar' + nameSelected)
        .then(text55Value => {
          if (text55Value !== null) {
            this.setState({
              pruningHarvest: JSON.parse(text55Value),
            });
          }
        })
        .done();
    } catch (error) {}

    //END
  }

  renderEntryDataLastThreeWeeks = () => {
    try {
      AsyncStorage.getItem('@MySuperStore:plantKey')
        .then(plantValues => {
          const allPlant = JSON.parse(plantValues);

          const filteredPlantWeek = this.state.week3;

          //Change week number
          const weekRowPlant = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredPlantWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowPlant =
            allPlant.plant_details.filter(weekRowPlant);

          this.setState({ allPlantDataWeek3: filteredweekRowPlant });

          this.filterPlantDataWeek3();
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('@MySuperStore:trussKey')
        .then(trussValues => {
          const allTruss = JSON.parse(trussValues);

          const filteredTrussWeek = this.state.week3;

          //Change week number
          const weekRowTruss = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredTrussWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowTruss =
            allTruss.truss_details.filter(weekRowTruss);

          this.setState({ allTrussDataWeek3: filteredweekRowTruss });

          this.filterTrussDataWeek3();
        })
        .done();
    } catch (error) {}
  };

  renderEntryDataLastToLast = () => {
    try {
      AsyncStorage.getItem('@MySuperStore:plantKey')
        .then(plantValues => {
          const allPlant = JSON.parse(plantValues);

          const filteredPlantWeek = this.state.week2;

          //Change week number
          const weekRowPlant = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredPlantWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowPlant =
            allPlant.plant_details.filter(weekRowPlant);

          this.setState({ allPlantDataWeek2: filteredweekRowPlant });

          this.filterPlantDataWeek2();
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('@MySuperStore:trussKey')
        .then(trussValues => {
          const allTruss = JSON.parse(trussValues);

          const filteredTrussWeek = this.state.week2;

          //Change week number
          const weekRowTruss = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredTrussWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowTruss =
            allTruss.truss_details.filter(weekRowTruss);

          this.setState({ allTrussDataWeek2: filteredweekRowTruss });

          this.filterTrussDataWeek2();
        })
        .done();
    } catch (error) {}

    //AWS DATA ENDS
  };

  renderEntryData = () => {
    //AWS data

    try {
      AsyncStorage.getItem('@MySuperStore:plantKey')
        .then(plantValues => {
          const allPlant = JSON.parse(plantValues);

          const filteredPlantWeek = this.state.week1;

          //Change week number
          const weekRowPlant = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredPlantWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowPlant =
            allPlant.plant_details.filter(weekRowPlant);

          this.setState({ allPlantDataWeek1: filteredweekRowPlant });

          this.filterPlantDataWeek1();
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('@MySuperStore:trussKey')
        .then(trussValues => {
          const allTruss = JSON.parse(trussValues);

          const filteredTrussWeek = this.state.week1;

          //Change week number
          const weekRowTruss = d =>
            d.plantName === 'GER 2 - Clobogo' &&
            d.plantWeek === filteredTrussWeek &&
            d.plantRow === rowSelected &&
            d.plantNumber === plantNumberSelected;

          const filteredweekRowTruss =
            allTruss.truss_details.filter(weekRowTruss);

          this.setState({ allTrussDataWeek1: filteredweekRowTruss });

          this.filterTrussDataWeek1();
        })
        .done();
    } catch (error) {}

    //AWS DATA ENDS
  };

  filterTrussDataWeek1() {
    //fruit load
    let sum = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.fruitLoad;
    }, 0);

    const averageFruitLoad = parseFloat(
      (sum / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averageFruitLoadFiltered;
    if (!isNaN(averageFruitLoad)) {
      averageFruitLoadFiltered = averageFruitLoad;
    } else {
      averageFruitLoadFiltered = '-';
    }

    //pruning flower
    let sum1 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.pruningFlower;
    }, 0);

    const averagePruningFlower = parseFloat(
      (sum1 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averagePruningFlowerFiltered;
    if (!isNaN(averagePruningFlower)) {
      averagePruningFlowerFiltered = averagePruningFlower;
    } else {
      averagePruningFlowerFiltered = '-';
    }

    //flowering truss
    let sum2 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.floweringTruss;
    }, 0);

    const averageFloweringTruss = parseFloat(
      (sum2 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averageFloweringTrussFiltered;
    if (!isNaN(averageFloweringTruss)) {
      averageFloweringTrussFiltered = averageFloweringTruss;
    } else {
      averageFloweringTrussFiltered = '-';
    }

    //pruning set
    let sum3 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.pruningSet;
    }, 0);

    const averagePruningSet = parseFloat(
      (sum3 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averagePruningSetFiltered;
    if (!isNaN(averagePruningSet)) {
      averagePruningSetFiltered = averagePruningSet;
    } else {
      averagePruningSetFiltered = '-';
    }

    //setting truss
    let sum4 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.settingTruss;
    }, 0);

    const averageSettingTruss = parseFloat(
      (sum4 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averageSettingTrussFiltered;
    if (!isNaN(averageSettingTruss)) {
      averageSettingTrussFiltered = averageSettingTruss;
    } else {
      averageSettingTrussFiltered = '-';
    }

    //pruning harvest
    let sum5 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.pruningHarvest;
    }, 0);

    const averagePruningHarvest = parseFloat(
      (sum5 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averagePruningHarvestFiltered;
    if (!isNaN(averagePruningHarvest)) {
      averagePruningHarvestFiltered = averagePruningHarvest;
    } else {
      averagePruningHarvestFiltered = '-';
    }

    //harvest truss
    let sum6 = this.state.allTrussDataWeek1.reduce(function (prev, current) {
      return prev + +current.harvestTruss;
    }, 0);

    const averageHarvestTruss = parseFloat(
      (sum6 / this.state.allTrussDataWeek1.length).toFixed(2),
    );
    var averageHarvestTrussFiltered;
    if (!isNaN(averageHarvestTruss)) {
      averageHarvestTrussFiltered = averageHarvestTruss;
    } else {
      averageHarvestTrussFiltered = '-';
    }

    this.setState({
      fruitLoadWeek1: averageFruitLoadFiltered,
      pruningFlowerWeek1: averagePruningFlowerFiltered,
      flowerTrussWeek1: averageFloweringTrussFiltered,
      pruningSetWeek1: averagePruningSetFiltered,
      settingTrussWeek1: averageSettingTrussFiltered,
      pruningHarvestWeek1: averagePruningHarvestFiltered,
      harvestTrussWeek1: averageHarvestTrussFiltered,
    });
  }

  filterTrussDataWeek3() {
    //fruit load
    let sum = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.fruitLoad;
    }, 0);

    const averageFruitLoad = parseFloat(
      (sum / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averageFruitLoadFiltered;
    if (!isNaN(averageFruitLoad)) {
      averageFruitLoadFiltered = averageFruitLoad;
    } else {
      averageFruitLoadFiltered = '-';
    }

    //pruning flower
    let sum1 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.pruningFlower;
    }, 0);

    const averagePruningFlower = parseFloat(
      (sum1 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averagePruningFlowerFiltered;
    if (!isNaN(averagePruningFlower)) {
      averagePruningFlowerFiltered = averagePruningFlower;
    } else {
      averagePruningFlowerFiltered = '-';
    }

    //flowering truss
    let sum2 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.floweringTruss;
    }, 0);

    const averageFloweringTruss = parseFloat(
      (sum2 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averageFloweringTrussFiltered;
    if (!isNaN(averageFloweringTruss)) {
      averageFloweringTrussFiltered = averageFloweringTruss;
    } else {
      averageFloweringTrussFiltered = '-';
    }

    //pruning set
    let sum3 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.pruningSet;
    }, 0);

    const averagePruningSet = parseFloat(
      (sum3 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averagePruningSetFiltered;
    if (!isNaN(averagePruningSet)) {
      averagePruningSetFiltered = averagePruningSet;
    } else {
      averagePruningSetFiltered = '-';
    }

    //setting truss
    let sum4 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.settingTruss;
    }, 0);

    const averageSettingTruss = parseFloat(
      (sum4 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averageSettingTrussFiltered;
    if (!isNaN(averageSettingTruss)) {
      averageSettingTrussFiltered = averageSettingTruss;
    } else {
      averageSettingTrussFiltered = '-';
    }

    //pruning harvest
    let sum5 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.pruningHarvest;
    }, 0);

    const averagePruningHarvest = parseFloat(
      (sum5 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averagePruningHarvestFiltered;
    if (!isNaN(averagePruningHarvest)) {
      averagePruningHarvestFiltered = averagePruningHarvest;
    } else {
      averagePruningHarvestFiltered = '-';
    }

    //harvest truss
    let sum6 = this.state.allTrussDataWeek3.reduce(function (prev, current) {
      return prev + +current.harvestTruss;
    }, 0);

    const averageHarvestTruss = parseFloat(
      (sum6 / this.state.allTrussDataWeek3.length).toFixed(2),
    );
    var averageHarvestTrussFiltered;
    if (!isNaN(averageHarvestTruss)) {
      averageHarvestTrussFiltered = averageHarvestTruss;
    } else {
      averageHarvestTrussFiltered = '-';
    }

    this.setState({
      fruitLoadWeek3: averageFruitLoadFiltered,
      pruningFlowerWeek3: averagePruningFlowerFiltered,
      flowerTrussWeek3: averageFloweringTrussFiltered,
      pruningSetWeek3: averagePruningSetFiltered,
      settingTrussWeek3: averageSettingTrussFiltered,
      pruningHarvestWeek3: averagePruningHarvestFiltered,
      harvestTrussWeek3: averageHarvestTrussFiltered,
    });
  }

  filterTrussDataWeek2() {
    //fruit load
    let sum = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.fruitLoad;
    }, 0);

    const averageFruitLoad = parseFloat(
      (sum / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averageFruitLoadFiltered;
    if (!isNaN(averageFruitLoad)) {
      averageFruitLoadFiltered = averageFruitLoad;
    } else {
      averageFruitLoadFiltered = '-';
    }

    //pruning flower
    let sum1 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.pruningFlower;
    }, 0);

    const averagePruningFlower = parseFloat(
      (sum1 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averagePruningFlowerFiltered;
    if (!isNaN(averagePruningFlower)) {
      averagePruningFlowerFiltered = averagePruningFlower;
    } else {
      averagePruningFlowerFiltered = '-';
    }

    //flowering truss
    let sum2 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.floweringTruss;
    }, 0);

    const averageFloweringTruss = parseFloat(
      (sum2 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averageFloweringTrussFiltered;
    if (!isNaN(averageFloweringTruss)) {
      averageFloweringTrussFiltered = averageFloweringTruss;
    } else {
      averageFloweringTrussFiltered = '-';
    }

    //pruning set
    let sum3 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.pruningSet;
    }, 0);

    const averagePruningSet = parseFloat(
      (sum3 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averagePruningSetFiltered;
    if (!isNaN(averagePruningSet)) {
      averagePruningSetFiltered = averagePruningSet;
    } else {
      averagePruningSetFiltered = '-';
    }

    //setting truss
    let sum4 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.settingTruss;
    }, 0);

    const averageSettingTruss = parseFloat(
      (sum4 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averageSettingTrussFiltered;
    if (!isNaN(averageSettingTruss)) {
      averageSettingTrussFiltered = averageSettingTruss;
    } else {
      averageSettingTrussFiltered = '-';
    }

    //pruning harvest
    let sum5 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.pruningHarvest;
    }, 0);

    const averagePruningHarvest = parseFloat(
      (sum5 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averagePruningHarvestFiltered;
    if (!isNaN(averagePruningHarvest)) {
      averagePruningHarvestFiltered = averagePruningHarvest;
    } else {
      averagePruningHarvestFiltered = '-';
    }

    //harvest truss
    let sum6 = this.state.allTrussDataWeek2.reduce(function (prev, current) {
      return prev + +current.harvestTruss;
    }, 0);

    const averageHarvestTruss = parseFloat(
      (sum6 / this.state.allTrussDataWeek2.length).toFixed(2),
    );
    var averageHarvestTrussFiltered;
    if (!isNaN(averageHarvestTruss)) {
      averageHarvestTrussFiltered = averageHarvestTruss;
    } else {
      averageHarvestTrussFiltered = '-';
    }

    this.setState({
      fruitLoadWeek2: averageFruitLoadFiltered,
      pruningFlowerWeek2: averagePruningFlowerFiltered,
      flowerTrussWeek2: averageFloweringTrussFiltered,
      pruningSetWeek2: averagePruningSetFiltered,
      settingTrussWeek2: averageSettingTrussFiltered,
      pruningHarvestWeek2: averagePruningHarvestFiltered,
      harvestTrussWeek2: averageHarvestTrussFiltered,
    });
  }

  filterPlantDataWeek3() {
    //leaves per plant
    let sum = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.leavesPerPlant;
    }, 0);

    const averageLeavesPerPlant = parseFloat(
      (sum / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageLeavesPerPlantFiltered;
    if (!isNaN(averageLeavesPerPlant)) {
      averageLeavesPerPlantFiltered = averageLeavesPerPlant;
    } else {
      averageLeavesPerPlantFiltered = '-';
    }

    //Fully set truss
    let sum1 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.fullySetTruss;
    }, 0);

    const averageFullySetTruss = parseFloat(
      (sum1 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageFullySetTrussFiltered;
    if (!isNaN(averageFullySetTruss)) {
      averageFullySetTrussFiltered = averageFullySetTruss;
    } else {
      averageFullySetTrussFiltered = '-';
    }

    //Set truss length
    let sum2 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.setTrussLength;
    }, 0);

    const averageSetTrussLength = parseFloat(
      (sum2 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageSetTrussLengthFiltered;
    if (!isNaN(averageSetTrussLength)) {
      averageSetTrussLengthFiltered = averageSetTrussLength;
    } else {
      averageSetTrussLengthFiltered = '-';
    }

    //Weekly growth
    let sum3 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.weeklyGrowth;
    }, 0);

    const averageWeeklyGrowth = parseFloat(
      (sum3 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageWeeklyGrowthFiltered;
    if (!isNaN(averageWeeklyGrowth)) {
      averageWeeklyGrowthFiltered = averageWeeklyGrowth;
    } else {
      averageWeeklyGrowthFiltered = '-';
    }

    //Flower truss height
    let sum4 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.floweringTrussHeight;
    }, 0);

    const averageFloweringTrussHeight = parseFloat(
      (sum4 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageFloweringTrussHeightFiltered;
    if (!isNaN(averageFloweringTrussHeight)) {
      averageFloweringTrussHeightFiltered = averageFloweringTrussHeight;
    } else {
      averageFloweringTrussHeightFiltered = '-';
    }

    //Leaf length
    let sum5 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.leafLength;
    }, 0);

    const averageLeafLength = parseFloat(
      (sum5 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageLeafLengthFiltered;
    if (!isNaN(averageLeafLength)) {
      averageLeafLengthFiltered = averageLeafLength;
    } else {
      averageLeafLengthFiltered = '-';
    }

    //Leaf Width
    let sum6 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.leafWidth;
    }, 0);

    const averageLeafWidth = parseFloat(
      (sum6 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageLeafWidthFiltered;
    if (!isNaN(averageLeafWidth)) {
      averageLeafWidthFiltered = averageLeafWidth;
    } else {
      averageLeafWidthFiltered = '-';
    }

    //Last week stem diameter
    let sum7 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.lastWeekStmDiameter;
    }, 0);

    const averageLastWeekStmDiameter = parseFloat(
      (sum7 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageLastWeekStmDiameterFiltered;
    if (!isNaN(averageLastWeekStmDiameter)) {
      averageLastWeekStmDiameterFiltered = averageLastWeekStmDiameter;
    } else {
      averageLastWeekStmDiameterFiltered = '-';
    }

    //Stem diameter
    let sum8 = this.state.allPlantDataWeek3.reduce(function (prev, current) {
      return prev + +current.stmDiameter;
    }, 0);

    const averageStmDiameter = parseFloat(
      (sum8 / this.state.allPlantDataWeek3.length).toFixed(2),
    );
    var averageStmDiameterFiltered;
    if (!isNaN(averageStmDiameter)) {
      averageStmDiameterFiltered = averageStmDiameter;
    } else {
      averageStmDiameterFiltered = '-';
    }

    this.setState({
      leavesPerPlantWeek3: averageLeavesPerPlantFiltered,
      fullySetTrussWeek3: averageFullySetTrussFiltered,
      setTrussLengthWeek3: averageSetTrussLengthFiltered,
      weeklyGrowthWeek3: averageWeeklyGrowthFiltered,
      flowerTrussHeightWeek3: averageFloweringTrussHeightFiltered,
      leafLengthWeek3: averageLeafLengthFiltered,
      leafWidthWeek3: averageLeafWidthFiltered,
      stemDiameterWeek3: averageStmDiameterFiltered,
      lastWeekStmDiameterWeek3: averageLastWeekStmDiameterFiltered,
    });
  }

  filterPlantDataWeek2() {
    //leaves per plant
    let sum = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.leavesPerPlant;
    }, 0);

    const averageLeavesPerPlant = parseFloat(
      (sum / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageLeavesPerPlantFiltered;
    if (!isNaN(averageLeavesPerPlant)) {
      averageLeavesPerPlantFiltered = averageLeavesPerPlant;
    } else {
      averageLeavesPerPlantFiltered = '-';
    }

    //Fully set truss
    let sum1 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.fullySetTruss;
    }, 0);

    const averageFullySetTruss = parseFloat(
      (sum1 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageFullySetTrussFiltered;
    if (!isNaN(averageFullySetTruss)) {
      averageFullySetTrussFiltered = averageFullySetTruss;
    } else {
      averageFullySetTrussFiltered = '-';
    }

    //Set truss length
    let sum2 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.setTrussLength;
    }, 0);

    const averageSetTrussLength = parseFloat(
      (sum2 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageSetTrussLengthFiltered;
    if (!isNaN(averageSetTrussLength)) {
      averageSetTrussLengthFiltered = averageSetTrussLength;
    } else {
      averageSetTrussLengthFiltered = '-';
    }

    //Weekly growth
    let sum3 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.weeklyGrowth;
    }, 0);

    const averageWeeklyGrowth = parseFloat(
      (sum3 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageWeeklyGrowthFiltered;
    if (!isNaN(averageWeeklyGrowth)) {
      averageWeeklyGrowthFiltered = averageWeeklyGrowth;
    } else {
      averageWeeklyGrowthFiltered = '-';
    }

    //Flower truss height
    let sum4 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.floweringTrussHeight;
    }, 0);

    const averageFloweringTrussHeight = parseFloat(
      (sum4 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageFloweringTrussHeightFiltered;
    if (!isNaN(averageFloweringTrussHeight)) {
      averageFloweringTrussHeightFiltered = averageFloweringTrussHeight;
    } else {
      averageFloweringTrussHeightFiltered = '-';
    }

    //Leaf length
    let sum5 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.leafLength;
    }, 0);

    const averageLeafLength = parseFloat(
      (sum5 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageLeafLengthFiltered;
    if (!isNaN(averageLeafLength)) {
      averageLeafLengthFiltered = averageLeafLength;
    } else {
      averageLeafLengthFiltered = '-';
    }

    //Leaf Width
    let sum6 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.leafWidth;
    }, 0);

    const averageLeafWidth = parseFloat(
      (sum6 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageLeafWidthFiltered;
    if (!isNaN(averageLeafWidth)) {
      averageLeafWidthFiltered = averageLeafWidth;
    } else {
      averageLeafWidthFiltered = '-';
    }

    //Last week stem diameter
    let sum7 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.lastWeekStmDiameter;
    }, 0);

    const averageLastWeekStmDiameter = parseFloat(
      (sum7 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageLastWeekStmDiameterFiltered;
    if (!isNaN(averageLastWeekStmDiameter)) {
      averageLastWeekStmDiameterFiltered = averageLastWeekStmDiameter;
    } else {
      averageLastWeekStmDiameterFiltered = '-';
    }

    //Stem diameter
    let sum8 = this.state.allPlantDataWeek2.reduce(function (prev, current) {
      return prev + +current.stmDiameter;
    }, 0);

    const averageStmDiameter = parseFloat(
      (sum8 / this.state.allPlantDataWeek2.length).toFixed(2),
    );
    var averageStmDiameterFiltered;
    if (!isNaN(averageStmDiameter)) {
      averageStmDiameterFiltered = averageStmDiameter;
    } else {
      averageStmDiameterFiltered = '-';
    }

    this.setState({
      leavesPerPlantWeek2: averageLeavesPerPlantFiltered,
      fullySetTrussWeek2: averageFullySetTrussFiltered,
      setTrussLengthWeek2: averageSetTrussLengthFiltered,
      weeklyGrowthWeek2: averageWeeklyGrowthFiltered,
      flowerTrussHeightWeek2: averageFloweringTrussHeightFiltered,
      leafLengthWeek2: averageLeafLengthFiltered,
      leafWidthWeek2: averageLeafWidthFiltered,
      stemDiameterWeek2: averageStmDiameterFiltered,
      lastWeekStmDiameterWeek2: averageLastWeekStmDiameterFiltered,
    });
  }

  filterPlantDataWeek1() {
    //leaves per plant
    let sum = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.leavesPerPlant;
    }, 0);

    const averageLeavesPerPlant = parseFloat(
      (sum / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageLeavesPerPlantFiltered;
    if (!isNaN(averageLeavesPerPlant)) {
      averageLeavesPerPlantFiltered = averageLeavesPerPlant;
    } else {
      averageLeavesPerPlantFiltered = '-';
    }

    //Fully set truss
    let sum1 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.fullySetTruss;
    }, 0);

    const averageFullySetTruss = parseFloat(
      (sum1 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageFullySetTrussFiltered;
    if (!isNaN(averageFullySetTruss)) {
      averageFullySetTrussFiltered = averageFullySetTruss;
    } else {
      averageFullySetTrussFiltered = '-';
    }

    //Set truss length
    let sum2 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.setTrussLength;
    }, 0);

    const averageSetTrussLength = parseFloat(
      (sum2 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageSetTrussLengthFiltered;
    if (!isNaN(averageSetTrussLength)) {
      averageSetTrussLengthFiltered = averageSetTrussLength;
    } else {
      averageSetTrussLengthFiltered = '-';
    }

    //Weekly growth
    let sum3 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.weeklyGrowth;
    }, 0);

    const averageWeeklyGrowth = parseFloat(
      (sum3 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageWeeklyGrowthFiltered;
    if (!isNaN(averageWeeklyGrowth)) {
      averageWeeklyGrowthFiltered = averageWeeklyGrowth;
    } else {
      averageWeeklyGrowthFiltered = '-';
    }

    //Flower truss height
    let sum4 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.floweringTrussHeight;
    }, 0);

    const averageFloweringTrussHeight = parseFloat(
      (sum4 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageFloweringTrussHeightFiltered;
    if (!isNaN(averageFloweringTrussHeight)) {
      averageFloweringTrussHeightFiltered = averageFloweringTrussHeight;
    } else {
      averageFloweringTrussHeightFiltered = '-';
    }

    //Leaf length
    let sum5 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.leafLength;
    }, 0);

    const averageLeafLength = parseFloat(
      (sum5 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageLeafLengthFiltered;
    if (!isNaN(averageLeafLength)) {
      averageLeafLengthFiltered = averageLeafLength;
    } else {
      averageLeafLengthFiltered = '-';
    }

    //Leaf Width
    let sum6 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.leafWidth;
    }, 0);

    const averageLeafWidth = parseFloat(
      (sum6 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageLeafWidthFiltered;
    if (!isNaN(averageLeafWidth)) {
      averageLeafWidthFiltered = averageLeafWidth;
    } else {
      averageLeafWidthFiltered = '-';
    }

    //Last week stem diameter
    let sum7 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.lastWeekStmDiameter;
    }, 0);

    const averageLastWeekStmDiameter = parseFloat(
      (sum7 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageLastWeekStmDiameterFiltered;
    if (!isNaN(averageLastWeekStmDiameter)) {
      averageLastWeekStmDiameterFiltered = averageLastWeekStmDiameter;
    } else {
      averageLastWeekStmDiameterFiltered = '-';
    }

    //Stem diameter
    let sum8 = this.state.allPlantDataWeek1.reduce(function (prev, current) {
      return prev + +current.stmDiameter;
    }, 0);

    const averageStmDiameter = parseFloat(
      (sum8 / this.state.allPlantDataWeek1.length).toFixed(2),
    );
    var averageStmDiameterFiltered;
    if (!isNaN(averageStmDiameter)) {
      averageStmDiameterFiltered = averageStmDiameter;
    } else {
      averageStmDiameterFiltered = '-';
    }

    this.setState({
      leavesPerPlantWeek1: averageLeavesPerPlantFiltered,
      fullySetTrussWeek1: averageFullySetTrussFiltered,
      setTrussLengthWeek1: averageSetTrussLengthFiltered,
      weeklyGrowthWeek1: averageWeeklyGrowthFiltered,
      flowerTrussHeightWeek1: averageFloweringTrussHeightFiltered,
      leafLengthWeek1: averageLeafLengthFiltered,
      leafWidthWeek1: averageLeafWidthFiltered,
      stemDiameterWeek1: averageStmDiameterFiltered,
      lastWeekStmDiameterWeek1: averageLastWeekStmDiameterFiltered,
    });
  }

  render() {
    return (
      <View style={styles.containerMain}>
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
              onPress={() => this.props.navigation.navigate(nameSelected)}
            >
              <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerImage2}>
            <Text style={styles.text}>GER 2 - Clobogo</Text>
          </View>

          <View style={{ height: 20, width: 20 }}>
            <Text style={{ alignSelf: 'center' }}></Text>
          </View>
        </View>

        <Text style={styles.text2}>
          Plant {this.state.plantNumber} - Row No. {this.state.rowNumber}
        </Text>

        <View style={{ marginTop: 18 }}></View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Measures</DataTable.Title>
                <DataTable.Title numeric>{this.state.week3}</DataTable.Title>
                <DataTable.Title numeric>{this.state.week2}</DataTable.Title>
                <DataTable.Title numeric>{this.state.week1}</DataTable.Title>
                <DataTable.Title numeric>
                  {this.state.weekNumber}
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Leaves Per Plant</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leavesPerPlantWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leavesPerPlantWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leavesPerPlantWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leavesPerPlant}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Fully Set Truss</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fullySetTrussWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fullySetTrussWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fullySetTrussWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fullySetTruss}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Fully Set Trs Lgth</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.setTrussLengthWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.setTrussLengthWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.setTrussLengthWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.setTrussLength}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Weekly Growth</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.weeklyGrowthWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.weeklyGrowthWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.weeklyGrowthWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.weeklyGrowth}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Flwer Truss Hht</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussHeightWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussHeightWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussHeightWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussHeight}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Leaf Length</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafLengthWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafLengthWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafLengthWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>{this.state.leafLength}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Leaf Width</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafWidthWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafWidthWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.leafWidthWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>{this.state.leafWidth}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Stem Diameter</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.stemDiameterWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.stemDiameterWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.stemDiameterWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.stemDiameter}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Lt Wk Stm Diameter</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.lastWeekStmDiameterWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.lastWeekStmDiameterWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.lastWeekStmDiameterWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.lastWeekStmDiameter}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <View style={styles.marginDimension}></View>
            <View style={styles.marginDimension}></View>

            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Fruit Load</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fruitLoadWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fruitLoadWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.fruitLoadWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>{this.state.fruitLoad}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Pruning Flower</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningFlowerWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningFlowerWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningFlowerWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningFlower}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Flowering Truss</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTrussWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.flowerTruss}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Pruning Set</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningSetWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningSetWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningSetWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>{this.state.pruningSet}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Setting Truss</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.settingTrussWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.settingTrussWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.settingTrussWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.settingTruss}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Pruning Harvest</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningHarvestWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningHarvestWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningHarvestWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.pruningHarvest}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Harvest Truss</DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.harvestTrussWeek3}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.harvestTrussWeek2}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.harvestTrussWeek1}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {this.state.harvestTruss}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <View style={styles.marginDimension}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },

  container: {
    paddingHorizontal: 30,
  },

  marginDimension: {
    marginBottom: 30,
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

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    //backgroundColor:'black'
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
    color: '#58B332',
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

  text2: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 19,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  textPlants: {
    margin: 6,
    margin: 20,
    fontSize: 24,
    color: '#ff0000',
    fontWeight: 'bold',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
