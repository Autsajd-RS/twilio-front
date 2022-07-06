import Main from 'pages/Main';
import SendMessage from 'pages/SendMessage';
import Verify from 'pages/Verify';
import { Route, Routes } from 'react-router';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<SendMessage />} />
        <Route path="verify" element={<Verify />} />
      </Route>
    </Routes>
  );
};

export default Router;
