// xstate/authMachine.js
import { createMachine, assign } from 'xstate';

const authMachine = createMachine(
  {
    id: 'authMachine',
    initial: 'checking',
    context: {
      isAuthenticated: false,
    },
    states: {
      checking: {
        on: {
          AUTHENTICATED: 'authenticated',
          UNAUTHENTICATED: 'unauthenticated',
        },
      },
      authenticated: {
        entry: 'setAuthenticated',
      },
      unauthenticated: {
        entry: 'setUnauthenticated',
      },
    },
  },
  {
    actions: {
      setAuthenticated: assign({
        isAuthenticated: true,
      }),
      setUnauthenticated: assign({
        isAuthenticated: false,
      }),
    },
  }
);

export default authMachine;
