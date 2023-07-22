"use client"
import './globals.css'
import 'animate.css';
import { Provider } from 'react-redux';
import  store  from './redux/store.js'
import { useState } from 'react';
export const metadata = {
  title: 'Workflow',
  description: 'Workflow is an Open Source project aimed towards the creation of data flow models using config files thereby allowing you to easily create and interact with stateful applications with minimum setup.',
}

export default function RootLayout({ children }) {
  const [state, setState] = useState();

  return (
    <html lang="en">
      <body >
        <Provider store={store}>
            {children}
        </Provider>
      </body>

      <script id="main-script" module type="text/javascript" src="./enketo-offline-fallback.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform-edit.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform-view.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform.js" charset="utf-8"></script>
    </html>
  )
}