import { useContext } from 'react';
import { StoreContext } from 'index';

export const useStore = () => {
  return useContext(StoreContext);
};
