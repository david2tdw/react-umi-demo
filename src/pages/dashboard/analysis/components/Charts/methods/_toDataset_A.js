import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual'

const toDataset = (data) => {
  const {columns, rows} = data;
  const row_0 = columns.map(item => item.name);
  const rest = rows.map(row => columns.map(item => row[item.field]));
  return [row_0, ...rest]
}

export default memoizeOne(toDataset, isEqual)
