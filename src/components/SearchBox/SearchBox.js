import { Component } from 'react'
import Card from '../Card/Card'

export default class SearchBox extends Component {
  render() {
    const {handleSearch, searchField} = this.props
    return (
      <Card title='Search Options' className='flex-col justify-center'>
        <label className='text-xs align-middle mt-2 mr-2 text-center'>Search for:
          <input className='outline-0 border-1 border-slate-400' id="search" name="search" type="search" onChange={(e) => handleSearch(e)} placeholder="Enter search string" value={searchField}/>
        </label>
      </Card>
    )
  }
}
