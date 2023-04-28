import { Component } from 'react'

export default class Button extends Component {
  render() {
    const {type, name, id, onClick, onSubmit, autoFocus, className, reverse, children} = this.props
    return (
      <button
        type={type}
        name={name}
        id={id}
        onClick={onClick}
        onSubmit={onSubmit}
        autoFocus={autoFocus? true : false}
        className={`border-slate-600 border-2 hover:shadow-xl ${reverse ? 'bg-white text-slate-600' : 'bg-slate-600 text-white'} cursor-pointer outline-0 border-0 rounded-lg p-2 m-2 ${className}`}
      >
        {children}
      </button>
    )
  }
}
