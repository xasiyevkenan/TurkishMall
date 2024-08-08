import {Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const CommonDimensions = {
  windowWidth: windowWidth,
  screenWidth: screenWidth,
  windowHeight: windowHeight,
  screenHeight: screenHeight,
};

export default CommonDimensions;
