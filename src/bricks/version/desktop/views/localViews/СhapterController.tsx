import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import css from '../../styles/views/chapterController.css'

const { ChapterContainerLine, 
  ChapterContainerStepRound,
  ChapterContainerStepRoundPlus,
  ChapterContainerStepRoundInner,
  ChapterContainerStepRoundLabelText } = css

const ChapterController: React.FC = () => {

  const chaptersLineBackground = useAppSelector(state => state.theme.grey3)
  const roundBackground = useAppSelector(state => state.theme.grey2)
  const blueColor = useAppSelector(state => state.theme.blue2)
  const whiteColor = useAppSelector(state => state.theme.white)

  return (
    <React.Fragment>
      <ChapterContainerLine backgroundColor={chaptersLineBackground}>
        <ChapterContainerStepRound 
          backgroundColor={chaptersLineBackground} 
          style={{ marginLeft: '-15px' }}
        >
          <ChapterContainerStepRoundLabelText textAlign={"left"}>
            Начало заказа
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
        <ChapterContainerStepRound backgroundColor={roundBackground}>
          <ChapterContainerStepRoundInner/>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Предварительное решение
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
        <ChapterContainerStepRoundPlus 
          backgroundColor={whiteColor}
          borderColor={blueColor}
        >
          <ChapterContainerStepRoundLabelText textAlign={"left"}>
            Начало заказа
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRoundPlus>
        <ChapterContainerStepRound 
          backgroundColor={chaptersLineBackground}
          style={{ marginRight: '-15px' }}
        >
          <ChapterContainerStepRoundLabelText textAlign={"right"}>
            Заказ принят
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
      </ChapterContainerLine>
    </React.Fragment>
  )

}

export default ChapterController