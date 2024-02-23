import { Fragment } from "react";
import { useLocation } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../js/script';
import Team_D_HeaderV2 from "../../../TeamDComponents/Team_D_HeaderV2"; 
import TeamC_MainContent from "../../components/maincontent";

function TeamC_CourseSvn3(){

    return (
        <Fragment>
          <Team_D_HeaderV2/>
          <TeamC_MainContent />

        </Fragment>
      );
    }
export default TeamC_CourseSvn3;