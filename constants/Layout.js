import { Dimensions } from 'react-native';

const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;

export const responsiveFontSize = ({min, max}) => {
    return (min + (max - min) * (viewportWidth - 375) / (1280 - 375))
}

export const responsiveLineHeight = ({min, max}) => {
    return (min + (max - min) * (viewportWidth - 375) / (1280 - 375)) * 1.66
}

export const spacing = {
    horizontal: {
        small: viewportWidth * .025,
        medium: viewportWidth * .05,
        large: viewportWidth * .075
    },
    vertical: {
        small: viewportHeight * .025,
        medium: viewportHeight * .05,
        large: viewportHeight * .075
    }
}

export const viewport = {
    height: viewportHeight,
    width: viewportWidth
}

export default viewport
