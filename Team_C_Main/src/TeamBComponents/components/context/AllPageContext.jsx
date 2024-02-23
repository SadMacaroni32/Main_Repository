/* eslint-disable react/prop-types */
import { createContext } from "react";

export const AllPageContext = createContext()

const AllPageProvider = ({children}) => {
    return (
      <AllPageContext.Provider
        value={{
          showPerInfo,
          setPerInfo,
          showAccInfo,
          setShowAccInfo,
        }}>
        {children}
      </AllPageContext.Provider>
    );
}

export default AllPageProvider
