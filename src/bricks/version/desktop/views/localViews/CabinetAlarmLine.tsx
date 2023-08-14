import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { ICabinetAlarmLineProps } from '../../../../models-ts/views/cabinet-alarm-line-models'
import RequestActionsComponent from '../../services/request.service'
import css from '../../styles/views/cabinetAlarmLine.css'
import closeIcon from '../../../../img/icons/close.svg'

const { AlarmContainer } = css

const CabinetAlarmLine: React.FC<ICabinetAlarmLineProps> = (props: ICabinetAlarmLineProps) => {
  
  const { background, buttons, content: { date, text, order, actions }, isNew = false } = props

  const textData = text.split('||')
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  
  const [ REMOVE_ALARM, ] = useState<boolean>(false)
  const [ newDemoIndicator, setNewDemoIndicator ] = useState<boolean>(true)
  const [ newDemoIndicatorOpaity, setNewDemoIndicatorOpacity ] = useState<number>(1)

  const greyColor = useAppSelector(state => state.theme.grey)
  const blueColor2 = useAppSelector(state => state.theme.blue2)

  const textContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '50%'
  }
  const blueRoundCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: blueColor2
  }

  const updateNewStatus = (): void => {
  
    setTimeout(() => { 
      setNewDemoIndicator(false) 
      setNewDemoIndicatorOpacity(0.8)
    }, 400)

  } 

  useEffect(() => { false && console.log(isNew) }, [ isNew ])

  return (
    <React.Fragment>

      { REMOVE_ALARM && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/remove-alarm-system',
          body: {
            userId: USER_ID, 
            order: order,
            actions: actions
          }
        }}
      
      /> }

      <AlarmContainer 
        background={background} 
        onMouseOver={updateNewStatus}
        style={{ opacity: newDemoIndicatorOpaity, cursor: 'pointer' }}
      >
        <div style={textContainerCSS}>
          <span style={{ fontSize: '12px', color: greyColor }}>{ date }</span>
          <span style={{ fontSize: '12px', color: greyColor, fontWeight: 'bold', marginTop: '13px' }}>{ "Системное уведомление" }</span>
          <span style={{ lineHeight: '23px', marginTop: '10px' }}>{ textData[0] }</span>

          { textData[1] !== '---' 
            
            && <div style={{ lineHeight: '23px', marginTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Гонорар за работу: </span><span>{ textData[1] } руб.</span></div> 
            
          }
          { textData[2] !== '---' 
            
            && <div style={{ lineHeight: '23px' }}><span style={{ fontWeight: 'bold' }}>Комментарий от заказчика: </span><span>{ textData[2] }</span></div> 
            
          }

        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          
          { buttons.length > 0 && buttons.map(item => item)}
        
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginLeft: '28px' }}>
          { newDemoIndicator === true && <span style={blueRoundCSS} /> }
          { newDemoIndicator === false && <img
            alt={""}
            src={closeIcon}
          /> }
        </div>
      </AlarmContainer>
    </React.Fragment>
  )

}

export default CabinetAlarmLine