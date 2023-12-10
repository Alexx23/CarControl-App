import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalTitleText: {
    color: 'black',
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0097FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    marginBottom: 5,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: 70,
  },
});
