import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  return (
    <AppContext.Provider value={{
      user,
      setUser, 
      isSeller, 
      setSeller, 
      navigate, 
      showUserLogin, 
      setShowUserLogin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};