import {Route} from 'react-router-dom';

import './App.css';
import {MainPageContainer} from './components/MainPageContainer.js'; 
import {NavBar} from './components/NavBar.js';
import {Title} from './components/Title.js';
import {CardsContainer} from './components/CardsContainer.js';

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
      
      <Route 
        exact path='/dogs'
        component={CardsContainer}
      />

    </div>
  );
}

export default App;
