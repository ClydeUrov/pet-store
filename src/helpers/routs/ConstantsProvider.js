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
          const updatedConstants = resp.data;
          setConstants(updatedConstants);
          localStorage.setItem('constants', JSON.stringify(updatedConstants));
        })
        .catch((error) => console.error('Failed to fetch constants', error));
    }
  }, [constants]);

  const updateConstants = (updatedConstants) => {
    localStorage.removeItem('constants');
    setConstants(updatedConstants);
    localStorage.setItem('constants', JSON.stringify(updatedConstants));
  };

  return (
    <ConstantsContext.Provider value={{ constants, updateConstants }}>
      {Object.keys(constants).length > 0 ? children : null}
    </ConstantsContext.Provider>
  );
};