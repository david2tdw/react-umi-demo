import User from '../GlobalUserCenter';
import Search from '../GlobalSearch';
import Notice from '../Notice';
import styles from './index.less';

function Header(props) {
  const {
    userInfo = {},
    message,
    handleLoadMore = () => {},
    handleSetting = () => {},
  } = props;
  return (
    <div className={styles.rightCenter}>
      search, notice,
      <User
        className={styles.action}
        userInfo={userInfo}
        onSetting={handleSetting}
      />
    </div>
  );
}
export default Header;
