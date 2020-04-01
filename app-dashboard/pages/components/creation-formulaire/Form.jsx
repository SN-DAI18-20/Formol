import React from 'react';

import { FormulaireContext } from './Contexts';
import Question from '../question';

import Button from '@material-ui/core/Button';

export const Form = () => {

  const {state, dispatch} = React.useContext(FormulaireContext)
  const [form, setForm] = React.useState(state || new Map([[0, { type: 'Text', required: false, state: {} }]]));

  const effect = () => {
    dispatch({type:'updateQuestions', payload:[...form.values()]})
  }
  React.useEffect(effect, [form])

  const deleteQuestion = (QuestionID) => {
    form.delete(QuestionID);
    setForm(new Map(form));
  };

  const bringBackState = (state, id, type, required) => {
    form.set(id, { type, state, required });
    setForm(new Map(form));
  };

  const changeType = (type, id, required, state) => {
    form.set(id, { type, required, state });
    setForm(new Map(form));
  };
  const toggleRequired = (required, type, id, state) => {
    form.set(id, { type, required, state });
    setForm(new Map(form));
  };

  const addQuestion = () => {
    const lastKey = Array.from(form.keys()).pop()+1
    form.set(lastKey, {type:'Text', required:false})
    setForm(new Map(form))
	};

  return (
    <div>
      {Array.from(form).map(([id, question]) => {
        const { type, required, state } = question;
        return (
          <Question
            bringBackState={(stateToBringBack, required) =>
              bringBackState(stateToBringBack, id, type, required)}
            key={`question-${id}`}
            id={id}
            required={required}
            toggleRequired={(checked) => toggleRequired(checked, type, id, state)}
            changeType={(typeToChange, id, required) => changeType(typeToChange, id, required, state)}
            type={type}
            deleteQuestion={() => deleteQuestion(id)}
          />
        );
      })}
      <div>
		    <Button color="primary" onClick={addQuestion}>
			    add
			  </Button>
		  </div>
    </div>
  );
};