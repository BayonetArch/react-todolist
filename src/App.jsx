import { useState } from "react"
import "./App.css"
import check_svg from "./assets/check.svg"

function App() {
  const [todoList, setTodoList] = useState([])
  const [inputValue, setInputValue] = useState("")

  function addItem(newItem) {
    setTodoList((prev) => {
      const newList = [...prev, newItem]
      return newList
    })
  }

  function removeItem(id) {
    setTodoList((prev) => {
      const newItem = prev.filter((item) => item.id != id)
      return newItem
    })
  }

  function toggleDone(id) {
    if (todoList === undefined || todoList === null) return

    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function clearCompleted() {
    setTodoList((prev) => prev.filter((item) => !item.done))
  }

  function completeAll() {
    setTodoList((prev) => prev.map((item) => ({ ...item, done: true })))
  }

  function uncheckAll() {
    setTodoList((prev) => prev.map((item) => ({ ...item, done: false })))
  }

  return (
    <div className="todo-app-wrapper">
      <div className="todo-app">
        <h1 className="app-header">TODO</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (inputValue.length > 0) {
              const item = {
                id: Date.now(),
                text: inputValue,
                done: false,
              }
              addItem(item)
              setInputValue("")
            }
          }}>
          <input
            type="text"
            placeholder="add a todo...."
            value={inputValue}
            autoFocus
            onInput={(e) => {
              setInputValue(e.target.value)
            }}
          />
        </form>

        <div></div>
        <ul className="todo-list">
          {todoList.map((item) => (
            <div className="list-row" key={item.id}>
              <div
                className={item.done ? "box done" : "box"}
                onClick={() => toggleDone(item.id)}>
                {item.done && (
                  <img className="check-icon" src={check_svg} alt="Checked" />
                )}
              </div>

              <li
                key={item.id}
                className={item.done ? "item-list done" : "item-list"}>
                {item.text}
              </li>
              <button
                className="remove-item"
                onClick={() => removeItem(item.id)}
                aria-label="Remove item">
                ×
              </button>
            </div>
          ))}
        </ul>
        <div className="commands">
          <button className="clear-completed" onClick={() => clearCompleted()}>
            Clear Completed
          </button>
          <button className="clear-all" onClick={() => setTodoList([])}>
            Clear All
          </button>
          <button className="complete-all" onClick={() => completeAll()}>
            Check All
          </button>
          <button className="uncheck-all" onClick={() => uncheckAll()}>
            Uncheck All
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
