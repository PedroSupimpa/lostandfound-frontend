
import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes'; 

const App = () => {
  const elements = useRoutes(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {elements}
    </Suspense>
  );
};

export default App;
