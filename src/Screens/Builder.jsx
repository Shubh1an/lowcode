import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modules from './Modules.jsx';
import Entities from './Entities.jsx';
import Pages from './Pages.jsx';
import Editor from './Editor.jsx';
import View from './View.jsx';
import ListView from './ListView.jsx';

const Builder = () => {
  const location = useLocation();
  const { pathname } = location;
  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    console.log('pathname', pathname);
    // Update the current component based on the pathname
    switch (pathname) {
      case `/builder`:
        setComponentToRender(<Modules />);
        break;
      case `/builder/entity`:
        setComponentToRender(<Entities />);
        break;
      case `/builder/pages`:
        setComponentToRender(<Pages />);
        break;
      case `/builder/editor`:
        setComponentToRender(<Editor />);
        break;
      case `/builder/viewform`:
        setComponentToRender(<View />);
        break;
      case `/builder/listview`:
        setComponentToRender(<ListView />);
        break;
      default:
        setComponentToRender(<></>);
        break;
    }
  }, [pathname]);
  return <>{componentToRender}</>;
};

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Builder;
