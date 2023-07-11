import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { ICabinetAlarmLineProps } from '../../../../models-ts/views/cabinet-alarm-line-models'
import css from '../../styles/views/cabinetAlarmLine.css'
import closeIcon from '../../../../img/icons/close.svg'

const { AlarmContainer } = css

const CabinetAlarmLine: React.FC<ICabinetAlarmLineProps> = (props: ICabinetAlarmLineProps) => {
  
  const { background, buttons, content: { date, text }, isNew } = props

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

  return (
    <React.Fragment>
      <AlarmContainer background={background}>
        <div style={textContainerCSS}>
          <span style={{ fontSize: '12px', color: greyColor }}>{ date }</span>
          <span style={{ lineHeight: '23px', marginTop: '10px' }}>{ text }</span>
        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          { buttons.length > 0 && buttons.map(item => item)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginLeft: '28px' }}>
          { isNew === true && <span style={blueRoundCSS} /> }
          { isNew === false && <img
            alt={""}
            src={closeIcon}
          /> }
        </div>
      </AlarmContainer>
    </React.Fragment>
  )

}

export default CabinetAlarmLine