import { EllipsisOutlined } from '@ant-design/icons'
import React, { Component, Suspense } from 'react'
import { Col, Dropdown, Menu, Row } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import { RadioChangeEvent } from 'antd/es/radio'
import { RangePickerProps } from 'antd/es/date-picker/'
import moment from 'moment'
import { connect, Dispatch } from 'umi'

// import PageLoading from './components/PageLoading'
import { getTimeDistance } from './utils/utils'
import { AnalysisData } from './data.d'
import styles from './style.less'

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))
const SalesCard = React.lazy(() => import('./components/SalesCard'))
const TopSearch = React.lazy(() => import('./components/TopSearch'))
const ProportionSales = React.lazy(() => import('./components/ProportionSales'))


type RangePickerValue = RangePickerProps<moment.Moment>['value']

interface AnalysisProps {
  dashboardAndanalysis: AnalysisData
  dispatch: Dispatch<any>
  loading: boolean
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores'
  currentTabKey: string
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

  componentDidMount() {
    const { dispatch } = this.props
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAndanalysis/fetch',
      })
    })
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dashboardAndanalysis/clear',
    })
    cancelAnimationFrame(this.reqRef)
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
  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {

  }

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    return ''
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state
    const { dashboardAndanalysis, loading } = this.props
    const { visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline, 
    } = dashboardAndanalysis


    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData
    } else {
      salesPieData = salesType === 'online'? salesTypeDataOnline : salesTypeDataOffline;
    }
      const menu = (
        <Menu>
          <Menu.Item>操作一</Menu.Item>
          <Menu.Item>操作二</Menu.Item>
        </Menu>
      )
      const dropdownGroup = (
        <span className={styles.iconGroup}>
          <Dropdown overlay={menu} placement="bottomRight">
            <EllipsisOutlined />
          </Dropdown>
        </span>
      );
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
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col xl={12} lg={24}>
              <Suspense fallback={null}>
                <TopSearch loading={loading}
                  visitData2={visitData2}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    )
  }
}
export default connect(({
  dashboardAndanalysis,
  loading,
}: {
  dashboardAndanalysis: any
  loading: {
    effects: {
      [key: string]: boolean
    }
  }
}) => ({
  dashboardAndanalysis,
  loading: loading.effects['dashboardAndanalysis/fetch']
}))(Analysis)
