import React, { useEffect } from 'react'
import { IRequestComponent } from '../models-ts/comps/reqcom-models'

const RequestActionsComponent: React.FC<IRequestComponent> = (props: IRequestComponent) => {

  const { callbackAction,
    requestData: {
      type = 'GET',
      urlstring = '',
      reqbody = null
    }} = props

  useEffect(() => {

    async function func() {

    const requestType = type
    switch(requestType) {
      
      case 'GET':

        const response = await fetch(urlstring)
        let data = null

        if ( response.status === 200 ) {

          if ( callbackAction === '2000' ) {
            
            data = await fetch(urlstring).then(res => res.text())
            
          } else if ( callbackAction === '3000' ) { } else {

            data = await fetch(urlstring).then(res => res.json())

          }

          callbackAction === 'NON_ACTION' && console.log(data)
          callbackAction === 'NON_ACTION' && console.log(data)
          callbackAction === 'NON_ACTION' && console.log(data)
      
        }

        break

      case 'POST':

        await fetch(urlstring, {
          method: 'POST',
          headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }, 
          body: reqbody
        })

        break

      default:
        break

    }}

    func()

  },[callbackAction, props, reqbody, type, urlstring])

  return <React.Fragment></React.Fragment>

}

export default RequestActionsComponent