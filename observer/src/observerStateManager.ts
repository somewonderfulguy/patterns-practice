import { useEffect, useState } from 'react'

import observerFunction from './observerFunction'

const observerStateManager = <TDataType>(
  initValue: TDataType
): (() => [TDataType, (newValue: TDataType) => void]) => {
  const subscriber = observerFunction<TDataType>()

  return () => {
    const [value, setValue] = useState(initValue)

    useEffect(() => subscriber.subscribe(setValue), [value])

    return [value, (newValue) => subscriber.publish(newValue)]
  }
}

export default observerStateManager
