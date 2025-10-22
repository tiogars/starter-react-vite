import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './store/store';
import { router } from './routes';

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;