import { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ login }) => ({
  isError: login.isError,
}))
class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (errors, values) => {
      onSubmit(errors, values);
    });
  };
  handleChange = () => {
    if (this.props.isError === true) {
      this.props.dispatch({
        type: 'login/save',
        payload: {
          isError: false,
        },
      });
    }
  };
  render() {
    const { loading, form, isError } = this.props;
    // const { getFieldDecorator: fd } = from;
    const error = isError
      ? {
          validateStatus: 'error',
          help: '用户名或密码错误',
        }
      : {};

    return (
      <div className={styles.login_form}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...error}
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input
              // prefix={<Icon type="user" className={styles.color} />}
              prefix={<UserOutlined className={styles.color} />}
              onChange={this.handleChange}
              placeholder="user Name"
            />
          </FormItem>
          <FormItem
            {...error}
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              // prefix={<Icon type="lock" className={styles.color} />}
              prefix={<LockOutlined className={styles.color} />}
              type="password"
              onChange={this.handleChange}
              placeholder="password"
            />
          </FormItem>
          <FormItem
            // name="rememberMe"
            rules={[{ valuePropName: 'checked', initialValue: true }]}
          >
            <Checkbox>remember Me</Checkbox>
            <a className={styles.login_form_forgot} href="/">
              forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              loading={loading}
            >
              login
            </Button>
            <a href="/#register">signup</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Login;
