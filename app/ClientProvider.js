'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import { AuthProvider } from '@/context/AuthContext';

const ClientProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
};

export default ClientProvider;
