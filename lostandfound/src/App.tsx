
import  { Suspense } from 'react';
import {  useRoutes } from 'react-router-dom';
import routes from './routes'; 
import HeaderBar from './components/HeaderBar';

const App = () => {
  const elements = useRoutes(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderBar/>
      {elements}
    </Suspense>
  );
};

export default App;
