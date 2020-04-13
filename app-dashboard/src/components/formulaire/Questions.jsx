import React from 'react';

import { FormulaireContext } from '../../utils/Contexts';
import Question from '../question';

import Button from '@material-ui/core/Button';

export const Questions = () => {

  const {state, dispatch} = React.useContext(FormulaireContext)
  const [form, setForm] = React.useState(state || new Map([[0, { type: 'Text', required: false, parameters: {}, name: 'Question' }]]));

  const effect = () => {
    dispatch({type:'setForm', payload:[...form.values()]})
  }
  React.useEffect(effect, [form])

  const updateQuestionName = (id, name) => {
    form.set(id, {...form.get(id), name})
    setForm(new Map(form))
  }

  const deleteQuestion = (QuestionID) => {
    form.delete(QuestionID);
    setForm(new Map(form));
  };

  const bringBackState = (parameters, id) => {
    form.set(id, { ...form.get(id), parameters });
    setForm(new Map(form));
  };

  const changeType = (type, id) => {
    form.set(id, { ...form.get(id), type });
    setForm(new Map(form));
  };
  const toggleRequired = (required, id) => {
    form.set(id, { ...form.get(id), required });
    setForm(new Map(form));
  };

  const addQuestion = () => {
    const lastKey = Array.from(form.keys()).pop()+1
    form.set(lastKey || 1, {type:'Text', required:false})
    setForm(new Map(form))
	};

  return (
    <div>
      {Array.from(form).map(([id, question]) => {
        const { type, required, parameters } = question;
        return (
          <Question
            bringBackName={updateQuestionName}
            bringBackState={(stateToBringBack, required) =>
              bringBackState(stateToBringBack, id)}
            key={`question-${id}`}
            id={id}
            required={required}
            toggleRequired={(checked) => toggleRequired(checked, id)}
            changeType={(typeToChange, id) => changeType(typeToChange, id)}
            type={type}
            deleteQuestion={() => deleteQuestion(id)}
          />
        );
      })}
      <div>
        <Button variant="outlined" color="primary" onClick={addQuestion}>
          Ajouter une question
        </Button>
		  </div>
    </div>
  );
};