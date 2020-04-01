import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  selectorStyle: {
    display:'flex',
    flexDirection:'row'
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  }
})

export default ({bringBackState}) => {

  const { addButton } = useStyle();

  const [selectors, setSelectors] = React.useState([{id:1, value:'' } ]);

  const addSelector = () => {
    const selectorsTable = [...selectors]
    const id = selectors.length === 0 ? 1 : selectors.pop().id + 1
    setSelectors([...selectorsTable, {id ,value:''}])
  }

  const updateSelector = (selectorToUpdate, clicked) => {
    const findedSelectorsIndex = selectors.findIndex((selector) => selector.id === selectorToUpdate.id);
    const selectorsToUpdate = [ ...selectors ];
		selectorsToUpdate.splice(findedSelectorsIndex, 1, selectorToUpdate);
    setSelectors(selectorsToUpdate);
  }

  const deleteSelector = (selectorIdToDelete) => {
    const copiedSelectors = [ ...selectors ];
		const selectorID = copiedSelectors.findIndex(({ id }) => id === selectorIdToDelete);
		copiedSelectors.splice(selectorID, 1);
		setSelectors(copiedSelectors);
  }

  React.useEffect(() => {
    bringBackState({selectors})
  }, [selectors])

  return (
    <div>
      {selectors.map(({ id, value }) => {
        return (
            <Selector
              key={`selector-${id}`}
              id={id}
              value={value}
              updateSelector={updateSelector}
              deleteSelector={deleteSelector}
            />
        )
      })}
      <div className={addButton}>
        <Button onClick={addSelector} children="Ajouter un selector" />
      </div>
    </div>
  )
}

const Selector = ({ id, value, updateSelector, deleteSelector }) => {

  const { selectorStyle } = useStyle();

  const handleTextFieldChange = ({target}) => {
    const { value } = target;
    updateSelector({id, value})
  }

  return (
    <div className={selectorStyle}>
        <TextField label="Label" value={value} onChange={handleTextFieldChange} />
      <IconButton onClick={() => deleteSelector(id)} children={<DeleteForever/>} />
    </div>
  )
}