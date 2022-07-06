import { Col, Row } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

const Main = () => {
  const navigate = useNavigate();
  const [checkedTag, setCheckedTag] = useState('send');

  useEffect(() => {
    if (checkedTag === 'send') {
      navigate('/');
      return;
    }
    navigate('/verify');
  }, [checkedTag]);

  return (
    <Row justify="center">
      <Col xs={12}>
        <CheckableTag checked={checkedTag === 'send'} onClick={() => setCheckedTag('send')}>
          Send
        </CheckableTag>
      </Col>
      <Col xs={24}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default Main;
