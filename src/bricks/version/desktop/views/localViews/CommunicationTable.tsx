import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { CSSProperties } from 'styled-components'
import { ICommunicationTableProps } from '../../../../models-ts/views/commun-table-models'
import ButtonComponent from '../../comps/button/Button'
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
import alarmIcon from '../../../../img/icons/alarm.svg'
import semiMenuIcon from '../../../../img/icons/semiMenu.svg'

const { Container, 
  RoundContainer, 
  RoundContainerInner, 
  SmallRound,
  ContentArea,
  Message } = css

const CommunicationTable: React.FC<ICommunicationTableProps> = (props: ICommunicationTableProps) => {
  
  const { status, oneButtonParams, twoButtonParams, image, imageMt, mb } = props

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
    alignContent: 'center',
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

  return (
    <React.Fragment>
      <Container background={background} style={ mb ? { marginBottom: mb } : {} }>
        <RoundContainer>
          <RoundContainerInner>
            <img
              alt={""}
              src={imageSelect(image)}
              style={mainIconCSS}
            />
          </RoundContainerInner>
          <SmallRound>{
            
            status === 'wait' ?
            <img alt={""} src={waitIcon}/> :
            status === 'correct' ?
            <img alt={""} src={correctIcon}/> :
            status === 'alarm' ?
            <img alt={""} src={alarmIcon}/> : <React.Fragment></React.Fragment>

          }</SmallRound>
        </RoundContainer>
        <ContentArea>
          <img
            alt={""}
            src={semiMenuIcon}
            style={semiMenuCSS}
          />
          <span style={dateSpanCSS}>25 января в 12:40</span>
          <Message>
            <i style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Виолетта </i> 
            предлагает 
            <i style={{ fontStyle: 'normal', fontWeight: 'bold' }}> ПланСклада.pdf </i> 
            перенести в мастер документы
          </Message>
          <div style={buttonsLineCSS}>
            { oneButtonParams?.isset && <ButtonComponent
              inner={oneButtonParams?.inner} 
              type="CONTAINED_DEFAULT"
              action={() => {}}
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
                marginRight: '20px'
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
                marginBottom: '0px'
              }}
            /> }
          </div>
        </ContentArea>
      </Container>
    </React.Fragment>
  )
}

export default CommunicationTable