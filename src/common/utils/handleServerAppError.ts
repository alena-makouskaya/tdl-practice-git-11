
import { Dispatch } from 'redux'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { ResponceType } from '../../api/todolists-api'

 
export const handleServerAppError = <T,>(data: ResponceType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export type BaseResponse<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
  }

  export type FieldError = {
    error: string
    field: string
  }
  
  