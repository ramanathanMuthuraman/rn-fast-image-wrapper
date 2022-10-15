import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {PixelRatio, Text} from 'react-native';
import {endOfDay, endOfWeek, endOfMonth, endOfYear} from 'date-fns';

import CACHE_EXPIRY from './constants';

const DEFAULT_URI_INDEX = 1;

const getURIBasedOnDevice = multipleURI => {
  const devicePixelRatio = PixelRatio.get();
  const flooredDevicePixelRatio = Math.floor(devicePixelRatio);
  const uri = flooredDevicePixelRatio
    ? multipleURI[flooredDevicePixelRatio]
    : multipleURI[DEFAULT_URI_INDEX];
  return uri;
};

const getCacheExpiry = cacheExpiry => {
  const today = new Date();
  let cacheExpiryParam = '';
  switch (cacheExpiry) {
    case CACHE_EXPIRY.EVERY_END_OF_DAY:
      cacheExpiryParam = endOfDay(today);
      break;
    case CACHE_EXPIRY.EVERY_END_OF_WEEK:
      cacheExpiryParam = endOfWeek(today);
      break;
    case CACHE_EXPIRY.EVERY_END_OF_MONTH:
      cacheExpiryParam = endOfMonth(today);
      break;
    case CACHE_EXPIRY.EVERY_END_OF_YEAR:
      cacheExpiryParam = endOfYear(today);
      break;
    default:
      cacheExpiryParam = '';
  }
  return cacheExpiryParam;
};

const FastImageWrapper = props => {
  const {source, cacheExpiry, multipleURI} = props;
  const tempURI = multipleURI ? getURIBasedOnDevice(multipleURI) : source.uri;
  const cacheExpiryParam = getCacheExpiry(cacheExpiry);

  if (!tempURI) {
    return <Text> Invalid URI</Text>;
  }

  const updatedURI = cacheExpiryParam
    ? `${tempURI}?cacheExpiryParam=${cacheExpiryParam.getTime()}`
    : tempURI;

  const updatedSource = {
    ...source,
    uri: updatedURI,
  };

  return <FastImage {...props} source={updatedSource} />;
};

FastImageWrapper.propTypes = {
  cacheExpiry: PropTypes.string,
};

FastImageWrapper.defaultProps = {
  cacheExpiry: CACHE_EXPIRY.NONE,
};

export default FastImageWrapper;
