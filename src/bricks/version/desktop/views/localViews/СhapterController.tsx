import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setChapters, setShowChaptersEditForms, setChapterLN, setChapterLD } from '../../../../store/slices/create-task-slice'
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

  const dispatch = useAppDispatch()

  const TASK_EXPERT_COAST = useAppSelector(state => state.createTaskReducer.expertiseCoast)
  const TASK_PREPAY = useAppSelector(state => state.createTaskReducer.prepay)
  const TASK_PREPAY_DAYS = useAppSelector(state => state.createTaskReducer.prepayDays)

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)

  const chaptersLineBackground = useAppSelector(state => state.theme.grey3)
  const roundBackground = useAppSelector(state => state.theme.grey2)
  const blueColorButton = useAppSelector(state => state.theme.blue3)
  const blueColor = useAppSelector(state => state.theme.blue2)
  const whiteColor = useAppSelector(state => state.theme.white)

  const chapters = useAppSelector(state => state.createTaskReducer.chapters)
  const [ addButtonType, setAddButtonType ] = useState<'show' | 'hide'>('hide')
  const [ showType, setShowType ] = useState<'standart' | 'chapters'>('standart')

  return (
    <React.Fragment>
      { showType === 'standart' && <ChapterContainerLine style={ marginBott ? { marginBottom: marginBott } : {}} backgroundColor={chaptersLineBackground}>
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
          <ChapterContainerStepRoundLabelText 
            textAlign={"center"}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', 
              position: 'absolute',
              boxSizing: 'border-box',
              marginTop: '-100px',
              width: '120px',
              backgroundColor: '#EBEBEC',
              borderRadius: '4px',
              padding: '12px 14px 11px',
            }} 
          >
            <span>Аванс : { TASK_PREPAY && TASK_PREPAY !== 'Договорной' ? TASK_PREPAY : '***' }</span>
            <span>Решение : { TASK_PREPAY_DAYS ? TASK_PREPAY_DAYS : '***' }</span>
          </ChapterContainerStepRoundLabelText>
        </ChapterContainerStepRound>
        { chapters.length < 3 && chapters.map((chapter, index) => {

          return (
            <ChapterContainerStepRound 
              backgroundColor={roundBackground}
              onClick={() => {
                actions && actions[0](false)
                dispatch(setShowChaptersEditForms({ show: true, num: index }))
                dispatch(setChapterLN(''))
                dispatch(setChapterLD(''))
                setAddButtonType('hide')
              }} 
            >
              <ChapterContainerStepRoundInner/>
              <ChapterContainerStepRoundLabelText textAlign={"center"}>
                { chapter.title }
              </ChapterContainerStepRoundLabelText>
            </ChapterContainerStepRound>
          )

        })}
        { chapters.length > 2 && <ChapterContainerStepRoundPlus 
            backgroundColor={'rgb(22, 124, 191)'}
            borderColor={'white'}
            onClick={() => {
              setShowType('chapters')
            }}
          > 
            <ChapterContainerStepRoundInner/>
            <ChapterContainerStepRoundLabelText textAlign={"center"}>
              Развернуть разделы
            </ChapterContainerStepRoundLabelText>
          </ChapterContainerStepRoundPlus>
        }
        { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => {

          return <React.Fragment>
            { item.chapters && item.chapters.map((chapter, index: number) => {

              return (
                <ChapterContainerStepRound 
                  backgroundColor={roundBackground}
                  onClick={() => {}}  
                >
                  <ChapterContainerStepRoundInner/>
                  <ChapterContainerStepRoundLabelText textAlign={"center"}>
                    { chapter.title }
                  </ChapterContainerStepRoundLabelText>
                </ChapterContainerStepRound>
              )

            }) }
          </React.Fragment>

        }) : <React.Fragment></React.Fragment> }
        <ChapterContainerStepRoundPlus 
          backgroundColor={whiteColor}
          borderColor={blueColor}
          onClick={() => {
            actions && actions[0](true)
            dispatch(setShowChaptersEditForms({ show: false, num: 0 }))
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
        <ChapterContainerStepRound backgroundColor={roundBackground}>
          <ChapterContainerStepRoundInner/>
          <ChapterContainerStepRoundLabelText textAlign={"center"}>
            Экспертиза
          </ChapterContainerStepRoundLabelText>
          <ChapterContainerStepRoundLabelText 
            textAlign={"center"}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', 
              position: 'absolute',
              boxSizing: 'border-box',
              marginTop: '-100px',
              width: '120px',
              backgroundColor: '#EBEBEC',
              borderRadius: '4px',
              padding: '12px 14px 11px',
            }} 
          >
            <span>Оплата : { TASK_EXPERT_COAST && TASK_EXPERT_COAST !== 'Договорная' ? TASK_EXPERT_COAST : '***' }</span>
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
      </ChapterContainerLine> }
      { showType === 'chapters' && <ChapterContainerLine 
            backgroundColor={chaptersLineBackground}
            style={ 
              marginBott 
                ? { marginBottom: marginBott, 
                    paddingLeft: '40px', 
                    paddingRight: '40px', 
                    marginTop: '-58px',
                    borderRadius: '4px' 
                  } 
                : { paddingLeft: '60px', 
                    paddingRight: '60px', 
                    marginTop: '-58px',
                    borderRadius: '4px' 
                  }
            }
          >
        { chapters.length >= 0 && <ChapterContainerStepRoundPlus 
            backgroundColor={'rgb(22, 124, 191)'}
            borderColor={'white'}
            onClick={() => {
              setShowType('standart')
            }}
          > 
            <ChapterContainerStepRoundInner/>
            <ChapterContainerStepRoundLabelText textAlign={"center"}>
              Свернуть разделы
            </ChapterContainerStepRoundLabelText>
          </ChapterContainerStepRoundPlus>
        }
        { chapters.length < 11 && chapters.map((chapter, index) => {

          return (
            <ChapterContainerStepRound 
              backgroundColor={roundBackground}
              onClick={() => {
                actions && actions[0](false)
                dispatch(setShowChaptersEditForms({ show: true, num: index }))
                dispatch(setChapterLN(''))
                dispatch(setChapterLD(''))
                setAddButtonType('hide')
              }}
            >
              <ChapterContainerStepRoundInner/>
              <ChapterContainerStepRoundLabelText textAlign={"center"}>
                { chapter.title }
              </ChapterContainerStepRoundLabelText>
            </ChapterContainerStepRound>
          )

        })}
        { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => {

          return <React.Fragment>
            { item.chapters && item.chapters.map((chapter, index: number) => {

              return (
                <ChapterContainerStepRound backgroundColor={roundBackground}>
                  <ChapterContainerStepRoundInner/>
                  <ChapterContainerStepRoundLabelText textAlign={"center"}>
                    { chapter.title }
                  </ChapterContainerStepRoundLabelText>
                </ChapterContainerStepRound>
              )

            }) }
          </React.Fragment>

        }) : <React.Fragment></React.Fragment> }
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
      </ChapterContainerLine> }
      { addButtonType === 'hide' && <React.Fragment>
        { isBottomButton && <div style={{ display: 'flex', flexDirection: 'row' }}><ChapterContainerAddButton>
          <ButtonComponent
            inner={""} 
            type='ICON_BUTTON' 
            action={() => {
              actions && actions[0](true)
              dispatch(setShowChaptersEditForms({ show: false, num: 0 }))
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
              marginTop: '13px',
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
              marginTop: '8px',
              padding: '4px',
              backgroundColor: blueColorButton,
            }}
          />
        </ChapterContainerAddButton>
        <ChapterContainerAddButton>
          <ButtonComponent
            inner={""} 
            type='ICON_BUTTON' 
            action={() => { 
              actions && actions[0](false)
              dispatch(setChapters([]))
            }}
            actionData={null}
            widthType={'px'}
            widthValue={20}
            children={"Очистить все разделы"}
            childrenCss={{
              display: 'block',
              position: 'absolute',
              width: '160px',
              top: '0px',
              left: '0px',
              marginLeft: '210px',
              marginTop: '13px',
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
              marginTop: '8px',
              marginLeft: '170px',
              padding: '4px',
              backgroundColor: blueColorButton,
            }}
          />
        </ChapterContainerAddButton></div> }
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
              marginTop: '13px',
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
              marginTop: '8px',
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