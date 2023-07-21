import './globals.css'
import 'animate.css';


export const metadata = {
  title: 'Workflow',
  description: 'Workflow is an Open Source project aimed towards the creation of data flow models using config files thereby allowing you to easily create and interact with stateful applications with minimum setup.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>

      <script id="main-script" module type="text/javascript" src="./enketo-offline-fallback.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform-edit.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform-view.js" charset="utf-8"></script>
      <script module type="text/javascript" src="./enketo-webform.js" charset="utf-8"></script>
    </html>
  )
}