import React from 'react';

export const FormulaireContext = React.createContext()

/**
 *
 * @param { {
 *  title: string,
 *  description: string,
 *  questions: Array
 * } } state
 * @param { {
 *  type: "updateQuestions" | "updateTitle" | "updateDescription",
 *  payload: any
 * } } action
 */
export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'updateQuestions':
      return {...state, questions: [...payload] }
    case 'updateTitle':
      return {...state, title: payload}
    case 'updateDescription':
      return {...state, description: payload}
    default:
      break;
  }
}
