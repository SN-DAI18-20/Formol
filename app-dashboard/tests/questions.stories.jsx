import React from 'react';

import { Questions } from '../src/components/formulaire/Questions';
import { FormulaireContext, reducer } from '../src/utils/Contexts';

export default {title: 'Questions'}
export const QuestionsStory = () => {

  const [state, dispatch] = React.useReducer(reducer);
  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Questions/>
    </FormulaireContext.Provider>
    )
}