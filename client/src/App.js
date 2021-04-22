import {Route} from 'react-router-dom';

import './App.css';
import MainPageContainer from './components/MainPageContainer.js'; 
import {NavBar} from './components/NavBar.js';
import {Title} from './components/Title.js';
import CardsContainer from './components/CardsContainer.js';
import SearchBar from './components/SearchBar.js';
import SortBar from './components/SortBar.js';
import {FiltersContainer} from './components/FiltersContainer.js';
import DogCard from './components/DogCard.js';
import {ReturnButton} from './components/ReturnButton.js';
import CreateDog from './components/CreateDog.js';

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
        component={SearchBar}
      />

      <Route
        exact path='/dogs'
        component={SortBar}
      />

      <Route 
        exact path='/dogs' 
        component={FiltersContainer} 
      />

      <Route 
        exact path='/dogs'
        component={CardsContainer}
      />
      
      <Route
        path='/dogs/details/:id'
        component={DogCard} 
      />

      <Route 
        exact path={'/dogs/create'}
        component={CreateDog}
      />

      <Route 
        strict path={'/dogs/'}
        component={ReturnButton}        
      />

    </div>
  );
}

export default App;
