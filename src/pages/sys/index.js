import { Redirect } from 'umi';
import { sysDefultPage } from '../../../config/platform.config';

export default () => <Redirect to={sysDefultPage} />;
