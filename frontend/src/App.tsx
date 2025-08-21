import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import routes from "./routes/routes";
import store from '@/store';
import { LoadingProvider } from '@/components/LoadingProvider';

function App() {                                 
  return (
    <Provider store={store}>
      <LoadingProvider>
        <RouterProvider router={routes} />
      </LoadingProvider>
    </Provider>
  )
}

export default App;
