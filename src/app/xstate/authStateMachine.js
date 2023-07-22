// xstate/authStateMachine.js
import { createMachine } from 'xstate';

const authMachine = createMachine({
  initial: 'checking',
  states: {
    checking: {
      on: {
        AUTHENTICATED: 'authenticated',
        UNAUTHENTICATED: 'unauthenticated',
      },
    },
    authenticated: {
      on: {
        LOGOUT: 'unauthenticated',
      },
    },
    unauthenticated: {
      on: {
        LOGIN: 'authenticated',
      },
    },
  },
});

export default authMachine;
