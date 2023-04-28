import { Component } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'

export default class RemoveBar extends Component {
  render() {
    const {removeToDo, resetToDos} = this.props
    return (
      <Card title='Remove/Reset Options' className='flex-col justify-center'>
        <div className='flex flex-row justify-center'>
          <Button onClick={() => removeToDo('first')}>Remove First</Button>
          <Button onClick={() => removeToDo('last')}>Remove Last</Button>
          <Button onClick={resetToDos}>Reset</Button>
        </div>
      </Card>
    )
  }
}
