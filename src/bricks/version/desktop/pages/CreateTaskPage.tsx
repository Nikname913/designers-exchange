import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import EmailIcon from '@mui/icons-material/Email'
import InputComponent from '../comps/input/Input'
import FormGroup from '@mui/material/FormGroup'
import ButtonComponent from '../comps/button/Button'
import ChapterController from '../views/localViews/СhapterController'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SelectField from '../comps/select/SelectFieldPercentWidth'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/createTaskPageAside.css'
import backIcon from '../../../img/icons/back.svg'

const { ContentArea, 
  CustExecContentInnerArea, 
  PageTitle,
  BackwardButton } = cssContentArea
const { MenuContainer, 
  TextFieldTitle,
  TextFieldSubTitle, 
  TextFieldContainerLine,
  StepsContainer,
  StepsContainerVertical,
  StepsContainerVerticalForRound,
  StepsContainerVerticalStep,
  StepsContainerVerticalStepRound,
  StepsContainerVerticalStepRoundLabel } = cssAsideMenu

const CreateTaskPage: React.FC = () => {

  const inputBackground = useAppSelector(state => state.theme.white)
  const uploadButtonBackground = useAppSelector(state => state.theme.blue3)
  const backwardButtonColor = useAppSelector(state => state.theme.grey)
  const stepsContainerColor = useAppSelector(state => state.theme.grey3)
  const stepContainerRoundColor = useAppSelector(state => state.theme.blue2)
  const stepContainerRoundLabelColor = useAppSelector(state => state.theme.grey2)
  const blackColor = useAppSelector(state => state.theme.black)

  const navigate = useNavigate()

  const headBlockCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '120px'
  }
  const spanDelimiterCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '16px'
  }
  const divHalfWidthCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
  }

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    > 
      <div style={{ ...headBlockCSS, justifyContent: 'flex-start', marginTop: '35px' }}>
        <img
          alt={""}
          src={backIcon}
          style={{
            display: 'block',
            position: 'relative',
            width: '10px',
            marginRight: '12px',
            marginLeft: '2px',
            cursor: 'pointer'
          }}
        />
        <BackwardButton color={backwardButtonColor} onClick={() => navigate('/zakazchik-moi-zadaniya')}>Ко всем заданиям</BackwardButton>
      </div>
      <div style={headBlockCSS}>
        <PageTitle style={{ marginTop: '20px' }}>Создание задания</PageTitle>
      </div>
      <MenuContainer>
        <StepsContainer>
          <StepsContainerVertical backgroundColor={stepsContainerColor}>
            <StepsContainerVerticalStep backgroundColor={stepsContainerColor}/>
            <StepsContainerVerticalStep backgroundColor={stepsContainerColor}/>
            <StepsContainerVerticalStep backgroundColor={stepsContainerColor}/>
            <StepsContainerVerticalStep backgroundColor={stepsContainerColor}/>
            <StepsContainerVerticalForRound backgroundColor={"transparent"}>
              <StepsContainerVerticalStepRound backgroundColor={stepContainerRoundColor}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Данные о заказе"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={stepContainerRoundColor}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Условия"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={stepContainerRoundColor}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Об объекте"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={stepContainerRoundColor}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Вложения"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
              <StepsContainerVerticalStepRound backgroundColor={stepContainerRoundColor}>
                <StepsContainerVerticalStepRoundLabel color={stepContainerRoundLabelColor}>
                  {"Разделы"}
                </StepsContainerVerticalStepRoundLabel>
              </StepsContainerVerticalStepRound>
            </StepsContainerVerticalForRound>
          </StepsContainerVertical>
        </StepsContainer>
      </MenuContainer>
      <CustExecContentInnerArea>
        <TextFieldTitle>Данные о заказе</TextFieldTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Название задания"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              marginTop: '8px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_DATE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Дата начала"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_DATE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Дата окончания"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <SelectField 
            placeholder={"Необходимые навыки"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Пожарная безопасность' },
              { value: '2', label: 'Пожарная безопасность' },
              { value: '3', label: 'Пожарная безопасность' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <span style={{ ...spanDelimiterCSS, width: '50%' }} />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Стоимость заказа"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS, paddingBottom: '14px' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="Договорная стоимость"/>
            </FormGroup>
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '30px' }}>Условия</TextFieldTitle>
        <TextFieldSubTitle mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Сумма аванса"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Срок принятия решения"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'дней'}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldSubTitle mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          <SelectField 
            placeholder={"Государственная"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Государственная экспертиза' },
              { value: '2', label: 'Государственная экспертиза' },
              { value: '3', label: 'Государственная экспертиза' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <InputComponent
              type={'TEXT_INPUT_OUTLINE_DATE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"День экспертизы"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: inputBackground
              }}
            />
            <span style={spanDelimiterCSS} />
            <InputComponent
              type={'TEXT_INPUT_OUTLINE'}
              valueType='text'
              required={false}
              widthType={'%'}
              widthValue={50}
              heightValue={'50px'}
              label={"Сумма экспертизы"}
              isError={false}
              isDisabled={false}
              labelShrinkLeft={"0px"}
              innerLabel={null}
              css={{
                fontSize: '12px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '16px',
                backgroundColor: inputBackground
              }}
            />
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '30px' }}>Данные об объекте</TextFieldTitle>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Вид строительства"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Вид строительства' },
              { value: '2', label: 'Вид строительства' },
              { value: '3', label: 'Вид строительства' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Обшая площадь"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'кв.м'}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Регион"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Владимирская область' },
              { value: '2', label: 'Иркутская область' },
              { value: '3', label: 'Краснодарский край' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Этажность наземная"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={''}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Тип постройки"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Тип постройки' },
              { value: '2', label: 'Тип постройки' },
              { value: '3', label: 'Тип постройки' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <InputComponent
            type={'TEXT_INPUT_OUTLINE_INLABEL'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Высота объекта"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={'метры'}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <SelectField 
            placeholder={"Назначение"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Жилая недвижимость' },
              { value: '2', label: 'Складские помещения' },
              { value: '3', label: 'Коммерческая недвижимость' },
            ]}
            multy={false}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
          <span style={spanDelimiterCSS} />
          <span style={{ ...spanDelimiterCSS, width: '50%' }} />
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '30px' }}>Описание задачи</TextFieldTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Подробнее опишите вашу задачу"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '0px',
              marginTop: '8px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginBottom: '12px', marginTop: '28px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Техническое задание</TextFieldTitle>
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <TextFieldTitle>Вложения</TextFieldTitle>
          </div>
        </TextFieldContainerLine>
        <TextFieldContainerLine style={{ marginBottom: '2px' }}>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='UPLOAD' 
              action={() => console.log('this is button')}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '12px'
              }}
            />
          </div>
          <span style={spanDelimiterCSS}></span>
          <div style={{ ...divHalfWidthCSS }}>
            <ButtonComponent
              inner={'Добавить файлы'} 
              type='UPLOAD' 
              action={() => console.log('this is button')}
              actionData={null}
              widthType={'px'}
              widthValue={280}
              children={''}
              childrenCss={undefined}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: uploadButtonBackground,
                color: blackColor,
                fontSize: '12px',
                height: '46px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginBottom: '12px'
              }}
            />
          </div>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '28px', marginBottom: '42px' }}>Разделы [ дальнейшая разработка ]</TextFieldTitle>
        <TextFieldContainerLine style={{ flexWrap: 'wrap' }}>
          <ChapterController></ChapterController>
        </TextFieldContainerLine>
        <TextFieldTitle style={{ marginTop: '18px' }}>Новый раздел</TextFieldTitle>
        <TextFieldContainerLine style={{ marginTop: '8px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
            heightValue={'50px'}
            label={"Развание раздела"}
            isError={false}
            isDisabled={false}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              backgroundColor: inputBackground
            }}
          />
          <span style={spanDelimiterCSS} />
          <SelectField 
            placeholder={"Выберите необходимые навыки"}
            params={{ width: 50, mb: '16px', height: 50 }}
            data={[
              { value: '1', label: 'Название навыка 1' },
              { value: '2', label: 'Название навыка 2' },
              { value: '3', label: 'Название навыка 3' },
            ]}
            multy={true}
            action={() => {}}
            actionType={""}
            actionParams={[]}
            showIcon={true}
            icon={null}
            iconStyles={{
              marginTop: '-12px',
              marginLeft: '6px',
              width: '34px',
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
            heightValue={'50px'}
            label={"Подробнее опишите вашу задачу"}
            isError={false}
            isDisabled={true}
            labelShrinkLeft={"0px"}
            innerLabel={null}
            css={{
              fontSize: '12px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '16px',
              marginTop: '0px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
        <TextFieldContainerLine>
          <ButtonComponent
            inner={'Добавить файлы'} 
            type='UPLOAD' 
            action={() => console.log('this is button')}
            actionData={null}
            widthType={'px'}
            widthValue={280}
            children={''}
            childrenCss={undefined}
            iconSrc={null}
            iconCss={undefined}
            muiIconSize={null}
            MuiIconChildren={EmailIcon}
            css={{
              backgroundColor: uploadButtonBackground,
              color: blackColor,
              fontSize: '12px',
              height: '46px',
              borderRadius: '6px',
              position: 'relative',
              boxSizing: 'border-box',
              marginBottom: '46px'
            }}
          />
        </TextFieldContainerLine>
      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CreateTaskPage