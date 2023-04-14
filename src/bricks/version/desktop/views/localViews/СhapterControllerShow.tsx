import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/chapterController.css'
import AddIcon from '@mui/icons-material/Add'

const { ChapterContainerLine, 
  ChapterContainerStepRound,
  ChapterContainerStepRoundInner,
  ChapterContainerStepRoundLabelText,
  ChapterContainerAddButton } = css

const ChapterController: 
  React.FC<{ 
    isBottomButton?: boolean,
    marginBott?: string | null
  }> = ( props: { isBottomButton?: boolean, marginBott?: string | null } ) => {

  const { isBottomButton = true, marginBott = null } = props

  const chaptersLineBackground = useAppSelector(state => state.theme.grey3)
  const roundBackground = useAppSelector(state => state.theme.grey2)
  const blueColorButton = useAppSelector(state => state.theme.blue3)

  return (
    <React.Fragment>
      <ChapterContainerLine style={ marginBott ? { marginBottom: marginBott } : {}} backgroundColor={chaptersLineBackground}>
        <ChapterContainerStepRound 
          backgroundColor={chaptersLineBackground} 
          style={{ marginLeft: '-15px' }}
        >
          <ChapterContainerStepRoundLabelText 
            textAlign={"left"}
            style={{ marginLeft: '20px' }}
          >
            Начало заказа
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
        <ChapterContainerStepRound backgroundColor={roundBackground}>
          <ChapterContainerStepRoundInner/>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Предварительное решение
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
        { false && <ChapterContainerStepRound backgroundColor={chaptersLineBackground}>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Пожарная безопасность
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound> }
        <ChapterContainerStepRound 
          backgroundColor={chaptersLineBackground}
          style={{ marginRight: '-15px' }}
        >
          <ChapterContainerStepRoundLabelText 
            textAlign={"right"}
            style={{ marginLeft: '-20px' }}
          >
            Заказ принят
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
      </ChapterContainerLine>
      { isBottomButton && <ChapterContainerAddButton>
        <ButtonComponent
          inner={""} 
          type='ICON_BUTTON' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={20}
          children={"Добавить раздел"}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '140px',
            top: '0px',
            left: '0px',
            marginLeft: '40px',
            marginTop: '5px',
            cursor: 'pointer'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={20}
          MuiIconChildren={AddIcon}
          css={{
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '12px',
            padding: '4px',
            backgroundColor: blueColorButton,
          }}
        />
      </ChapterContainerAddButton> }
    </React.Fragment>
  )

}

export default ChapterController