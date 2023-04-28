import { Component } from 'react'
import ToDo from '../ToDo/ToDo'
import Button from '../Button/Button'
import AddToDo from '../AddToDo/AddToDo'
import SearchBox from '../SearchBox/SearchBox'
import Header from '../Header/Header'
import RemoveBar from '../RemoveBar/RemoveBar'
import FilterBox from '../FilterBox/FilterBox'
import { viewMode, sortMode, sortPriority } from '../../constants'
import {v4 as uuidv4} from 'uuid'

export default class ToDoList extends Component {
  state = {
    todoList: [],
    user: '',
    todoContent: '',
    urgent: false,
    viewMode: viewMode.ADD,
    searchField: '',
    sortMode: sortMode.PINNED_FIRST,
    sortConfig: {
      extraFilter: false,
      priority: sortPriority.NONE,
    },
  }

  componentDidMount() {
    this.setState({todoList: this.props.todos})
    this.initialTitle = document.title
    document.title = `${this.state.user ? `${this.state.user}'s` : 'My'} ToDos`
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.user !== this.state.user)
      document.title = `${this.state.user ? `${this.state.user}'s` : 'My'} ToDos`
  }

  handleInputChange = (e, statusToUpdate) => {
    const limit = 10
    switch (statusToUpdate) {
      case 'user':
        if(this.state.user.length >= limit) {
          this.setState({user: e.target.value.slice(0, limit)})
        } else {
          this.setState({user: e.target.value})
        }
        break;
      case 'content':
        this.setState({todoContent: e.target.value})
        break;
      default:
        break;
    }
  }

  handleSearch = (e) => {
    console.log(e.target.value)
    this.setState({searchField: e.target.value})
  }

  toggleUrgentStatus = () => {
    this.setState({urgent: !this.state.urgent})
  }

  setViewMode = (viewMode) => {
    this.setState({viewMode})
  }

  addToDo = (position, ...args) => {
    const {user, todoContent, urgent} = this.state
    if(this.state.user === '') return alert('Cannot add todo without a user')
    if(this.state.todoContent === '') return alert('Cannot add empty todo')
    const todoListTemp = [...this.state.todoList]
    const newTodo  = {
      // id: todoListTemp.length + 1,
      id: uuidv4(),
      user,
      content: todoContent,
      urgent,
      completed: false,
    }
    const newContent = newTodo
    if(!todoListTemp.length) {
      todoListTemp.push(newContent)
    } else if(position === 'first') {
      todoListTemp.unshift(newContent)
    } else if(position === 'last') {
      todoListTemp.push(newContent)
    } else {
      todoListTemp.splice(position, 0, newContent)
    }
    this.setState({todoList: todoListTemp, todoContent: '', urgent: false, sortMode: sortMode.NONE, completed: false})
  }

  updateToDo = (todoEdit) => {
    const todoListNew = [...this.state.todoList].map(todo => (todo.id === todoEdit.id ? {...todo, ...todoEdit} : todo))
    this.setState({todoList: todoListNew})
  }

  //position can be first, last or by id (for when using ToDo objects)
  //KIV update:add another fn removeToDos (multiple) that accepts an array of ToDos to remove and filters it out
  removeToDo = (position) => {
    let todoListTemp = [...this.state.todoList]
    if(position === 'first') {
      todoListTemp.shift();
    } else if (position === 'last') {
      todoListTemp.pop()
    } else {
      // todoListTemp.splice(position, 1) //don't mutate; return new array
      todoListTemp = this.state.todoList.filter(todo => todo.id !== position)
    }
    this.setState({todoList: todoListTemp})
  }

  resetToDos = () => {
    this.setState({todoList: this.props.todos})
  }

  clearToDoText = () => {
    this.setState({todoContent: ''})
  }

  toggleUrgent = (id) => {
    const todoListTemp = [...this.state.todoList]
    const todoUrgentList = todoListTemp.map(todo => (todo.id === id ? {...todo, urgent: !todo.urgent} : todo))
    this.setState({todoList: todoUrgentList})
  }

  toggleCompleted = (id) => {
    const todoListTemp = [...this.state.todoList]
    const todoCompletedList = todoListTemp.map(todo => (todo.id === id) ? {...todo, completed: !todo.completed} : todo)
    this.setState({todoList: todoCompletedList})
  }

  handleChangeView = (sortMode) => {
    this.setState({sortMode})
    this.filterList()
  }

  toggleFilterOn = () => {
    const {extraFilter} = this.state.sortConfig
    this.setState({sortConfig: {...this.state.sortConfig, extraFilter: !extraFilter}})
  }

  setPriority = (newPriority) => {
    this.setState({sortConfig: {...this.state.sortConfig, priority: newPriority}})
  }

  //comparator must be a pure function with no side effects
  compareFn = (a,b) => {
      if(a > b) return -1
      if(a < b) return 1
      return 0
  }

  sortByPriority = (list) => {
    const {priority} = this.state.sortConfig
    if(priority === sortPriority.NONE) return list
    return list.sort((a,b) => this.compareFn(a[priority.toLowerCase()],b[priority.toLowerCase()]))
  }

  filterListBySearch = (list) => {
    return list.filter(todo => todo.content.toLowerCase().includes(this.state.searchField.toLowerCase()))
  }

  filterList = () => {
    const list = [...this.state.todoList]
    const unorderedList = this.filterListBySearch(list)
    if(!this.state.sortConfig.extraFilter) return unorderedList
    const sortedList = this.sortByPriority(unorderedList)
    const urgentList = this.sortByPriority(unorderedList.filter(todo => todo.urgent === true))
    const nonUrgentList = this.sortByPriority(unorderedList.filter(todo => todo.urgent === false))
    const urgentFirstList = [...urgentList, ...nonUrgentList]
    const completedList = this.sortByPriority(unorderedList.filter(todo => todo.completed === true))
    const nonCompletedList = this.sortByPriority(unorderedList.filter(todo => todo.completed === false))
    const completedFirstList = [...completedList, ...nonCompletedList]

    const filteredList = {
      unordered: unorderedList,
      sorted: sortedList,
      urgentOnly: urgentList,
      nonUrgent: nonUrgentList,
      urgentFirst: urgentFirstList,
      completedOnly: completedList,
      nonCompleted: nonCompletedList,
      completedFirst: completedFirstList,
    }

    switch (this.state.sortMode) {
      case sortMode.NONE:
        return filteredList.unordered
      case sortMode.ON:
        return filteredList.sorted
      case sortMode.PINNED_FIRST:
        return filteredList.urgentFirst
      case sortMode.PINNED_ONLY:
        return filteredList.urgentOnly
      case sortMode.NOT_PINNED:
        return filteredList.nonUrgent
      case sortMode.COMPLETED_FIRST:
        return filteredList.completedFirst
      case sortMode.COMPLETED_ONLY:
        return filteredList.completedOnly
      case sortMode.NOT_COMPLETED:
        return filteredList.nonCompleted
      default:
        return filteredList.urgentFirst
    }
  }

  render() {
    const finalFilteredList = this.filterList()
    return (this.state.todoList.length === 0) ? <p>Loading...</p>
    : (
      <div className='bg-inherit flex flex-col justify-items-center justify-center'>
        <Header user={this.state.user} handleInputChange={this.handleInputChange} />
        <>
          {
            Object.keys(viewMode).map(mode => <Button key={mode} className='mb-0 focus:bg-white focus:text-slate-600' reverse={viewMode[mode] === this.state.viewMode ? true : false} onClick={() => this.setViewMode(viewMode[mode])}>{viewMode[mode]}</Button>)
          }
        </>
        {
          this.state.viewMode === viewMode.ADD
            ? <AddToDo urgent={this.state.urgent} todoContent={this.state.todoContent} handleInputChange={this.handleInputChange} addToDo={this.addToDo} clearToDoText={this.clearToDoText} toggleUrgentStatus={this.toggleUrgentStatus}/>
            : (
              this.state.viewMode === viewMode.FILTER
                ? (
                  <>
                    <SearchBox handleSearch={(e) => this.handleSearch(e)} searchField={this.state.searchField}/>
                    <FilterBox sortConfig={this.state.sortConfig} sortMode={this.state.sortMode} toggleFilterOn={this.toggleFilterOn} handleChangeView={this.handleChangeView} setPriority={this.setPriority} />
                  </>
                ) : (
                  this.state.viewMode === viewMode.REMOVE
                    ? <RemoveBar removeToDo={this.removeToDo} resetToDos={this.resetToDos} />
                    : <AddToDo urgent={this.state.urgent} todoContent={this.state.todoContent} handleInputChange={this.handleInputChange} addToDo={this.addToDo} clearToDoText={this.clearToDoText} toggleUrgentStatus={this.toggleUrgentStatus}/>
                )
            )
        }
        <div className='grid grid-col grid-cols-1 gap-5 place-items-center my-5 max-h-min min-w-fit overflow-y-scroll'>
          {
            finalFilteredList.map((todo, i) => <ToDo key={i} todo={todo} updateToDo={this.updateToDo} toggleUrgent={this.toggleUrgent} toggleCompleted={this.toggleCompleted} removeToDo={this.removeToDo} toggleUrgentStatus={this.toggleUrgentStatus} />)
          }
        </div>


      </div>
    )
  }
}
