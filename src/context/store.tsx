import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStatus } from "../service/docs/admin/status";

interface IStoreContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  storeLoading: boolean;
  storeSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext({} as IStoreContext);

export const useStoreContext = () => useContext(StoreContext);

function StoreProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statusRequest = async () => {
      const status = await getStatus();
      setIsOpen(status);
    };
    statusRequest();
    setLoading(false);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        isOpen,
        setIsOpen,
        storeLoading: loading,
        storeSetLoading: setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
