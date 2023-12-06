import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosService from '../axios';

const ConstantsContext = createContext();

export const useConstants = () => {
  return useContext(ConstantsContext);
};

export const ConstantsProvider = ({ children }) => {
  const savedConstants = JSON.parse(localStorage.getItem('constants')) || {};
  
  const [constants, setConstants] = useState(savedConstants);

  useEffect(() => {
    if (Object.keys(constants).length === 0) {
      axiosService.get('/constants')
        .then((resp) => {
          setConstants(resp.data);
          localStorage.setItem('constants', JSON.stringify(resp.data));
        })
        .catch((error) => console.error('Failed to fetch constants', error));
    }
  }, [constants]);

  return (
    <ConstantsContext.Provider value={{ constants }}>
      {Object.keys(constants).length > 0 ? children : null}
    </ConstantsContext.Provider>
  );
};