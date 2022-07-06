import { Button, Col, Form, Input, message, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app-redux/hooks';
import { selectMessageState, verify } from 'app-redux/messageSlice';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export type VerifyParams = {
  username: string;
  code: string;
};

interface VerifyRouterState {
  username: string;
}

const Verify = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const { sendMessageLoading, currentUserMessage } = useAppSelector(selectMessageState);

  if (location.state) {
    const onFormSubmit = async (values: VerifyParams) => {
      try {
        const req = await dispatch(
          verify({ ...values, username: (location.state as VerifyRouterState).username })
        ).unwrap();

        message.success('SVAKA CAST VERIFIKOVALI STE SE');
        setStatus('success');
      } catch (err) {
        message.error(err as string);
      }
    };
    return (
      <Row justify="center">
        <Col xs={12}>
          <h1>Pozdrav {(location.state as VerifyRouterState).username}</h1>
          <h1>Verifikuj se: {currentUserMessage}</h1>
          <Form layout="vertical" onFinish={onFormSubmit}>
            <Form.Item name="code" label="Verifikacioni kod">
              <Input />
            </Form.Item>
            <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
              Pošalji
            </Button>
            {status === 'success' && (
              <Button type="primary" onClick={() => navigate('/')}>
                Unesi opet broj
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    );
  }
  return <div>Fail</div>;
};

export default Verify;
