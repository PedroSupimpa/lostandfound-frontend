
import  { Suspense } from 'react';
import {  useRoutes } from 'react-router-dom';
import routes from './routes'; 
import HeaderBar from './components/HeaderBar';
import { ThemeProvider } from './components/theme-provider';


const App = () => {

  const elements = useRoutes(routes);

  

  return (
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderBar/>
      {elements}
    </Suspense>
    </ThemeProvider>
  );
};

export default App;
