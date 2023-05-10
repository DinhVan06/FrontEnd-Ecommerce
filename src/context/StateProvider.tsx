import { InitialState, initialState } from "./initalState";
import React, { createContext, useContext, useReducer } from "react";
interface StateProviderProps {
  reducer: (state: InitialState, action: any) => InitialState;
  initialState: InitialState;
  children: React.ReactNode;
}

export const StateContext = createContext<[InitialState, React.Dispatch<any>]>([
  initialState,
  () => {},
]);

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
