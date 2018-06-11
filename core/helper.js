// These are helper functions to make life easier.

// creates a reducer from an initial state and a handler function.
export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) =>
    handlers(state)[action.type]
      ? handlers(state)[action.type](action.payload)
      : state
}

// creates an action that return object with type
export const createAction = type => {
  return payload => (payload ? {type, payload} : {type})
}

// creates an action type with namespace
export const createActionType = namespace => action => `${namespace}/${action}`

// Remove Item from array
export const remove = (index, data) => index === 0 ? data.slice(1) : [
  ...data.slice(0, index),
  ...data.slice(index + 1, data.length)
]

// date & time format
export const datetimeFormat = timestamp => {
  let diff = (Date.now() - timestamp) / 1000
  let j = 0
  let ending = ''
  const periods = ['sec', 'min', 'hour', 'day', 'week', 'month', 'year', 'decade']
  const lengths = ['60', '60', '24', '7', '4.35', '12', '10']

  if (diff > 0) {
    ending ='ago'
  } else {
    diff *= -1
    ending = "to go"
  }
  for (j = 0; diff >= lengths[j]; j++) diff /= lengths[j]
  diff = Math.round(diff)
  if (diff != 1) periods[j] += 's'
  return `${diff} ${periods[j]} ${ending}`
}
