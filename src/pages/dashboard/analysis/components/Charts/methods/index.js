import memoizeOne from 'memoize-one'
import isEqual from 'lodash/isEqual'


import toDataset from './_toDataset_A';
import isData from './_isData';

const _toDataset = memoizeOne(toDataset, isEqual)
const _isData = memoizeOne(isData, isEqual)


export {
  _toDataset,
  _isData,
}

