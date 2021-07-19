import {StyleSheet} from 'react-native';
export const gridStyle = StyleSheet.create({
  item: {
    backgroundColor: 'green',
    margin: 10,
    width: 60,
    height: 60,
    padding: 15,
    fontSize: 25,
    color: 'green',
    textAlign: 'center',
    alignItems: 'center',
  },
  itemSelected: {
    backgroundColor: 'green',
    color: 'white',
  },
  itemInvisible: {
    backgroundColor: 'white',
    color: 'white',
  },
  grid: {
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    width: 100,
    backgroundColor: 'orange',
    padding: 10,
  },
  buttonContainer: {
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 100,
    marginTop: 150,
  },
  attemptsAndMatches: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
