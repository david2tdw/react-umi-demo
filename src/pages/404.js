// import { Page, Exception } from '@components';
import Exception from '../components/Exception';
import Page from '../components/PageWrapper';

export default function() {
  return (
    <Page flex={true} showHeader={false}>
      <Exception
        type={404}
        backText={'返回首页'}
        title={'404'}
        desc={'抱歉，你访问的页面不存在'}
      ></Exception>
    </Page>
  );
}
