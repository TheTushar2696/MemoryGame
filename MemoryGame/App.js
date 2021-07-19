import React, {useEffect, useState} from 'react';
import {FlatList, Text, BackHandler, Alert} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {letters} from './App/constants/Letters';
import {gridStyle} from './App/styles/styles';
import {generateGameBoardData} from './App/utils/GenerateGameBoardDataHelper';
import {strings} from './App/constants/Strings';
import RNExitApp from 'react-native-exit-app';

const App = () => {
  let updatedRandomArray;
  const [currentRandomArray, setCurrentRandomArray] = useState([]);
  const [selectedCellArray, setSelectedCellArray] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    setCurrentRandomArray(generateGameBoardData(letters));
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed);
    };
  }, []);

  const resetGame = () => {
    setAttempts(0);
    setMatches(matches + 1);
    const newArray = generateGameBoardData(letters);
    newArray.forEach(function (obj) {
      obj.flipped = false;
      obj.visible = true;
    });
    setCurrentRandomArray(newArray);
  };

  const onBackPressed = () => {
    Alert.alert(
      strings.onBackPressedTitle,
      strings.onBackPressedAlertMessage,
      [
        {
          text: strings.onBackPressedAlertButtonText,
          onPress: () => {
            RNExitApp.exitApp();
          },
        },
      ],
      {cancelable: false},
    );

    return true;
  };

  const onCellClicked = async (index, item, itemId) => {
    updatedRandomArray = [
      ...selectedCellArray,
      {letter: item.letter, key: itemId},
    ];
    setSelectedCellArray(updatedRandomArray);
    // Setting flipped value as true for the selected item
    for (let i = 0; i < currentRandomArray.length; i++) {
      if (currentRandomArray[i].key === itemId) {
        currentRandomArray[index].flipped = true;
      }
    }

    if (updatedRandomArray.length === 2) {
      //Condition when user clicked the same cell again
      if (updatedRandomArray[0].key === updatedRandomArray[1].key) {
        updatedRandomArray.splice(1, 1);
        return;
      }
      setAttempts(attempts + 1);
      await checkIfUserIdentifiedTheLetter(item, itemId);
    }
  };

  const checkIfUserIdentifiedTheLetter = (item, itemId) => {
    if (updatedRandomArray[0].letter === updatedRandomArray[1].letter) {
      for (let i = 0; i < currentRandomArray.length; i++) {
        if (currentRandomArray[i].letter === updatedRandomArray[0].letter) {
          currentRandomArray[i].visible = false;
        }
      }
    }
    setTimeout(function () {
      for (let i = 0; i < currentRandomArray.length; i++) {
        currentRandomArray[i].flipped = false;
      }
      setCurrentRandomArray(currentRandomArray);
    }, 1000);
    setSelectedCellArray([]);
  };

  const getButtonStyles = item => {
    if (!item.visible) {
      return [gridStyle.item, gridStyle.itemInvisible];
    } else if (item.flipped) {
      return [gridStyle.item, gridStyle.itemSelected];
    } else {
      return gridStyle.item;
    }
  };
  return (
    <>
      <FlatList
        contentContainerStyle={gridStyle.containerStyle}
        keyExtractor={(item, index) => item.key}
        numColumns={4}
        data={currentRandomArray}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={
                item.visible
                  ? [gridStyle.grid, {backgroundColor: 'white'}]
                  : gridStyle.grid
              }
              disabled={!item.visible}
              onPress={() => onCellClicked(index, item, item.key)}>
              <Text style={getButtonStyles(item)}>{item.letter}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 50,
        }}>
        <Text style={gridStyle.attemptsAndMatches}>Attempts: {attempts}</Text>
        <Text style={gridStyle.attemptsAndMatches}>Matches: {matches}</Text>
      </View>

      <View style={gridStyle.buttonContainer}>
        <TouchableOpacity
          style={gridStyle.buttonStyle}
          onPress={() => resetGame()}>
          <Text>Restart </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;
