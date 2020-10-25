
import { createSlice, createSelector } from '@reduxjs/toolkit'

export const modalOpenedByName = (name: string) => (state: any) => state.modal.opened.includes(name)

export const modalPropsByName = (name: string) => createSelector(
  modalOpenedByName(name),
  state => state.modal.props,
  (opened: boolean, props) => {
    return opened ? props[name] : undefined
  }
)

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    opened: [],
    props: {}
  },
  reducers: {
    toggleModal(state, action) {
      const { on, name, props } = action.payload
      if (on) {
        // @ts-ignore
        state.opened.push(name)
        // @ts-ignore
        state.props[name] = props
        // @ts-ignore
        document.getElementById('modals').style.display = 'flex'
      } else {
        // @ts-ignore
        const idx = state.opened.indexOf(name)
        state.opened.splice(idx, 1)
        // @ts-ignore
        delete state.props[name]

        for (let props of Object.values(state.opened)) {
          if (Boolean(props)) {
            return
          }
        }
        // @ts-ignore
        document.getElementById('modals').style.display = 'none'
      }
    }
  }
})

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
