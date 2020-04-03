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
 *  type: "updateQuestions" | "updateName" | "updateDescription",
 *  payload: any
 * } } action
 */
export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'setForm':
      return {...state, form: [...payload] }
    case 'updateName':
      return {...state, name: payload}
    case 'updateDescription':
      return {...state, description: payload}
    default:
      break;
  }
}
