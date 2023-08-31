import React from 'react'
import GenericOdkForm from './page'
import { Provider } from 'react-redux'
import { store } from 'src/app/redux/store'
describe('<GenericOdkForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <GenericOdkForm />
      </Provider>
    )
    
  })
})