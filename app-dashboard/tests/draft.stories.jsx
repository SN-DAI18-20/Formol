import React from 'react';

import { Draft } from '../src/components/formulaire/Draft';
import { FormulaireContext, reducer } from '../src/utils/Contexts';

export default {title: 'Draft'}
export const DraftNoProps = () => {

  const [state, dispatch] = React.useReducer(reducer);

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Draft/>
    </FormulaireContext.Provider>
  )
}