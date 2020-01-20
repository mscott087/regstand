import { Dimensions } from 'react-native';

const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;

export const responsiveFontSize = ({ min, max }) => {
	return min + ((max - min) * (viewportWidth - 375)) / (1280 - 375);
};

export const responsiveLineHeight = ({ min, max }) => {
	return responsiveFontSize({ min: min, max: max }) * 1.66;
};

export const spacing = {
	horizontal: {
		small: viewportWidth * 0.025,
		medium: viewportWidth * 0.05,
		large: viewportWidth * 0.075,
	},
	vertical: {
		small: viewportHeight * 0.025,
		medium: viewportHeight * 0.05,
		large: viewportHeight * 0.075,
	},
};

export const viewport = {
	height: viewportHeight,
	width: viewportWidth,
};

export default viewport;
