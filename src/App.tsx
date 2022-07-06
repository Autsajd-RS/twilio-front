import { Provider } from 'react-redux';
import { store } from 'app-redux/store';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
