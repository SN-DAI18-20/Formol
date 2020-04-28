import React from 'react';

import { FormulaireContext, reducer } from '../src/utils/Contexts';

import { Text } from '../src/components/input-type/text';
import { Number } from '../src/components/input-type/number';
import { Selector } from '../src/components/input-type/selector';
import { CheckBox } from '../src/components/input-type/checkbox';
import { Range } from '../src/components/input-type/range';
import { Dates } from '../src/components/input-type/date';

export default {title: 'Input Types'}
export const TextInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Text bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}
export const NumberInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Number bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}
export const SelectorInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Selector bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}
export const CheckboxInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <CheckBox bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}
export const RangeInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Range bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}
export const DateInput = () => {
  const [state, dispatch] = React.useReducer(reducer);
    const logState = state => console.log({state})

  return (
    <FormulaireContext.Provider value={{state, dispatch}}>
      <Dates bringBackState={logState} />
    </FormulaireContext.Provider>

  )
}