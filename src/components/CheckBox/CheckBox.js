import { Component } from 'react'

export default class CheckBox extends Component {
  render() {
    const {checked, onChange, label, className} = this.props
    return (
      <div>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <label className={`py-1 px-2 mx-2 font-bold text-sm text-white rounded-lg ${className}`}>{label}</label>
      </div>

    )
  }
}
