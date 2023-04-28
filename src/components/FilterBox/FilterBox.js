import { Component } from 'react'
import Card from '../Card/Card'
import Button from '../Button/Button'
import { sortMode, sortPriority } from '../../constants'

export default class FilterBox extends Component {
  render() {
    const {sortConfig, toggleFilterOn, handleChangeView, setPriority} = this.props
    return (
      <Card title='Additional Filters' className='flex-col justify-center'>
        <div className='text-center'>
          <label>Filters On/Off:
            <Button onClick={toggleFilterOn}>{!sortConfig.extraFilter ? sortMode.NONE : sortMode.ON}</Button>
          </label>
        </div>
        { sortConfig.extraFilter &&
          <>
            <div className='border-t-2 border-slate-100'>
              <label>Filter by:
                {
                  Object.keys(sortMode).map(mode => <Button key={mode} reverse={sortMode[mode] === this.props.sortMode ? true : false} className='focus:bg-white focus:text-slate-600' onClick={() => handleChangeView(sortMode[mode])} autoFocus={sortMode[mode] === sortMode.PINNED_FIRST ? true : false}>{sortMode[mode]}</Button>)
                }
                </label>
            </div>
            <div className='border-t-2 border-slate-100'>
              <label>Set Priority:
                {
                  Object.keys(sortPriority).map(priority => <Button key={priority} reverse={sortPriority[priority] === sortConfig.priority ? true : false} className='focus:bg-white focus:text-slate-600' onClick={() => setPriority(sortPriority[priority])} autoFocus={sortPriority[priority] === sortPriority.NONE ? true : false}>{sortPriority[priority]}</Button>)
                }
              </label>
            </div>
          </>
        }
      </Card>
    )
  }
}
