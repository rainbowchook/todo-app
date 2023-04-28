import ToDoList from '../ToDoList/ToDoList'
import todos from '../../data/todos.json'

function App() {
  const loadedData = JSON.parse(JSON.stringify(todos))

  return (
    !loadedData.length ? <h1>Loading ...</h1> :
    <div className='md:container mx-auto flex flex-col items-center w-800 bg-gradient-to-b from-sky-200 to-sky-700'>
      <ToDoList todos={loadedData}/>
    </div>
  );
}

export default App;
