import ToDoList from '../ToDoList/ToDoList'
import {todos} from '../../data/todos'

function App() {
  return (
    <div className='md:container mx-auto flex flex-col items-center w-800 bg-gradient-to-b from-sky-200 to-sky-700'>
      <ToDoList todos={todos}/>
    </div>
  );
}

export default App;
