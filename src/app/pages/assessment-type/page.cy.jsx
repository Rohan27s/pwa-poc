import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/app/redux/store';
import { mount } from 'cypress/react18';
import Page from './page';

describe('<Page />', () => {

  it('renders', () => {
    mount(
      <Provider store={store}>
        <Page />
      </Provider>
    );
  });
});
