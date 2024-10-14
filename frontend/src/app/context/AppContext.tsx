"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ITask } from "../types/task";

// Define the type for the context state
type AppState = {
  tasks: ITask[];
};

// Define the type for the context functions
type AppContextType = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

// Create the initial state
const defaultState: AppState = {
  tasks: [],
};

// Create the context with the type
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a prov_ider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
