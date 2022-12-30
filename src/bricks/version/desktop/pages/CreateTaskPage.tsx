import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import InputComponent from '../comps/input/Input'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SelectField from '../comps/select/SelectFieldPercentWidth'
import cssContentArea from '../styles/views/contentArea.css'
import cssAsideMenu from '../styles/pages/createTaskPageAside.css'

const { ContentArea, CustExecContentInnerArea, PageTitle } = cssContentArea
const { MenuContainer, 
  TextFieldTitle,
  TextFieldSubTitle, 
  TextFieldContainerLine } = cssAsideMenu

const CreateTaskPage: React.FC = () => {

  const inputBackground = useAppSelector(state => state.theme.white)

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
      <div style={headBlockCSS}>
        <PageTitle>Создание задания</PageTitle>
      </div>
      <MenuContainer></MenuContainer>
      <CustExecContentInnerArea>
        <TextFieldTitle>Данные о заказе</TextFieldTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
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
        <TextFieldTitle>Условия</TextFieldTitle>
        <TextFieldSubTitle mt={'0px'} mb={'18px'}>Предварительное решение</TextFieldSubTitle>
        <TextFieldContainerLine>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={50}
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
        <TextFieldTitle>Данные об объекте</TextFieldTitle>
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
        <TextFieldTitle>Описание задачи</TextFieldTitle>
        <TextFieldContainerLine style={{ marginBottom: '23px' }}>
          <InputComponent
            type={'TEXT_INPUT_OUTLINE'}
            valueType='text'
            required={false}
            widthType={'%'}
            widthValue={100}
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
              marginTop: '8px',
              backgroundColor: inputBackground
            }}
          />
        </TextFieldContainerLine>
      </CustExecContentInnerArea>
    </ContentArea>
  )

}

export default CreateTaskPage