import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {endOfDay, endOfWeek, endOfMonth, endOfYear} from 'date-fns';

import CACHE_EXPIRY from './constants';

const FastImageWrapper = props => {
  const {source, cacheExpiry} = props;
  const {uri} = source;
  let cacheExpiryParam = '';
  const today = new Date();
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

  const updatedURI = cacheExpiryParam
    ? `${uri}?cacheExpiryParam=${cacheExpiryParam.getTime()}`
    : uri;

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
