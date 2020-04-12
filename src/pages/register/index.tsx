import React, { Dispatch, Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import action from '@/utils/action';
import connect from 'dva';
// import request from 'umi-request';
import { RouteComponentProps } from 'react-router';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

interface RegisterInfoProps extends RouteComponentProps{
  dispatch: Dispatch<any>
  phone: string
}

interface RegisterInfoState {
  phone: string
}

const namespace = 'registerModel';

const mapStateToProps = (state: any) => {
  const userInfo = state[namespace].userInfo
  return {
    userInfo
  }
};

@connect(mapStateToProps)
class Register extends Component<RegisterInfoProps, RegisterInfoState>{
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  //   submit(values);
  // };
  state: RegisterInfoState = {
    phone: ''
  }

  // const onFinishFailed = (errorInfo: any) => {
  //   alert('请输入license!')
  // };

  submit = (values: any) => {
    console.log(values.phone);
    this.props.dispatch(action(`${namespace}/users`, {phone: values.phone}));
    // 方法二
    // request
    //   .get('/users', {
    //     params: {
    //       phone: values.phone
    //     }
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error){
    //     console.log(error);
    //   })
  }

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default Register;