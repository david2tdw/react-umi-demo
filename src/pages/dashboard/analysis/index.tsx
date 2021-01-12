import {EllipsisOutlined} from '@ant-design/icons'
import React, {Component, Suspense} from 'react'
import {Col, Dropdown, Menu, Row} from 'antd'
import { GridContent} from '@ant-design/pro-layout'
import {RadioChangeEvent} from 'antd/es/radio'
import {RangePickerProps} from 'antd/es/date-picker/'
import moment from 'moment'
import {connect, Dispatch} from 'umi'

// import PageLoading from './components/PageLoading'
import {getTimeDistance} from './utils/utils'
import {AnalysisData} from './data.d'
import styles from './style.less'

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))
const SalesCard = React.lazy(() => import('./components/SalesCard'));


type RangePickerValue = RangePickerProps<moment.Moment>['value'];

interface AnalysisProps {
  dashboardAndanalysis: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year')
  }

  reqRef: number = 0;
  timeoutId: number = 0;

  componentDidMount () {
    const {dispatch} = this.props
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAndanalysis/fetch',
      })
    })
  }
  componentWillUnmount () {
    const { dispatch} = this.props;
    dispatch({
      type: 'dashboardAndanalysis/clear',
    })
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId)
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    })
  }

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    })
  }

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {

  }
  selectDate = (type: 'today' | 'week' | 'month' | 'year' ) => {

  }

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    return ''
  }

  render () {
    const {rangePickerValue, salesType, currentTabKey} = this.state;
    const {dashboardAndanalysis, loading} = this.props;
    const {visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,} = dashboardAndanalysis;
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Row gutter={24} style={{marginTop:24}}>
            <Col xl={12} lg={24}>
              <Suspense fallback={null}>
                top search.
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}
export default connect(({
  dashboardAndanalysis,
  loading,
}: {
  dashboardAndanalysis: any;
  loading: {
    effects: {
      [key: string]:boolean
    }
  }
}) => ({
  dashboardAndanalysis,
  loading: loading.effects['dashboardAndanalysis/fetch']
}))(Analysis);
