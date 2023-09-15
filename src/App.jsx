
import { Main } from './components'
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <Main>
      <Outlet />
    </Main>
  );
}

export default App
