import ChartCard from './ChartCard'
import Field from './Field'
import numeral from 'numeral'


const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`

const Charts = {
  yuan,
  ChartCard,
  Field,
}

export {
  Charts as default,
  yuan,
  ChartCard,
  Field,
}