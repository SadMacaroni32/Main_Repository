import React from 'react'; // Importing React library
import DashboardCard from './DashboardCard'; // Importing DashboardCard component from './DashboardCard' file
import Nav from '../NavBar/Nav'; // Importing Nav component from '../NavBar/Nav' file

const Dashboard = () => { // Defining Dashboard functional component
  return ( // Returning JSX 
    <div> 
    <Nav/> {/*Rendering Nav component */} 
     <DashboardCard/> {/* Rendering Nav component */}
    </div>
  );
};

export default Dashboard; // Exporting Dashboard component as default
//comments by: Judes 02-19-24