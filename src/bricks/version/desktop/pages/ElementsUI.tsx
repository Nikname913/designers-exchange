import React, { CSSProperties, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector } from '../../../store/hooks'
import ButtonComponent from '../comps/button/Button'
import InputComponent from '../comps/input/Input'
import AlertComponent from '../comps/alert/Alert'
import ModalComponent from '../comps/modal/Modal'
import SelectField from '../comps/select/SelectField'

import TaskTable from '../views/localViews/TaskTable'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'

import logo from '../../../../logo.svg'
import buttonScreen from '../../../img/screenButton.jpg'
import inputScreen from '../../../img/screenInput.jpg'
import alertScreen from '../../../img/screenAlert.jpg'
import modalScreen from '../../../img/screenModal.jpg'
import defaultAvatar from '../../../img/stock/avatar.svg'

const textStyle: CSSProperties = {
  display: 'block',
  position: 'relative',
  width: '100%',
  lineHeight: '22px',
  color: '#2E2E2E',
  fontSize: '15px',
  margin: '0px',
  marginBottom: '6px',
  paddingLeft: '8px',
}

const ElementsUI: React.FC = () => {

  const [ modalShow, setModalShow ] = useState(false)
  const primaryColor = useAppSelector(state => state.theme.blue1)
  const primaryColorTwo = useAppSelector(state => state.theme.blue2)
  const disabledButtonColor = useAppSelector(state => state.theme.grey2)
  const primaryGrey = useAppSelector(state => state.theme.grey)
  const iconBackground = useAppSelector(state => state.theme.blue3)

  return (
    <React.Fragment>
      <div 
        style={{ 
          display: 'flex',
          flexDirection: 'column', 
          position: 'relative', 
          marginTop: '30px', 
          marginLeft: '30px',
          boxSizing: 'border-box',
          width: '500px'
        }}
      >

        <div
          style={{
            display: 'block',
            position: 'absolute',
            width: '540px',
            boxSizing: 'border-box',
            left: '0%',
            marginLeft: '560px',
          }}
        >
          <img
            alt={""}
            src={buttonScreen}
            style={{
              display: 'block',
              position: 'relative',
              width: '540px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
            }}
          />

          <span
            style={{
              display: 'block',
              position: 'absolute',
              color: 'grey',
              width: '400px',
              left: '50%',
              marginLeft: '-200px',
              top: '100%',
              marginTop: '20px',
              lineHeight: '23px',
              textAlign: 'center'
            }}
          >
            Готовый компонент-конструктор для реализации кнопок на сайте
          </span>

        </div>
        <div
          style={{
            display: 'block',
            position: 'absolute',
            width: '540px',
            boxSizing: 'border-box',
            left: '0%',
            marginLeft: '560px',
            marginTop: '900px',
          }}
        >
          <img
            alt={""}
            src={inputScreen}
            style={{
              display: 'block',
              position: 'relative',
              width: '540px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
            }}
          />

          <span
            style={{
              display: 'block',
              position: 'absolute',
              color: 'grey',
              width: '400px',
              left: '50%',
              marginLeft: '-200px',
              top: '100%',
              marginTop: '20px',
              lineHeight: '23px',
              textAlign: 'center'
            }}
          >
            Готовый компонент-конструктор для реализации полей ввода на сайте
          </span>

        </div>
        <div
          style={{
            display: 'block',
            position: 'absolute',
            width: '540px',
            boxSizing: 'border-box',
            left: '0%',
            marginLeft: '560px',
            marginTop: '1840px',
            }}
        >
          <img
            alt={""}
            src={alertScreen}
            style={{
              display: 'block',
              position: 'relative',
              width: '540px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
            }}
          />

          <span
            style={{
              display: 'block',
              position: 'absolute',
              color: 'grey',
              width: '400px',
              left: '50%',
              marginLeft: '-200px',
              top: '100%',
              marginTop: '20px',
              lineHeight: '23px',
              textAlign: 'center'
            }}
          >
            Готовый компонент-конструктор для информационных сообщений на сайте
          </span>

        </div>
        <div
          style={{
            display: 'block',
            position: 'absolute',
            width: '540px',
            boxSizing: 'border-box',
            left: '0%',
            marginLeft: '560px',
            marginTop: '2040px',
           }}
        >
          <img
            alt={""}
            src={modalScreen}
            style={{
              display: 'block',
              position: 'relative',
              width: '540px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
            }}
          />

          <span
            style={{
              display: 'block',
              position: 'absolute',
              color: 'grey',
              width: '400px',
              left: '50%',
              marginLeft: '-200px',
              top: '100%',
              marginTop: '20px',
              lineHeight: '23px',
              textAlign: 'center'
            }}
          >
            Готовый компонент-конструктор для реализации всплывающих сообщений на сайте
          </span>

        </div>

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '0px',
            fontSize: '24px'
          }}
        >Компонент ~ Кнопка ~</h2>

        <ButtonComponent
          inner={'Компонент кнопки'} 
          type='CONTAINED_DEFAULT' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Кнопка с заливкой'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: primaryColor,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />
        <ButtonComponent
          inner={'Компонент кнопки'} 
          type='OUTLINED' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Кнопка без заливки'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            borderColor: primaryColor,
            color: primaryGrey,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />
        <ButtonComponent
          inner={'Компонент кнопки'} 
          type='CONTAINED_DISABLED' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Неактивная кнопка, активация по условию'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-11px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            borderColor: disabledButtonColor,
            backgroundColor: disabledButtonColor,
            color: '#B3CB74',
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />
        <ButtonComponent
          inner={'Компонент кнопки'} 
          type='OUTLINED_DISABLED' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Иконка для кнопки, гибкое положение'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '62px',
            marginTop: '-11px',
            lineHeight: '18px'
          }}
          iconSrc={logo}
          iconCss={{
            display: 'block',
            position: 'absolute',
            width: '38px',
            height: '38px',
            borderRadius: '19px',
            backgroundColor: iconBackground,
            left: '100%',
            top: '50%',
            marginTop: '-26px',
            marginLeft: '12px'
          }}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            borderColor: disabledButtonColor,
            color: '#B3CB74',
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />
        <ButtonComponent
          inner={'Компонент кнопки'} 
          type='CONTAINED_DEFAULT' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Иконка для кнопки, гибкое положение'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '62px',
            marginTop: '-11px',
            lineHeight: '18px'
          }}
          iconSrc={logo}
          iconCss={{
            display: 'block',
            position: 'absolute',
            width: '38px',
            height: '38px',
            borderRadius: '19px',
            backgroundColor: iconBackground,
            left: '100%',
            top: '50%',
            marginTop: '-26px',
            marginLeft: '12px'
          }}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: primaryColorTwo,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />
        <ButtonComponent
          inner={'Загрузить фото'} 
          type='UPLOAD' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Кнопка загрузки данных'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: primaryColorTwo,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        />
        <ButtonComponent
          inner={""} 
          type='ICON_BUTTON' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Кнопка в виде иконки'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={34}
          MuiIconChildren={EmailIcon}
          css={{
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        />
        <ButtonComponent
          inner={'Подождите'} 
          type='LOADING_BUTTON' 
          action={() => console.log('this is button')}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Кнопка ожидания загрузки'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '160px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: disabledButtonColor,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />

        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Доступные типы:</p>
        <p style={textStyle}>Кнопка с заливкой, контурная кнопка, кнопка загрузки данных, кнопка-иконка, кнопка ожидания а также активная либо неактивная</p>
        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Настраиваемые параметры:</p>
        <p style={textStyle}># Текстовое содержимое</p>
        <p style={textStyle}># Цвет фона, рамки, текста</p>
        <p style={textStyle}># Форма кнопки</p>
        <p style={textStyle}># Высота и ширина</p>
        <p style={textStyle}># Положение кнопки</p>
        <p style={textStyle}># Произвольное визуальное оформление</p>
        <p style={textStyle}># Лейбл к кнопке</p>
        <p style={textStyle}># Иконка для кнопки</p>

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '12px',
            fontSize: '24px'
          }}
        >Компонент ~ Поле ввода текста ~</h2>

        <InputComponent
          type={'TEXT_INPUT_LINE'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Базовое текстовое поле"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"2px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Поле с рамкой"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Заблокированное поле"}
          isError={false}
          isDisabled={true}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_PASSWORD'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Базовое поле типа Пароль"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Умное поле ввода пароля"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_PASSWORD'}
          valueType='text'
          required={true}
          widthType={'px'}
          widthValue={340}
          label={"Обязательное поле типа Пароль"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_SEARCH'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Базовое поле типа Поиск"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Ошибка валидации"}
          isError={true}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={null}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />
        <InputComponent
          type={'TEXT_INPUT_OUTLINE_INLABEL'}
          valueType='text'
          required={false}
          widthType={'px'}
          widthValue={340}
          label={"Поле ввода с пометкой"}
          isError={false}
          isDisabled={false}
          labelShrinkLeft={"0px"}
          innerLabel={'RUB'}
          css={{
            fontSize: '12px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '18px',
          }}
        />

        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Доступные типы:</p>
        <p style={textStyle}>Вариаций текстовых полей очень много, на момент 01.12.2022 реализованы самые основные</p> 
        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Настраиваемые параметры:</p>
        <p style={textStyle}># Тип поля ввода ( текст, пароль, поиск, валидация и тд )</p>
        <p style={textStyle}># Произвольное визуальное оформление</p>
        <p style={textStyle}># Внешний вид - минималистичное поле либо классическое</p>
        <p style={textStyle}># Заблокированное или нет</p>
        <p style={textStyle}># Добавление иконок либо пометок</p>

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '12px',
            fontSize: '24px'
          }}
        >Компонент ~ Уведомления ~</h2>

        <AlertComponent 
          type='success' 
          message='Сообщение об успешном действии на сайте'
          css={{ marginBottom: '16px', paddingBottom: '12px', paddingTop: '10px' }}
        />
        <AlertComponent 
          type='warning' 
          message='Сообщение, предупреждающее о чем-либо'
          css={{ marginBottom: '16px', paddingBottom: '12px', paddingTop: '10px' }}
        />
        <AlertComponent 
          type='info' 
          message='Сообщение информационного характера'
          css={{ marginBottom: '16px', paddingBottom: '12px', paddingTop: '10px' }}
        />
        <AlertComponent 
          type='error' 
          message='Сообщение об ошибке на сайте'
          css={{ marginBottom: '16px', paddingBottom: '12px', paddingTop: '10px' }}
        />

        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Доступные типы:</p>
        <p style={textStyle}>Доступно четыре основных типа: успешное действие, предупреждение, информирование, а также уведомление об ошибке</p> 
        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Настраиваемые параметры:</p>
        <p style={textStyle}># Тип сообщения в окошке</p>
        <p style={textStyle}># Текстовый контент самого сообщения</p>

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '12px',
            fontSize: '24px'
          }}
        >Компонент ~ Модалка ~</h2>

        <ButtonComponent
          inner={'Открыть окно'} 
          type='CONTAINED_DEFAULT' 
          action={() => setModalShow(true)}
          actionData={null}
          widthType={'px'}
          widthValue={200}
          children={'Нажмите, чтобы вызвать модальное окно'}
          childrenCss={{
            display: 'block',
            position: 'absolute',
            width: '200px',
            left: '100%',
            fontSize: '14px',
            color: 'grey',
            marginLeft: '14px',
            marginTop: '-13px',
            lineHeight: '18px'
          }}
          iconSrc={null}
          iconCss={undefined}
          muiIconSize={null}
          MuiIconChildren={EmailIcon}
          css={{
            backgroundColor: primaryColor,
            fontSize: '12px',
            height: '40px',
            borderRadius: '6px',
            position: 'relative',
            boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />

        <ModalComponent
          isShow={modalShow}
          action={setModalShow}
          type="AGREE_OR_NOT"
          title="Заголовок модального окна"
          message="Основной текст сообщения модального окна. Может быть разной длины, а также содержать в себе не только текстовую информацию, но и HTML элементы"
        ></ModalComponent>

        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Доступные типы:</p>
        <p style={textStyle}>Контент находится в стадии наполнения</p> 

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '12px',
            fontSize: '24px'
          }}
        >Компонент ~ Выпадающий список ~</h2>

        <SelectField 
          placeholder={"Простой выпадающий список"}
          params={{ width: 360, mb: '11px' }}
          data={[
            { value: '1', label: 'Поле номер 1' },
            { value: '2', label: 'Поле номер 2' },
            { value: '3', label: 'Поле номер 3' },
            { value: '4', label: 'Поле номер 4' }
          ]}
          multy={false}
          action={() => {}}
          actionType={""}
          actionParams={[]}
          showIcon={true}
          icon={logo}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />
        <SelectField 
          placeholder={"Мультиселект"}
          params={{ width: 360, mb: '16px' }}
          data={[
            { value: '1', label: 'Поле номер 1' },
            { value: '2', label: 'Поле номер 2' },
            { value: '3', label: 'Поле номер 3' },
            { value: '4', label: 'Поле номер 4' }
          ]}
          multy={true}
          action={() => {}}
          actionType={""}
          actionParams={[]}
          showIcon={true}
          icon={logo}
          iconStyles={{
            marginTop: '-12px',
            marginLeft: '6px',
            width: '34px',
          }}
        />

        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Доступные типы:</p>
        <p style={textStyle}>Классический выпадающий список, мультиселект</p> 
        <p style={{ ...textStyle, fontWeight: 'bold', paddingLeft: '0px' }}>Настраиваемые параметры:</p>
        <p style={textStyle}># Тип выпадающего списока</p>
        <p style={textStyle}># Произвольная визуальная настройка компонентов</p>
        
        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '12px',
            fontSize: '24px',
            marginBottom: '29px'
          }}
        >Компонент ~ Карточка задания ~</h2>

        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"searching"}
          cardWidth={'900px'}
          marbo={null}
          deal={{
            type: 'safe',
            prepaid: 30000,
            expert: 74000
          }}
        />
        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"work"}
          cardWidth={'900px'}
          marbo={null}
          deal={{
            type: 'safe',
            prepaid: 30000,
            expert: 74000
          }}
        />
        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"searching"}
          deal={{ type: 'simple' }}
          cardWidth={'900px'}
          marbo={null}
        />
        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"work"}
          deal={{ type: 'simple' }}
          cardWidth={'900px'}
          marbo={null}
        />
        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"complete"}
          deal={{ type: 'simple' }}
          cardWidth={'900px'}
          marbo={null}
        />
        <TaskTable
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"complete"}
          deal={{ type: 'safe' }}
          cardWidth={'900px'}
          marbo={null}
        />

        <h2
          style={{
            color: '#2E2E2E',
            marginTop: '-4px',
            fontSize: '24px',
            marginBottom: '28px'
          }}
        >Компонент ~ Карточка участника биржи ~</h2>

        <CustomerExecutorCardPreview
          isDisabledMessage={true}
          userName={"Николай Шипов"}
          userAvatar={defaultAvatar}
          userEmployment={"Самозанятый"}
          userLocation={"Екатеринбург"}
          userReviews={24}
          userRate={4.98}
          userProjects={[13,4,0]}
          cardWidth={null}
          marginBottom={null}
          marginRight={null}
          userTags={[
            "Пожарная безопасность",
            "Сигнализация",
            "Сигнализация",
            "Пожарная безопасность",
            "Сигнализация",
            "Пожарная безопасность"
          ]}
        />
        <CustomerExecutorCardPreview
          isDisabledMessage={false}
          userName={"Николай Шипов"}
          userAvatar={defaultAvatar}
          userEmployment={"Самозанятый"}
          userLocation={"Екатеринбург"}
          userReviews={24}
          userRate={4.98}
          userProjects={[13,4,0]}
          cardWidth={null}
          marginBottom={null}
          marginRight={null}
          userTags={[
            "Пожарная безопасность",
            "Сигнализация",
            "Сигнализация",
            "Пожарная безопасность",
            "Сигнализация",
            "Пожарная безопасность"
          ]}
        />

      </div>
    </React.Fragment>
  )

}

export default ElementsUI