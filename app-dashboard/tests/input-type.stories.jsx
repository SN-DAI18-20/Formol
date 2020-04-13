import React from 'react';

import { Text } from '../src/components/input-type/text';
import { Number } from '../src/components/input-type/number';
import { Selector } from '../src/components/input-type/selector';
import { CheckBox } from '../src/components/input-type/checkbox';
import { Range } from '../src/components/input-type/range';
import { Dates } from '../src/components/input-type/date';

export default {title: 'Input Types'}
export const TextInput = () => <Text/>
export const NumberInput = () => <Number/>
export const SelectorInput = () => <Selector/>
export const CheckboxInput = () => <CheckBox/>
export const RangeInput = () => <Range/>
export const DateInput = () => <Dates/>