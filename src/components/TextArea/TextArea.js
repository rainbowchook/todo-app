import { Component } from 'react'

export default class TextArea extends Component {
  render() {
    const {id, name, className, onChange, value, type, placeholder} = this.props
    return (
      <textarea id={id} name={name} type={type} className={`bg-slate-100 w-5/6 h-20 mx-5 my-2 ${className}`} onChange={onChange} value={value} placeholder={placeholder}/>
    )
  }
}
