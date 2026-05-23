import { BrowserRouter } from 'react-router';
import { AppRouter } from './router';

function CasoEstuioApp() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default CasoEstuioApp;
