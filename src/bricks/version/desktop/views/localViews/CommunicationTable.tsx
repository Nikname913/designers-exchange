// ----------------------------------------------------------------
/* eslint-disable react/jsx-no-target-blank */
// ----------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { CSSProperties } from 'styled-components'
import { ICommunicationTableProps } from '../../../../models-ts/views/commun-table-models'
import ButtonComponent from '../../comps/button/Button'
import RequestActionsComponent from '../../services/request.service'
import css from '../../styles/views/communicationTable.css'
import EmailIcon from '@mui/icons-material/Email'

import doc from '../../../../img/icons/files/base/doc.svg'
import pdf from '../../../../img/icons/files/base/pdf.svg'
import subs from '../../../../img/icons/chatActions/subscribe.svg'
import humm from '../../../../img/icons/chatActions/hummer.svg'
import supp from '../../../../img/icons/chatActions/support.svg'
import blank from '../../../../img/icons/chatActions/blank.svg'
import petard from '../../../../img/icons/chatActions/petard.svg'
import cross from '../../../../img/icons/chatActions/cross.svg'
import succ from '../../../../img/icons/chatActions/success.svg'
import prorf from '../../../../img/icons/chatActions/preOrderFill.svg'
import pror from '../../../../img/icons/chatActions/preOrder.svg'
import rub from '../../../../img/icons/chatActions/rubble.svg'

import waitIcon from '../../../../img/icons/wait.svg'
import correctIcon from '../../../../img/icons/correct.svg'
import semiMenuIcon from '../../../../img/icons/semiMenu.svg'

const { Container, 
  RoundContainer, 
  RoundContainerInner, 
  SmallRound,
  ContentArea,
  Message } = css

const CommunicationTable: React.FC<ICommunicationTableProps> = (props: ICommunicationTableProps) => {
  
  const { content, status, oneButtonParams, twoButtonParams, threeButtonParams, image, imageMt, mb } = props

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const ordersList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)

  const [ ACCEPT_REQUEST, SET_ACCEPT_REQUEST ] = useState(false)

  const [ completeFileServer, setCompleteFileServer ] = useState<{ name: string, size: number, text: string }>({

    name: '',
    size: 0,
    text: ''

  })

  const background = useAppSelector(state => state.theme.blue4)
  const dateColor = useAppSelector(state => state.theme.grey)
  const buttonBackground1 = useAppSelector(state => state.theme.blue2)
  const whiteColor = useAppSelector(state => state.theme.white)

  const mainIconCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '65%',
    marginTop: imageMt ? imageMt : '-7px'
  }
  const dateSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    color: dateColor,
    fontSize: '12px',
    marginTop: '16px',
    marginBottom: '5px',
  }
  const semiMenuCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    left: '100%',
    top: '0%',
    marginLeft: '-34px',
    marginTop: '18px',
    cursor: 'pointer',
  }
  const buttonsLineCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
  }

  const imageSelect = (param: string) => {

    switch (param) {
      case 'doc':
        return doc
      case 'pdf':
        return pdf
      case 'subs':
        return subs
      case 'humm':
        return humm
      case 'supp':
        return supp
      case 'blank':
        return blank
      case 'petard':
        return petard
      case 'cross':
        return cross
      case 'succ':
        return succ
      case 'prorf':
        return prorf
      case 'pror':
        return pror
      case 'rub':
        return rub
      default:
        return doc
    }

  }

  const acceptRespond = () => {

    SET_ACCEPT_REQUEST(true)

  }

  useEffect(() => {

    ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fileNameExecutor: string = selectTask + '.complete.txt'

      const raw = JSON.stringify({
        "fileName": fileNameExecutor
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://localhost:3000/send-file-complete", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      console.log({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

      downloadFileText.indexOf('no such file or directory') < 0 && setCompleteFileServer({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

      // ----------------------------------------------------------------
      // ----------------------------------------------------------------

      const fileNameExecutorPDF: string = selectTask + '.complete.pdf'

      const rawPDF = JSON.stringify({
        "fileName": fileNameExecutorPDF
      });

      var requestOptionsPDF: any = {
        method: 'POST',
        headers: myHeaders,
        body: rawPDF,
        redirect: 'follow'
      };

      const downloadFilePDF = await fetch("http://localhost:3000/send-file-complete", requestOptionsPDF)
        .then(response => response.blob())

      const downloadFileTextPDF: string = await downloadFilePDF.text()
      const downloadFileSizePDF: number = await downloadFilePDF.size

      console.log({
        name: fileNameExecutorPDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF
      })

      downloadFileTextPDF.indexOf('no such file or directory') < 0 && setCompleteFileServer({
        name: fileNameExecutorPDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF
      })

    })()

  }, [ ordersList, selectTask ])

  return (
    <React.Fragment>

      { ACCEPT_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/order-complete',
          body: {
            taskID: selectTask,
          }
        }}
      
      /> }

      <Container background={background} style={ mb ? { marginBottom: mb } : {} }>
        <RoundContainer>
          <RoundContainerInner>
            <img
              alt={""}
              src={imageSelect(image)}
              style={ image === 'pror' ?  { ...mainIconCSS, width: '98%' } : mainIconCSS}
            />
          </RoundContainerInner>
          <SmallRound>{
            
            status === 'wait' ?
            <img alt={""} src={waitIcon} style={{ width: '100%' }}/> :
            status === 'correct' ?
            <img alt={""} src={correctIcon} style={{ width: '100%' }}/> :
            status === 'alarm' ?
            <img alt={""} src={correctIcon} style={{ width: '100%' }}/> : <React.Fragment></React.Fragment>

          }</SmallRound>
        </RoundContainer>
        <ContentArea>
          <img
            alt={""}
            src={semiMenuIcon}
            style={semiMenuCSS}
          />
          <span style={dateSpanCSS}>Данные о времени не получены</span>
          <Message style={{ marginTop: '0px' }}>

            { content 
              
              ? <span style={{ width: '100%', display: 'block' }}>{ content }</span> 
              : <span>{"Контентная заглушка для блока уведомления в общении"}</span>  
              
            }

          </Message>
          <div style={buttonsLineCSS}>
            { oneButtonParams?.isset && <ButtonComponent
              inner={oneButtonParams?.inner} 
              type="CONTAINED_DEFAULT"
              action={ oneButtonParams.inner === 'Принять' ? acceptRespond : () => {} }
              actionData={null}
              widthType={"px"}
              widthValue={oneButtonParams?.width}
              children={""}
              childrenCss={{}}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: 
                  oneButtonParams?.background === 'blue2' ? buttonBackground1 : buttonBackground1,
                color: 
                  oneButtonParams?.color === 'white' ? whiteColor : 'inherit',
                fontSize: '12px',
                height: '40px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginRight: '16px'
              }}
            /> }
            { twoButtonParams?.isset && <ButtonComponent
              inner={twoButtonParams?.inner} 
              type="CONTAINED_DEFAULT"
              action={() => {}}
              actionData={null}
              widthType={"px"}
              widthValue={twoButtonParams?.width}
              children={""}
              childrenCss={{}}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: twoButtonParams?.background === 'white' ? whiteColor : whiteColor,
                color: twoButtonParams?.color === 'grey' ? dateColor : 'inherit',
                fontSize: '12px',
                height: '40px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '0px',
                marginRight: '16px'
              }}
            /> }
            { threeButtonParams?.isset && threeButtonParams.inner === 'SAVE_COMPLETE' && <a 
            
                href={`http://localhost:3000/techComplete/${completeFileServer.name}`}
                target='_blank'
                style={{
                  display: 'block',
                  position: 'relative',
                  marginLeft: '10px',
                  color: 'rgb(22, 124, 191)',
                  textDecoration: 'none'
                }}
              >Сохранить файл</a> 
              
            } 
          </div>
        </ContentArea>
      </Container>
    </React.Fragment>
  )
}

export default CommunicationTable