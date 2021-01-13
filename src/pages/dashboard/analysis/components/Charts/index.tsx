import ChartCard from './ChartCard'
import Field from './Field'
import MiniArea from './MiniArea'
import MiniBar from './MiniBar'
import MiniProgress from './MiniProgress'
import Bar from './Bar'
import numeral from 'numeral'


const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`

const Charts = {
  yuan,
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
}

export {
  Charts as default,
  yuan,
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
}