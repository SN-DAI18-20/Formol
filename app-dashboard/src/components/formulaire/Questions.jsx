import React from 'react';

import { FormulaireContext } from '../../utils/Contexts';
import Question from '../question';

import Button from '@material-ui/core/Button';

export const Questions = () => {

  const {state, dispatch} = React.useContext(FormulaireContext)
  const arrayToMap = questions => {
      const mapToPush = questions.map((question, index) => [index, question])
      return new Map(mapToPush)
    }
  const [questions, setQuestions] = React.useState(state?.form
  ? arrayToMap(state.form)
  : new Map([[0, { type: 'text', required: false, parameters: {}, name: 'Question' }]])
  );


  const effect = () => {
    dispatch({type:'setForm', payload:[...form.values()]})
  }
  React.useEffect(effect, [form])

  const updateQuestionName = (id, question) => {
    questions.set(id, {...questions.get(id), question})
    setQuestions(new Map(questions))
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
    const lastKey = Array.from(questions.keys()).pop()+1
    questions.set(lastKey || 1, {type:'text', required:false})
    setQuestions(new Map(questions))
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