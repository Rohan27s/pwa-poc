import { assign, createMachine } from 'xstate';

const formSubmissionMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgZQK4CNMBLWWI1AOwDoiIAbMAYmwFUAhAWQEkAVAfQBiAeQBKHANoAGALqJQAB1RkALuQpyQAD0QBGAKwBmKpJMmdAFgBsknQCZbATgDsAGhABPRAA4nVBzstLJz0dAwcTPT1bAF9otzQsPEISMkoqWAJiZVUKKEZhMT5WTi5sbC4hADkilgBhWoBRMqlZJBBFFTUNbQRzKypLCz0vBwcDSUsDWz03TwR9Lypgsx8nWy9JDctY+IwcTJS1dIPsolz80Q4akrKK6oEAQS4AGRYRBpaNDqJVSm7EPqWAZDEZjCZTGYebw6Kh6UySJzmAxeSJhbZxEAJfbJUhHDIAY3xcFgjFqzyE2AaNXqTWwfAACkJ6Sx6Z82t9fuo2j1zF4gdZzDonP4vHYDOYHLNELZJA4qNMTLYJcEQoi9LEMRRUBA4BosUliLi-uylD8utzEABaSxShDWnaYvYGw5pWgML6mzn-Xq2W0OIFw0wOOGDWwGYIO-UHI3UDLJU65D2dY2gHoGHSLPRjYJBNaSWyBW1eRaCwLBULhSSoyNO6OpWO4QnEpNmlNaRBOCxLRxCpGWJVecy2iySWGmUKWQUFgwGGuJOtHZAAQyIdFw6DALa9FoQnfM3f8iIM-d5Q6hCC8tmM8KPKL05hsGuiQA */
    id: 'formSubmissionMachine',
    initial: 'idle',
    context: {
      isSubmitted: false,
    },
    states: {      
      idle: {
        on: {
          FORM_SUBMISSION_SUCCESS: 'success',
          FORM_SUBMISSION_FAILURE: 'failure',
        },
      },
      success: {       
       entry:'setSubmitted',
      },
      failure: {
       entry:'setSubmitted'
      },
    },
  },
  {
    actions: {
      setSubmitted:assign({
        isSubmitted:true,
      }),
      setSubmitted:assign({
        isSubmitted:false,
      })
    },
  }
);

export default formSubmissionMachine;
