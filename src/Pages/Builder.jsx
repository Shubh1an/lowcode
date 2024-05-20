import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Entity from '../Components/Builder/Entity';
import Module from '../Components/Builder/Module';
import Form from '../Components/Builder/Form';

const Builder = () => {
  const location = useLocation();
  const { pathname } = location;

  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    // Update the current component based on the pathname
    switch (pathname) {
      case `/builder/entity`:
        setComponentToRender(<Entity />);
        break;
      case `/builder/pages`:
        setComponentToRender(<Form />);
        break;
      case `/builder/dashboard`:
        setComponentToRender(<Dashboard />);
        break;
      default:
        setComponentToRender(<Module />);
        break;
    }
  }, [pathname]);
  return <>{componentToRender}</>;
};

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Builder;
