/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { IRequest } from '../../../models-ts/services/request-models'

const RequestActionsComponent: React.FC<IRequest> = (props: IRequest) => {

  const { callbackAction, requestData: { type, urlstring, body }} = props

  useEffect(() => {

    async function fetchRequest() {

      const requestType = type

      switch(requestType) {
  
        case 'GET':
          break
  
        case 'POST':
          const response = await fetch(urlstring, {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" }, 
            body: JSON.stringify(body)
          }).then(res => res.json())

          false && console.log(response)
          callbackAction(response)

          break

        case 'POSTFILE_TTDF':

          const formData = new FormData()
          formData.append('taskID', body[0])
          formData.append('taskTechDocsFile', body[1])

          let options: {
            method: string,
            headers?: any,
            body: any
          } = {
            method: 'POST',
            body: formData,
          }

          false && delete options.headers['Content-Type']

          const responseFile = await fetch(urlstring, options)
           .then(res => res.json())

          false && console.log(responseFile)
          callbackAction(responseFile)

          break
          
        default:
          break
  
      }

    }

    true && fetchRequest()

  },[])

  return <span style={{ display: 'none' }}/>

}

export default RequestActionsComponent