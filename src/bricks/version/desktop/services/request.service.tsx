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
          const response = await fetch('http://85.193.88.125:3000' + urlstring, {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" }, 
            body: JSON.stringify(body)
          }).then(res => res.json())

          false && console.log(response)
          callbackAction(response)

          break

        case 'POSTFILE_TTDF':

          var formdata = new FormData()
          formdata.append("taskTechDocsId", body[0])
          formdata.append("taskTechDocsFile", body[1])

          var requestOptions: any = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          }

          fetch("http://85.193.88.125:3000/add-file-techtask", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))

          callbackAction('')

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