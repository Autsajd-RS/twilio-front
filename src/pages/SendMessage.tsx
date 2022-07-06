import { Button, Col, Form, Input, message, Row } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { useAppDispatch, useAppSelector } from 'app-redux/hooks';
import { selectMessageState, sendMessage } from 'app-redux/messageSlice';
import { useNavigate } from 'react-router';
import { PhoneNumberUtil } from 'google-libphonenumber';

export type SendMessageParams = {
  username: string;
  phoneNUmber: string;
};

const SendMessage = () => {
  const { sendMessageLoading } = useAppSelector(selectMessageState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (params: SendMessageParams) => {
    const req = await dispatch(sendMessage(params));

    if (req.meta.requestStatus === 'fulfilled') {
      message.success('Message sent!');
      navigate('verify', {
        state: {
          username: params.username
        }
      });
    }
  };

  return (
    <Row justify="center">
      <Col xs={12}>
        <h1>Pošalji sms</h1>
        <Form layout="vertical" onFinish={onFormSubmit}>
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Broj telefona"
            rules={[
              {
                message: 'Format nije zadovoljavajuci',
                validator: (_, value) => {
                  const phoneUtil = PhoneNumberUtil.getInstance();
                  console.log(value);
                  const formatted = (value as string)
                    .replaceAll('(', '')
                    .replaceAll('+', '')
                    .replaceAll(')', '')
                    .replaceAll('_', '')
                    .replaceAll(/\s/g, '');
                  const number = phoneUtil.parseAndKeepRawInput(formatted, 'RS');
                  console.log(number.getCountryCode);
                  if (!phoneUtil.isValidNumberForRegion(number, 'RS')) {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <MaskedInput mask="(+381) (6)0 0000 000" />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
            loading={sendMessageLoading}
          >
            Pošalji
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SendMessage;
