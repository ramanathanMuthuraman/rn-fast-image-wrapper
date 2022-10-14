import React from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {PixelRatio, Text} from 'react-native';
import {endOfDay, endOfWeek, endOfMonth, endOfYear} from 'date-fns';

import {CACHE_EXPIRY, IMAGE_RESOLUTION} from './constants';

const getURIBasedOnDevice = multipleURI => {
  const devicePixelRatio = PixelRatio.get();
  const flooredDevicePixelRatio = Math.floor(devicePixelRatio);
  const uri = multipleURI[flooredDevicePixelRatio]
    ? multipleURI[flooredDevicePixelRatio]
    : multipleURI[IMAGE_RESOLUTION['1x']];
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
  multipleURI: PropTypes.shape({}),
  source: PropTypes.shape({}).isRequired,
};

FastImageWrapper.defaultProps = {
  cacheExpiry: CACHE_EXPIRY.NONE,
  multipleURI: null,
};

export default FastImageWrapper;
