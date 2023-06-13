import React, { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/chapterController.css'
import plusIcon from '../../../../img/icons/plus.svg'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Clear'

const { ChapterContainerLine, 
  ChapterContainerStepRound,
  ChapterContainerStepRoundPlus,
  ChapterContainerStepRoundInner,
  ChapterContainerStepRoundLabelText,
  ChapterContainerAddButton } = css

const ChapterController: 
  React.FC<{ 
    isBottomButton?: boolean,
    marginBott?: string | null,
    actions?: Array<Function>
  }> = ( props: { isBottomButton?: boolean, marginBott?: string | null, actions?: Array<Function> } ) => {

  const { isBottomButton = true, marginBott = null, actions } = props

  const chaptersLineBackground = useAppSelector(state => state.theme.grey3)
  const roundBackground = useAppSelector(state => state.theme.grey2)
  const blueColorButton = useAppSelector(state => state.theme.blue3)
  const blueColor = useAppSelector(state => state.theme.blue2)
  const whiteColor = useAppSelector(state => state.theme.white)

  const chapters = useAppSelector(state => state.createTaskReducer.chapters)
  const [ addButtonType, setAddButtonType ] = useState<'show' | 'hide'>('hide')

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
        { chapters.map((chapter, index) => {

          return (
            <ChapterContainerStepRound backgroundColor={roundBackground}>
              <ChapterContainerStepRoundInner/>
              <ChapterContainerStepRoundLabelText textAlign={"center"}>
                { chapter.title }
              </ChapterContainerStepRoundLabelText>
            </ChapterContainerStepRound>
          )

        })}
        <ChapterContainerStepRoundPlus 
          backgroundColor={whiteColor}
          borderColor={blueColor}
          onClick={() => {
            actions && actions[0](true)
            setAddButtonType('show')
          }}
        > 
          <img
            alt={""}
            src={plusIcon}
          />
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Добавить раздел
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRoundPlus>
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
      { addButtonType === 'hide' && <React.Fragment>
        { isBottomButton && <ChapterContainerAddButton>
          <ButtonComponent
            inner={""} 
            type='ICON_BUTTON' 
            action={() => {
              actions && actions[0](true)
              setAddButtonType('show')
            }}
            actionData={null}
            widthType={'px'}
            widthValue={20}
            children={"Добавить раздел"}
            childrenCss={{
              display: 'block',
              position: 'absolute',
              width: '160px',
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
      </React.Fragment> }
      { addButtonType === 'show' && <React.Fragment>
        { isBottomButton && <ChapterContainerAddButton>
          <ButtonComponent
            inner={""} 
            type='ICON_BUTTON' 
            action={() => { 
              actions && actions[0](false)
              setAddButtonType('hide')
            }}
            actionData={null}
            widthType={'px'}
            widthValue={20}
            children={"Не добавлять раздел"}
            childrenCss={{
              display: 'block',
              position: 'absolute',
              width: '160px',
              top: '0px',
              left: '0px',
              marginLeft: '40px',
              marginTop: '5px',
              cursor: 'pointer'
            }}
            iconSrc={null}
            iconCss={undefined}
            muiIconSize={20}
            MuiIconChildren={CloseIcon}
            css={{
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '12px',
              padding: '4px',
              backgroundColor: blueColorButton,
            }}
          />
        </ChapterContainerAddButton> }
      </React.Fragment> }
    </React.Fragment>
  )

}

export default ChapterController