import Index from "./pages/Index";
import NotFound from './pages/NotFound';

const App = () => {
  const isNotFound = window.location.pathname !== "/";
  
  if (isNotFound) return <NotFound />;
  return <Index />;
}

export default App;
