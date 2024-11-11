import { createContext, useContext, useState } from 'react';

const ModalContextApi = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContextApi.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContextApi.Provider>
  );
};

export const useModal = () => useContext(ModalContextApi);