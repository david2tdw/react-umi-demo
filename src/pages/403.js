// import { Page, Exception } from '@components';
import Exception from '@/components/Exception';
import Page from '@/components/PageWrapper';

export default function() {
  return (
    <Page>
      <Exception
        type={403}
        backText={'返回首页'}
        title={'403'}
        desc={'抱歉，你无权访问该页面'}
      />
    </Page>
  );
}
