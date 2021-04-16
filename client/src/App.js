import {Route} from 'react-router-dom';

import './App.css';
import {MainPageContainer} from './components/MainPageContainer.js'; 
import {NavBar} from './components/NavBar.js';
import {Title} from './components/Title.js';

function App() {
  return (
    <div className="App">
      <Route 
        exact path='/'
        component={MainPageContainer}
      />
      
      <Route 
      path='/dogs'
      render={() => <Title isMain={false}/>} 
      />

      <Route 
        path='/dogs'
        component={NavBar}
      />
      
    </div>
  );
}

export default App;
