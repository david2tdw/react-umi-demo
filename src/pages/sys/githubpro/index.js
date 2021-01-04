import { PureComponent } from 'react';
import { connect } from 'dva';
import { Page } from '@components';
// import Header from './components/header'

class Index extends PureComponent {
  render() {
    return (
      <Page
        pathtitles={[{ title: 'gitDataV', icon: 'github' }]}
        style={{ backgroundColor: 'transparent' }}
        title={'GitDataV'}
        descritpion={'this is desc.'}
      >
        header, content, footreTable
      </Page>
    );
  }
}

export default connect(({ githubPro, loading }) => {
  return {
    loading: loading.models.github,
  };
})(Index);
