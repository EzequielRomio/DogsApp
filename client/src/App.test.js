import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import MainPageContainer from './components/MainPageContainer';



test('Is Main Page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPageContainer />
      </BrowserRouter>
    </Provider>
  ); //
  const linkElement = screen.getByTestId("0");
  expect(linkElement).toBeInTheDocument();
});

test('Has a title', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPageContainer />
      </BrowserRouter>
    </Provider>
  ); //
  const linkElement = screen.getByTestId("1");
  expect(linkElement).toBeInTheDocument();
});


test('Has an Image', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPageContainer />
      </BrowserRouter>
    </Provider>
  ); //
  const linkElement = screen.getByTestId("2");
  expect(linkElement).toBeInTheDocument();
});