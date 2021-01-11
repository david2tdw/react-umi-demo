import {InfoCircleOutlined} from '@ant-design/icons'
import {Col, Row, Tooltip} from 'antd'

import {FormattedMessage} from 'umi'
import React from 'react'
import numeral from 'numeral'
import {ChartCard, Field} from './Charts'
import {VisitDataType} from './data.d'
import styles from '../style.less'

const topColResponsiveProps ={
  xl: 6,
  lg: 12,
  style: {marginBottom: 24}
}

const IntroduceRow = ({loading, visitData}: {loading: boolean; visitData: VisitDataType[]}) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="dashboardandanalysis.analysis.total-sales" defaultMessage="Total Sales" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => 12313}
        footer={
          <Field label={
            <FormattedMessage id="dashboardandanalysis.analysis.day-sales" defaultMessage="Daily Sales" />
          }
          value={`￥${numeral(123123).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        trend
      </ChartCard>
    </Col>
  </Row>
)

export default IntroduceRow;
