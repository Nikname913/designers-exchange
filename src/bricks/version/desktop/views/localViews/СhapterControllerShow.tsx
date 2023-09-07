import React from 'react'
import { useAppSelector } from '../../../../store/hooks'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/chapterController.css'
import AddIcon from '@mui/icons-material/Add'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { Fade } from '@mui/material'

const { ChapterContainerLine, 
  ChapterContainerStepRound,
  ChapterContainerStepRoundInner,
  ChapterContainerStepRoundLabelText,
  ChapterContainerAddButton } = css

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (

  <Tooltip {...props} arrow classes={{ popper: className }} />

))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    top: '-4px',
    left: '-2px',
    boxShadow: '0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
    color: 'black',
    padding: '10px',
    paddingTop: '11px',
    paddingBottom: '12px',
    paddingLeft: '14px',
    paddingRight: '14px',
    lineHeight: '16px',
    fontSize: '12px',
    fontWeight: 'normal'
  },
}))

const ChapterController: 
  React.FC<{ 
    isBottomButton?: boolean,
    marginBott?: string | null,
    chapters?: Array<any>,
    forPageType?: 'order' | 'task',
    progress?: string
  }> = ( props: { 
    
    isBottomButton?: boolean, 
    marginBott?: string | null, 
    chapters?: Array<any>, 
    forPageType?: 'order' | 'task',
    progress?: string 
  
  }) => {

  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)
  const orderList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)

  const { isBottomButton = true, 
    marginBott = null, 
    forPageType = 'task' } = props

  const chaptersLineBackground = useAppSelector(state => state.theme.grey3)
  const roundBackground = useAppSelector(state => state.theme.grey2)
  const blueColorButton = useAppSelector(state => state.theme.blue3)
  const yellowColor = useAppSelector(state => state.theme.yellow)

  return (
    <React.Fragment>
      <ChapterContainerLine style={ marginBott ? { marginBottom: marginBott } : {}} backgroundColor={chaptersLineBackground}>

        <span
          style={{
            display: 'block',
            position: 'absolute',
            width: forPageType === 'task' ? '66px' : orderList.filter(item => item.id === selectTask)[0].progress + '%',
            height: '100%',
            backgroundColor: 'rgb(22, 124, 191)',
            borderRadius: '6px'
          }}
        />

        <ChapterContainerStepRound 
          backgroundColor={yellowColor} 
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
        { forPageType === 'task' && <React.Fragment>
          { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => {

            return <React.Fragment>
              { item.chapters && item.chapters.map((chapter, chapterIndex) => {

                return (
                  <BootstrapTooltip 
                    title={chapter.title}
                    TransitionComponent={Fade} 
                    followCursor 
                    arrow
                  >
                    <ChapterContainerStepRound 
                      key={chapterIndex} 
                      backgroundColor={chaptersLineBackground}
                    >
                      <ChapterContainerStepRoundLabelText textAlign={"center"}>
                        { item.chapters && item.chapters?.length < 5 ? chapter.title : chapterIndex + 1 + ' раздел' }
                      </ChapterContainerStepRoundLabelText>
                    </ChapterContainerStepRound>
                  </BootstrapTooltip>
                )

              })}
            </React.Fragment>

          }) : <React.Fragment></React.Fragment> }
        </React.Fragment> }
        { forPageType === 'order' && <React.Fragment>
          { orderList.length > 0 ? orderList.filter(item => item.id === selectTask).map((item, index: number) => {

            return <React.Fragment>
              { item.chapters && item.chapters.map((chapter, chapterIndex) => {

                return (
                  <ChapterContainerStepRound 
                    key={chapterIndex} 
                    backgroundColor={
                      orderList.filter(item => item.id === selectTask)[0].progress > 50
                      ? yellowColor
                      : chaptersLineBackground
                    }
                  >
                    <ChapterContainerStepRoundLabelText textAlign={"center"}>
                      { item.chapters && item.chapters?.length < 5 ? chapter.title : chapterIndex + 1 + ' раздел' }
                    </ChapterContainerStepRoundLabelText>
                  </ChapterContainerStepRound>
                )

              })}
            </React.Fragment>

          }) : <React.Fragment></React.Fragment> }
        </React.Fragment> }
        { false && <ChapterContainerStepRound backgroundColor={chaptersLineBackground}>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Пожарная безопасность
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound> }
        <ChapterContainerStepRound backgroundColor={roundBackground}>
          <ChapterContainerStepRoundInner/>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Экспертиза ( проверка заказа )
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
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