// import React, { useEffect, useRef } from 'react';
// import support from 'enketo-core/src/js/support';
// import { Form } from 'enketo-core';
// import fileManager from 'enketo-core/src/js/file-manager';
// import events from 'enketo-core/src/js/event';
// import { fixGrid, styleToAll, styleReset } from 'enketo-core/src/js/print';
// import { getFromLocalForage } from '../../services/utils';

// function OfflineForm(props) {
//     const { formName } = props;
//     async function renderForm() {
//         // Extracting Form from localForage
//         let survey = await getFromLocalForage(formName);
//         console.log("SURVEY ----> ", survey)
//         const getURLParameter = (name) => {
//             return decodeURI(
//                 (new RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.search) || [null, null])[1]
//             );
//         }
//         var form;
//         var formStr;
//         var modelStr;
//         // var xformURL = "https://api.ona.io/enketo/forms/68781/form.xml";

//         // if querystring touch=true is added, override detected touchscreen presence
//         if (getURLParameter('touch') === 'true') {
//             support.touch = true;
//             document.querySelector('html').classList.add('touch');
//         }

//         // const xform = fs.readFileSync(xformURL);
//         // const result = await transform({
//         //   xform: xform,
//         // });
//         // console.log({ result });


//         if (survey) {
//             formStr = survey.form;
//             modelStr = survey.model;
//             const range = document.createRange();
//             const formEl = range.createContextualFragment(formStr).querySelector('form');
//             document.querySelector('.form-header').after(formEl);
//             initializeForm();
//         }

//         // initialize the form
//         function initializeForm() {
//             const formEl = document.querySelector('form.or');
//             form = new Form(formEl, {
//                 modelStr: modelStr
//             }, {
//                 'printRelevantOnly': false
//             });
//             // for debugging
//             window.form = form;
//             //initialize form and check for load errors
//             const loadErrors = form.init();
//             if (loadErrors.length > 0) {
//                 window.alert('loadErrors: ' + loadErrors.join(', '));
//             }
//         }

//         // validate handler for validate button
//         // document.querySelector('#validate-form').addEventListener('click', () => {
//         //   // validate form
//         //   form.validate()
//         //     .then(function (valid) {
//         //       if (!valid) {
//         //         window.alert('Form contains errors. Please see fields marked in red.');
//         //       } else {
//         //         window.alert('Form is valid! (see XML record and media files in the console)');
//         //         form.view.html.dispatchEvent(events.BeforeSave());
//         //         console.log('record:', form.getDataStr());
//         //         console.log('media files:', fileManager.getCurrentFiles());
//         //       }
//         //     });
//         // });

//         function printView(on = true, grid = false) {
//             if (on) {
//                 document.querySelectorAll('.question').forEach(el => el.dispatchEvent(events.Printify()));
//                 styleToAll();
//                 if (grid) {
//                     fixGrid({ format: 'letter' })
//                         .then(() => console.log('done'));
//                 }

//             } else {
//                 document.querySelectorAll('.question').forEach(el => el.dispatchEvent(events.DePrintify()));
//                 styleReset();
//             }
//         }

//         window.printGridView = (on = true) => printView(on, true);
//         window.printView = printView;


//     }

//     useEffect(() => {
//         renderForm();
//     }, [])

//     return (
//         <div className='form-header' ></div>
//     );
// }

// export default OfflineForm;
