import React from 'react';

export const FormulaireContext = React.createContext();

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
        case 'setQuestions':
            return { ...state, questions: [...payload] };
        case 'updateName':
            return { ...state, name: payload };
        case 'updateDescription':
            return { ...state, description: payload };
        case 'setDraft':
            return { ...state, draft: payload }
        default:
            break;
    }
};

export const FormulaireProvider = ({children, defaultState}) => {

  const [state, dispatch] = React.useReducer(reducer, defaultState)

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      {children}
    </FormulaireContext.Provider>
  )
}