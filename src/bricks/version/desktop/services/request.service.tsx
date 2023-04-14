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

          console.log(response)
          callbackAction(response)

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