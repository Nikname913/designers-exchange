import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styled from 'styled-components'
import { ISelectStyleProps, ISelect } from '../../../../models-ts/comps/comps-models'

const Decorate = {
  SelectWrapper: styled.div<ISelectStyleProps>`
    display: block;
    position: relative;
    width: ${ props => props.styles.width }px;
    height: ${ props => props.styles.height}px;
    margin-top: ${ props => props.styles.mt };
    margin-bottom: ${ props => props.styles.mb };
    border-radius: ${ props => props.styles.borra };
  `
}

const ReactSelect: React.FC<ISelect> = (props: ISelect) => {

  const { 
    params, 
    placeholder = 'Выберите тип оплаты',
    data,
    action,
    actionType,
    actionParams,
    showIcon,
    icon,
    iconStyles,
    isDisabled,
    multy } = props

  const animatedComponents = makeAnimated()
  const selectStyles: Object = {

    control: (theme: Object) => ({
      ...theme,
      border: 'none',
      outline: 'none',
      boxShadow: '0px 0px 1.5px grey',
      minHeight: '50px',
      fontSize: '14px',
      paddingBottom: '1px',
      paddingTop: '1px',
      borderRadius: '4px',
      paddingLeft: icon === null ? '0px' : '30px'
    }),
    placeholder: (theme: Object) => ({
      ...theme,
      paddingLeft: '4px',
      paddingBottom: '2px'
    }),
    singleValue: (theme: Object) => ({
      ...theme,
      paddingLeft: '4px'
    }),
    input: (theme: Object) => ({
      ...theme,
      paddingLeft: '4px',
    }),
    menu: (theme: Object) => ({
      ...theme,
      overflow: 'hidden',
      paddingTop: 6,
      paddingBottom: 6,
      width: '90%',
      marginTop: 10,
      border: 'none',
      zIndex: 20
    }),
    option: (theme: Object) => ({
      ...theme,
      fontSize: '13px',
      padding: '12px 0',
      paddingLeft: '13px',
      paddingBottom: '12.8px',
      cursor: 'pointer',
      color: '#2E2E2E'
    }),
    multiValueLabel: (theme: Object) => ({
      color: '#2E2E2E',
      height: '30px',
      lineHeight: '30px',
      fontSize: '14px',
      paddingLeft: '10px',
      paddingRight: '3px',
    }),
    multiValueRemove: (theme: Object) => ({
      marginRight: '8px',
      marginLeft: '2px',
      marginTop: '8px'
    })

  }

  function actionsReducer(param: Object | string | []) {

    const acty = actionType
    switch(acty) {

      case 'AUTH_FACE_TYPE': 
        action(param)
        break

      case 'DISCOUNT_REDUCER': 
        action(!param)
        break

      default:
        break

    }

  }

  return (
    <Decorate.SelectWrapper styles={params}>

      { showIcon && <img

        alt={""}
        src={icon}
        style={{
          ...iconStyles,
          display: 'block',
          position: 'absolute',
          zIndex: '10',
          top: '50%',
          left: '0%',
        }}

      /> }
      
      <Select 
        isMulti={multy}
        isDisabled={ isDisabled ? isDisabled : false }
        components={animatedComponents}
        options={ data && data }
        placeholder={placeholder}
        styles={selectStyles}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#F7F7F7',
            primary25: '#F7F7F7',
          }
        })}
        onChange={inputValue => {
          action && actionsReducer(
            inputValue.label === 'Индивидуальный предприниматель' ? 'IP_FACE'
            : inputValue.label === 'Юридическое лицо' ? 'IP_FACE' 
            : inputValue.label === 'Физическое лицо' ? 'PHIS_FACE' 
            : inputValue.label === 'Самозанятый' ? 'SELF_FACE' : ''
          )
          false && console.log(actionParams)
        }}
      />
    
    </Decorate.SelectWrapper>
  )

}

export default ReactSelect