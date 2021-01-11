import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import classNames from 'classnames';
import styles from './index.less';

const { Option } = AutoComplete;

class HeaderSearch extends Component {
  // 用来验证父组件传值的合法性
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    onChange: PropTypes.func,
    defaultActiveFirstOption: PropTypes.bool,
    dataSource: PropTypes.array,
    defaultOpen: PropTypes.bool,
  };
  // 如果父组件在调用子组件时，没有给子组件传值，子组件使用的就是defaultProps里定义的默认值。
  static defaultProps = {
    defaultActiveFirstOption: false,
    // onPressEnter: () => {},
    onChange: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
  }
  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.debouncePressEnter();
    }
  };
  onChange = value => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.input.focus();
      }
    });
  };
  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    console.log(onPressEnter);
    const { value } = this.state;
    onPressEnter(value);
  }
  render() {
    const {
      className,
      placeholder,
      dataSource,
      theme = 'dark',
      ...restProps
    } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen;
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      // <div>
      //   1231231
      // </div>
      <span
        className={classNames(className, styles.headerSearch)}
        style={{ color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.65)' }}
        onClick={this.enterSearchMode}
      >
        <SearchOutlined />123
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          options={dataSource.map(item => {
            const { title, key, link, ...restState } = item;
            if (
              key === undefined ||
              link === undefined ||
              title === undefined
            ) {
              console.error('The key or link is not defined:', item);
            }
            return (
              <Option key={key} value={key} text={title}>
                <Link
                  style={{ display: 'block' }}
                  to={{
                    pathname: link,
                    query: {
                      key: link.indexOf('frame') > -1 ? key : undefined,
                    },
                    state: { key, ...restState },
                  }}
                >
                  <span>{title}</span>
                </Link>
              </Option>
            );
          })}
          className={inputClass}
          style={{ color: theme === 'dark' ? '#FFF' : 'rgba(0, 0, 0, 0.65)' }}
          value={value}
          onChange={this.onChange}
        >
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node;
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}

export default HeaderSearch;
