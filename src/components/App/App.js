import { useEffect, useState } from 'react'
import ToDoList from '../ToDoList/ToDoList'
function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
//fetch from public folder
  const url = './data/todos.json'

  /***Promise***/
  // useEffect(() => {
  //   const fetchData = async () => {
  //     fetch(url, {mode: "no-cors"})
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json()
  //         } else {
  //           throw new Error('Error fetching data')
  //         }})
  //       .then(data => {
  //         setData(data)
  //         setIsLoading(false)
  //       })
  //       .catch(error => {
  //         setIsLoading(false)
  //         throw new Error('Error: Unable to fetch data')
  //       })
  //   }
  //   fetchData()
  //   console.log('data', data)
  //   // return () => {console.log('Unsubscribe from listeners/handlers here')}
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setData(data)
          setIsLoading(false)
        } else {
          throw new Error('Unable to fetch data') // for HTTP 404 errors
        }
      } catch (e) {
        setError(error) // for Network-related errors AND new Errors thrown from the try block ie HTTP 404
        setIsLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    error ? <p>{error.message}</p> : (
      isLoading ? <h1>Loading ...</h1> :
      <div className='md:container mx-auto flex flex-col items-center w-600 bg-gradient-to-b from-sky-200 to-sky-700'>
        <ToDoList todos={data}/>
      </div>
    )
  );
}

export default App;
