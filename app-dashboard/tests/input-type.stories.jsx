import React from 'react';

import Text from '../pages/components/input-type/text';
import Number from '../pages/components/input-type/number';
import Selector from '../pages/components/input-type/selector';
import Checkbox from '../pages/components/input-type/checkbox';
import Range from '../pages/components/input-type/range';
import Date from '../pages/components/input-type/date';

export default {title: 'Input Types'}
export const TextInput = () => <Text/>
export const NumberInput = () => <Number/>
export const SelectorInput = () => <Selector/>
export const CheckboxInput = () => <Checkbox/>
export const RangeInput = () => <Range/>
export const DateInput = () => <Date/>