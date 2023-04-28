import { Component} from 'react'
import ToDoList from '../ToDoList/ToDoList'
class App extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  }
  URL = './data/todos.json'

  componentDidMount() {
    this.setState({isLoading: true})
    const fetchData = async () => {
      try {
        const response = await fetch(URL)
        if (response.ok) {
          const data = await response.json()
          this.setState({data, setIsLoading: false})
        } else {
          throw new Error('Unable to fetch data') // for HTTP 404 errors
        }
      } catch (error) {
        this.setState({error, isLoading: false})// for Network-related errors AND new Errors thrown from the try block ie HTTP 404
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  render() {
    const {data, isLoading, error} = this.state
    return (
      error ? <p>{error.message}</p> : (
        isLoading ? <h1>Loading ...</h1> :
        <div className='md:container mx-auto flex flex-col items-center w-800 bg-gradient-to-b from-sky-200 to-sky-700'>
          {/* <ToDoList todos={todos}/> */}
          <ToDoList todos={data}/>
        </div>
      )
    )
  }

}

export default App;
