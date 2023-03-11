import React, { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { IFos } from '../../../models-ts/services/fos-models'
import { setShow } from '../../../store/slices/fos-slice'
import { setShow as setShowRCC } from '../../../store/slices/right-content-slice'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import css from '../styles/services/fosContainer.css'
import EmailIcon from '@mui/icons-material/Email'
import closeIcon from '../../../img/icons/close.svg'
import avatar from '../../../img/stock/avatar.svg'
import cross from '../../../img/icons/greyCross.svg'
import addUser from '../../../img/icons/addUser.svg'

const { ShadowContainer, RespondFromList, Command } = css

const FOS: React.FC<IFos> = (props: IFos) => {

  const { showType, scroll } = props

  const buttonColor = useAppSelector(state => state.theme.blue2)
  const delimiterBackground = useAppSelector(state => state.theme.blue3)
  const greenColor = useAppSelector(state => state.theme.green)
  const yellowColor = useAppSelector(state => state.theme.yellow)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const dispatch = useAppDispatch()

  const spanDelimiterCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '30px',
    boxSizing: 'border-box',
  }
  const spanTitleCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
    width: '50%',
    margin: '0'
  }
  const closeIconCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '0px',
    left: '100%',
    marginTop: '18px',
    marginLeft: '-42px',
    cursor: 'pointer'
  }
  const avatarImageCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px'
  }
  const nameTitlesCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '18px',
    lineHeight: '22px',
    marginBottom: '5px'
  }
  const nameSubtitleCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '12px',
    color: greyColor2
  }
  const resetDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '300px'
  }
  const coastSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '20px',
    fontWeight: 'bold',
  }
  const userContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  const closeFos = (): void => {
    dispatch(setShowRCC(false))
    dispatch(setShow(false))
  }

  return (
    <React.Fragment>
      <ShadowContainer 
        marginTop={scroll} 
        background={"rgba(0, 0, 0, 0.4)"}
        style={{ zIndex: 40 }}
      >
        { showType === 'respondFromList' 
          ? <React.Fragment>
              <RespondFromList.FOS style={{ zIndex: 40 }}>
                <img
                  alt={""}
                  src={closeIcon}
                  style={closeIconCSS}
                  onClick={closeFos}
                />
                <RespondFromList.ContentLine>
                  <RespondFromList.Title>Откликнуться на задание</RespondFromList.Title>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <RespondFromList.SubTitle>Название задания</RespondFromList.SubTitle>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px' }}>
                  <span style={spanTitleCSS}>Срок</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"20.02.2023"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"200 000"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Предварительное решение</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Сумма аванса</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"через 20 дней"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"50 000"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Экспертиза</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость экспертизы</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"16.02.2023"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"200 000"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Комментарий</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Ваш комментарий"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <span style={{ ...spanDelimiterCSS, width: '50%' }} />
                  <span style={spanDelimiterCSS} />
                  <ButtonComponent
                    inner={"Откликнуться"} 
                    type="CONTAINED_DEFAULT" 
                    action={() => {}}
                    actionData={null}
                    widthType={"px"}
                    widthValue={172}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '33px'
                    }}
                  />
                </RespondFromList.ContentLine>    
              </RespondFromList.FOS>  
            </React.Fragment> 
          : showType === 'respondFromTask' 
          ? <React.Fragment>
              <RespondFromList.FOS style={{ zIndex: 40 }}>
                <img
                  alt={""}
                  src={closeIcon}
                  style={closeIconCSS}
                  onClick={closeFos}
                />
                <RespondFromList.ContentLine>
                  <RespondFromList.Title>Откликнуться на задание</RespondFromList.Title>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <RespondFromList.SubTitle>Название задания</RespondFromList.SubTitle>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px' }}>
                  <span style={spanTitleCSS}>Срок выполнения</span>
                  <span style={spanDelimiterCSS} />
                  <span style={spanTitleCSS}>Стоимость</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE_DATE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"20.02.2023"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                  <span style={spanDelimiterCSS}/>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"200 000"}
                    isError={false}
                    isDisabled={false}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '20px' }}>
                  <span style={spanTitleCSS}>Комментарий</span>
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Ваш комментарий"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '0px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine>
                  <span style={{ ...spanDelimiterCSS, width: '50%' }} />
                  <span style={spanDelimiterCSS} />
                  <ButtonComponent
                    inner={"Откликнуться"} 
                    type="CONTAINED_DEFAULT" 
                    action={() => {}}
                    actionData={null}
                    widthType={"px"}
                    widthValue={172}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '33px'
                    }}
                  />
                </RespondFromList.ContentLine>   
              </RespondFromList.FOS>  
          </React.Fragment>
          : showType === 'inviteOnTeam' 
          ? <React.Fragment>
            <RespondFromList.FOS style={{ zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={closeIconCSS}
                onClick={closeFos}
              />
              <RespondFromList.ContentLine>
                <RespondFromList.Title style={{ marginBottom: '40px' }}>Пригласить в команду</RespondFromList.Title>
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine>
                <SelectField 
                  placeholder={"Выбрать исполнителя"}
                  params={{ width: 300, height: 50 }}
                  data={[]}
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
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine style={{ marginBottom: '15px', marginTop: '30px' }}>
                <span style={spanTitleCSS}>Предлагаемый гонорар</span>
              </RespondFromList.ContentLine> 
              <RespondFromList.ContentLine>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'px'}
                  widthValue={300}
                  heightValue={'50px'}
                  label={"50 000₽"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                  }}
                />
              </RespondFromList.ContentLine>
              <RespondFromList.ContentLine>
                  <InputComponent
                    type={'TEXT_INPUT_OUTLINE'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={100}
                    heightValue={'50px'}
                    label={"Ваш комментарий"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    css={{
                      fontSize: '12px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginBottom: '0px',
                      marginTop: '30px',
                    }}
                  />
                </RespondFromList.ContentLine>
                <RespondFromList.ContentLine style={{ justifyContent: 'space-around' }}>
                  <ButtonComponent
                    inner={"Отправить приглашение"} 
                    type="CONTAINED_DEFAULT" 
                    action={() => {}}
                    actionData={null}
                    widthType={"px"}
                    widthValue={265}
                    children={""}
                    childrenCss={{}}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: buttonColor,
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '50px',
                      marginBottom: '24px',
                    }}
                  />
                </RespondFromList.ContentLine> 
            </RespondFromList.FOS>
          </React.Fragment> 
          : showType === 'commandRoot' 
          ? <React.Fragment>
            <Command.FOS style={{ zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Отправлено приглашение</Command.SubTitle>
                  <Command.SubTitle style={{ textAlign: 'right' }}>Гонорар</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', opacity: 0.6 }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={resetDivCSS}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'flex-start', marginTop: '30px', marginBottom: '34px' }}>
                  <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px', cursor: 'pointer' }}>
                    <img
                      alt={""}
                      src={addUser}
                    />
                  </span>
                  <span style={{ cursor: 'pointer' }}>Пригласить в заказ</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '32px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <div style={resetDivCSS}>
                          <SelectField 
                            placeholder={"Выберите действие"}
                            params={{ width: 300, height: 50 }}
                            data={[]}
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
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Отменить приглашение</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <div style={{ ...resetDivCSS, opacity: '0.6' }}>
                    <img
                      alt={""}
                      src={cross}
                      style={{
                        display: 'block',
                        position: 'relative',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>Снять ответственного</span>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment>
          : showType === 'command' 
          ? <React.Fragment>
            <Command.FOS style={{ width: '666px', zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner style={{ width: '686px' }}>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment>
          : showType === 'commandShort' 
          ? <React.Fragment>
            <Command.FOS style={{ width: '666px', zIndex: 40 }}>
              <img
                alt={""}
                src={closeIcon}
                style={{ ...closeIconCSS, zIndex: 3 }}
                onClick={closeFos}
              />
              <Command.FOSInner style={{ width: '686px' }}>
                <Command.ContentLine>
                  <Command.Title style={{ marginBottom: '40px' }}>Команда</Command.Title>
                </Command.ContentLine>
                <Command.ContentLine>
                  <Command.SubTitle>Главный исполнитель</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={yellowColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>ИП</span>
                    </Command.NameContainer>
                  </div>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginBottom: '20px', marginTop: '40px' }}>
                  <Command.SubTitle style={{ color: blueColor2, marginBottom: '0px' }}>Все участники ({"4"})</Command.SubTitle>
                </Command.ContentLine>
                { Array(4).fill(0).map((item: number, index: number): ReactElement => {

                  return (
                    <React.Fragment>
                      <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={userContainerCSS}>
                          <Command.AvatarContainer>
                            <img
                              alt={""}
                              src={avatar}
                              style={avatarImageCSS}
                            />
                            <Command.AvatarContainerIndicator background={greenColor} />
                          </Command.AvatarContainer>
                          <Command.NameContainer>
                            <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                            <span style={nameSubtitleCSS}>Самозанятый</span>
                          </Command.NameContainer>
                        </div>
                        <span style={coastSpanCSS}>{"20 000₽"}</span>
                      </Command.ContentLine>
                    </React.Fragment>
                  )

                })}
                <Command.ContentLine style={{ marginBottom: '32px', marginTop: '18px' }}>
                  <Command.HorizontalDelimiter background={delimiterBackground} />
                </Command.ContentLine>  
                <Command.ContentLine>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Пожарная безопасность</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
                <Command.ContentLine style={{ marginTop: '8px' }}>
                  <Command.SubTitle style={{ marginBottom: '30px' }}>Сигнализация</Command.SubTitle>
                </Command.ContentLine>
                <Command.ContentLine style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={userContainerCSS}>
                    <Command.AvatarContainer>
                      <img
                        alt={""}
                        src={avatar}
                        style={avatarImageCSS}
                      />
                      <Command.AvatarContainerIndicator background={greenColor} />
                    </Command.AvatarContainer>
                    <Command.NameContainer>
                      <span style={nameTitlesCSS}>Петрова Наталья Викторовна</span>
                      <span style={nameSubtitleCSS}>Самозанятый</span>
                    </Command.NameContainer>
                  </div>
                  <span style={coastSpanCSS}>{"20 000₽"}</span>
                </Command.ContentLine>
              </Command.FOSInner>
            </Command.FOS>
          </React.Fragment> : <React.Fragment></React.Fragment>
        
        }

      </ShadowContainer>
    </React.Fragment>
  )
}

export default FOS