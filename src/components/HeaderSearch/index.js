import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input, AutoComplete } from 'antd';
import useMergeValue from 'use-merge-value';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import classNames from 'classnames';
import styles from './index.less';

const { Option } = AutoComplete;

const HeaderSearch = props => {
  // // 用来验证父组件传值的合法性
  // static propTypes = {
  //   className: PropTypes.string,
  //   placeholder: PropTypes.string,
  //   onSearch: PropTypes.func,
  //   onPressEnter: PropTypes.func,
  //   onChange: PropTypes.func,
  //   defaultActiveFirstOption: PropTypes.bool,
  //   dataSource: PropTypes.array,
  //   defaultOpen: PropTypes.bool,
  // };
  // // 如果父组件在调用子组件时，没有给子组件传值，子组件使用的就是defaultProps里定义的默认值。
  // static defaultProps = {
  //   defaultActiveFirstOption: false,
  //   // onPressEnter: () => {},
  //   onChange: () => {},
  //   onSearch: () => {},
  //   className: '',
  //   placeholder: '',
  //   dataSource: [],
  //   defaultOpen: false,
  // };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     searchMode: props.defaultOpen,
  //     value: '',
  //   };
  // }
  // onKeyDown = e => {
  //   if (e.key === 'Enter') {
  //     this.debouncePressEnter();
  //   }
  // };
  const onChange = value => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
  const enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.input.focus();
      }
    });
  };
  const leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };
  // debouncePressEnter() {
  //   const { onPressEnter } = this.props;
  //   console.log(onPressEnter);
  //   const { value } = this.state;
  //   onPressEnter(value);
  // }
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    open,
    defaultOpen,
    // dataSource,
    // theme = 'dark',
    ...restProps
  } = props;
  // const { searchMode, value } = this.state;
  // delete restProps.defaultOpen;
  // const inputClass = classNames(styles.input, {
  //   [styles.show]: searchMode,
  // });

  const inputRef = useRef();
  const [value, setValue] = useMergeValue(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const [searchMode, setSearchMode] = useMergeValue(defaultOpen || false, {
    value: props.open,
    onChange: onVisibleChange,
  });

  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });
  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        // console.log(searchMode);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        style={{
          height: 28,
          marginTop: -6,
        }}
        options={restProps.options}
        onChange={setValue}
      >
        <Input
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        ></Input>
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
