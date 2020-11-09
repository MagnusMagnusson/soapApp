import Header from './components/Header';
import AppBody from './components/AppBody';
import {BrowserRouter} from 'react-router-dom';

import "./css/App.css"

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <Header></Header>
        <AppBody></AppBody>
      </BrowserRouter>
    </div>
  );
}

export default App;
