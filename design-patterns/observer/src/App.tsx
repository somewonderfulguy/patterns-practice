import observerStateManager from './observerStateManager'

// use context pattern, for instance, if needed to share between components that are far from each other
const useSharedCount = observerStateManager(0)

function DisplayValue() {
  const [count] = useSharedCount()
  return (
    <div>
      Current count value: <code>{count}</code>
    </div>
  )
}

function ResetComponent() {
  const [, setCount] = useSharedCount()
  return (
    <button type="button" onClick={() => setCount(0)}>
      Reset to 0
    </button>
  )
}

function App() {
  const [count, setCount] = useSharedCount()

  return (
    <>
      <h1>Observer pattern</h1>
      <p>Description</p>

      <DisplayValue />

      <br />

      <div>
        <button
          type="button"
          onClick={() => {
            setCount(count + 1)
          }}
        >
          Count + 1
        </button>
      </div>

      <br />

      <ResetComponent />
    </>
  )
}

export default App
