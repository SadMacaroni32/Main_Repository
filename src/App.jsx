import React from "react";
import TeamIntegrationRoutes from "./TeamIntegrationRoutes";
import TeamC_Router from "./TeamC_Router";
//added them for function compatibility across several browsers
import 'core-js';
import 'regenerator-runtime/runtime';

const App = () => {
  return (
    <>

    {/*<TeamB_Router />*}
  
      {/* <TeamB_Router /> */}

       <TeamIntegrationRoutes/>
      {/* <TeamC_Router /> */}
    </>
  );
};

export default App;
