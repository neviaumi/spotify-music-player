import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
