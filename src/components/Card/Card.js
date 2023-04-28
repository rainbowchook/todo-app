import { Component } from 'react'

export default class Card extends Component {
  render() {
    const {className, title, children} = this.props
    return (
      <div className={`flex bg-white rounded-lg p-5 mx-10 my-2 ${className}`}>
        <p className='text-xs font-bold'>{title}</p>
        {children}
      </div>
    )
  }
}
