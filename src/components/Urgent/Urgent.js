import React, { Component } from 'react'

export default class Urgent extends Component {
  render() {
    const {urgent, toggleUrgentStatus} = this.props
    return (
      <div>
        <input type="checkbox" checked={urgent} onChange={toggleUrgentStatus}/>
        <label className={`py-1 px-2 mx-2 font-bold text-sm text-white rounded-lg ${urgent ? 'bg-red-600' : undefined}`}>{urgent ? 'Urgent' : undefined}</label>
      </div>

    )
  }
}
