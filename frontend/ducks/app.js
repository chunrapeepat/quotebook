import Router from 'next/router'

import {createReducer, Creator} from './helper'

export const NEXT_STEP = 'NEXT_STEP'
export const PREV_STEP = 'PREV_STEP'
export const TOGGLE_STICKER = 'TOGGLE_STICKER'

export const next = Creator(NEXT_STEP)
export const prev = Creator(PREV_STEP)
export const toggleSticker = Creator(TOGGLE_STICKER)

const initial = {
  step: 0,
  stickers: {}
}

export default createReducer(initial, state => ({
  [NEXT_STEP]: () => {
    if (state.step === 4) {
      Router.push('/discover')
      return state
    } else if (state.step < 4) {
      return {
        ...state,
        step: state.step + 1
      }
    }

    return state
  },
  [PREV_STEP]: () => {
    if (state.step > 0) return {...state, step: state.step - 1}
    return state
  },
  [TOGGLE_STICKER]: id => {
    const stickers = state.stickers
    stickers[id] = !state.stickers[id]

    return {...state, stickers}
  }
}))
