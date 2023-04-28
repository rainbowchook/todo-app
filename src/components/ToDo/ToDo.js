import { Component } from 'react'
import Button from '../Button/Button'
import CheckBox from '../CheckBox/CheckBox'

export default class ToDo extends Component {
  state = {
    edit: false,
    content: '',
  }

  componentDidMount() {
    this.setState({content: this.props.todo.content})
  }

  handleChange = (e) => {
    this.setState({content: e.target.value})
  }

  toggleEdit = () => {
    this.setState({content: this.props.todo.content, edit: !this.state.edit})
  }
  editToDo = () => {
    const {id, user, urgent} = this.props.todo
    const todoEdit = {
      id,
      user,
      content: this.state.content,
      urgent,
    }
    this.props.updateToDo(todoEdit)
    this.setState({edit: !this.state.edit})
  }
  removeToDo = () => {
    this.props.removeToDo(this.props.todo.id)
  }
  render() {
    const {id, user, content, urgent, completed} = this.props.todo

    return (
    <div className='bg-white hover:shadow-xl rounded-lg w-4/5 p-2'>
        <p className='text-xs'>id: {id.substring(0, 5)}... user: {user}</p>
        <div className='flex flex-row justify-between'>
          <CheckBox className={urgent ? 'bg-red-600' : 'bg-amber-600'} checked={urgent} onChange={() => this.props.toggleUrgent(id)} label={urgent ? 'Urgent' : 'Non-Urgent'}/>
          <CheckBox className={completed ? 'bg-green-600' : 'bg-sky-600'} checked={completed} onChange={() => this.props.toggleCompleted(id)} label={completed ? 'Completed' : 'Scheduled'}/>
        </div>
        <p className={`text-wrap truncate ${completed? 'line-through' : 'no-underline'}`}>{content}</p>
        <Button onClick={this.removeToDo}>Delete ToDo</Button>
        <Button onClick={this.toggleEdit}>Edit ToDo</Button>
        {
          this.state.edit &&
            <div>
              <div className='w-auto' >
                <textarea className='bg-slate-100 w-5/6 h-20 mx-5 my-2' onChange={e => this.handleChange(e)} value={this.state.content}/>
              </div>
              <div>
                <Button onClick={this.editToDo}>Save Edits & Close</Button>
                <Button onClick={this.toggleEdit}>Close without Saving</Button>
              </div>
            </div>
        }
      </div>
    )
  }
}
