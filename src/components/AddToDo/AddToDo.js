import { Component } from 'react'
import Button from '../Button/Button'
import TextArea from '../TextArea/TextArea'
import CheckBox from '../CheckBox/CheckBox'
import Card from '../Card/Card'

export default class AddToDo extends Component {
  render() {
    const {urgent, toggleUrgentStatus, todoContent, handleInputChange, addToDo, clearToDoText} = this.props
    return (
      <Card title="Add New ToDo" className='flex-col items-stretch'>
        <CheckBox className={urgent ? 'bg-red-600' : 'bg-amber-600'} checked={urgent} onChange={toggleUrgentStatus} label={urgent ? 'Urgent' : 'Non-Urgent'}/>
        <div className='flex flex-col flex-grow mt-2 ml-2'>
          <label className='text-xs' htmlFor='content'>Content:</label>
          <TextArea id="content" name="content" value={todoContent} onChange={e => handleInputChange(e, 'content')} type="text" placeholder='Enter new todo here'/>
        </div>
        <div className='flex flex-row justify-center'>
          <Button onClick={() => addToDo('first')}>Add to Top</Button>
          <Button onClick={() => addToDo('last')}>Add to Bottom</Button>
          <Button onClick={clearToDoText}>Clear Text</Button>
        </div>
      </Card>
    )
  }
}
