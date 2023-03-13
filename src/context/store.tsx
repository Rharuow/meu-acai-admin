import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { getStatus } from "../service/docs/store";

interface IStoreContext {
  isOpen: boolean | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  error: any;
  storeLoading: boolean | undefined;
  storeSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext({} as IStoreContext);

export const useStoreContext = () => useContext(StoreContext);

// isOpen,
// storeLoading: loading,
// storeSetLoading: setLoading,
// setIsOpen,

function StoreProvider({ children }: { children: ReactNode }) {
  const { data: status, isLoading, error } = useSWR("status/", getStatus);

  const [isOpen, setIsOpen] = useState(status);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setIsOpen(status);
    setLoading(isLoading);
  }, [isLoading, status]);

  return (
    <StoreContext.Provider
      value={{
        isOpen,
        setIsOpen,
        error,
        storeLoading: loading,
        storeSetLoading: setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
