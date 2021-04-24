import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import MainPageContainer from './components/MainPageContainer';

test('', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPageContainer />
      </BrowserRouter>
    </Provider>
  ); //
  const linkElement = screen.getByText('DogsApp!');
  expect(linkElement).toBeInTheDocument();
});
