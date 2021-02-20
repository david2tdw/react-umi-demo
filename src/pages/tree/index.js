import React from 'react'

import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'

import Tree from '@/components/D3Chart/Tree'


class D3Tree extends React.Component {
  render () {
    const {dataset, dispatch, loading} = this.props;
    const handleClick = (name) => {
      dispatch({
        type: 'tree/getData',
        payload: {
          name
        }
      })
    };
    return (
      <PageContainer>
        123123
        {/* <Tree 
          data={dataset}
          nodeClick={(d) => {
            const {data: {name}} = d
            handleClick(name)
          }}
          maxDepth={5}
          siderbarClick={(d) => {
            console.log(d)
          }}
          routerClick={(d) => {
            const {value} = d
            handleClick(value)
          }}
        >
        </Tree> */}
      </PageContainer>
    )

  }
}

export default D3Tree
