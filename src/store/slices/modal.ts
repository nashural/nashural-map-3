import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

import { ModalState, RootState, ToggleModalPayload } from '../typings'

export const modalOpenedByName = (name: string) => (state: RootState): boolean => state.modal.opened.includes(name)

export const modalPropsByName = (name: string) => createSelector(
  modalOpenedByName(name),
  state => state.modal.props,
  (opened: boolean, props) => {
    return opened ? props[name] : undefined
  }
)

const initialState: ModalState = {
  opened: [],
  props: {}
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<ToggleModalPayload>) {
      const { on, name, props } = action.payload
      if (on) {
        state.opened.push(name)
        state.props[name] = props
        ;(document.getElementById('modals') as HTMLElement).style.display = 'flex'
      } else {
        const idx = state.opened.indexOf(name)
        state.opened.splice(idx, 1)
        delete state.props[name]

        for (let props of Object.values(state.opened)) {
          if (Boolean(props)) {
            return
          }
        }
        (document.getElementById('modals') as HTMLElement).style.display = 'none'
      }
    }
  }
})

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
