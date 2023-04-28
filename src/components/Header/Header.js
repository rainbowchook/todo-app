import { Component } from 'react'

export default class Header extends Component {
  render() {
    const {user, handleInputChange} = this.props
    return (
      <div className='mx-auto max-w-lg'>
          <h2 className='overflow-auto mt-20 font-specialelite text-7xl font-bold text-center'>{user.length ? `${user}'s` : 'My'}</h2>
          <h2 className='font-specialelite text-7xl font-bold text-center'>To-Do List</h2>
          <div className='flex flex-row justify-center my-5'>
            <label className='text-xs mr-2' htmlFor='user'>Username:</label>
            <input className='outline-0 border-1 border-slate-400' maxLength={10} id="user" name="user" type="text" onChange={(e) => handleInputChange(e, 'user')} placeholder="Enter username here" value={user}></input>
          </div>
        </div>
    )
  }
}
