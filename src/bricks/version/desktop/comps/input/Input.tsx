import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import Search from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { IInput } from '../../../../models-ts/comps/comps-models'
import css from './input-style'

const { InputWrapper } = css

const InputComponent: React.FC<IInput> = (props: IInput) => {

  const { 
    type,
    css,
    widthType,
    widthValue,
    heightValue,
    valueType,
    required,
    isError,
    isDisabled,
    label,
    innerLabel,
    labelShrinkLeft } = props

  interface IState {
    showPassword: boolean,
    password: string
  }

  const [ values, setValues ] = useState<IState>({
    showPassword: false,
    password: ''
  })

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {}, /* placeholder стилизуется тут */
    '& .MuiInputLabel-shrink': {
      marginLeft: labelShrinkLeft,
    },
    '& .MuiInputBase-input': {
      fontSize: '15px',
    },
    '& .MuiOutlinedInput-input': {
      paddingBottom: '18px',
    },
    '& .MuiInput-root:before': {
      borderBottom: '1px solid #2E2E2E',
      fontSize: '15px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '15px',
      marginLeft: '2px',
      marginTop: heightValue === '50px'
        ? '-2.6px' 
        : heightValue === '56px'
        ? '-0.4px' : '-2.6px',
    },
    '& label.Mui-focused': {
      color: '#2E2E2E',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#2E2E2E',
    },
    '& .MuiOutlinedInput-root': {
      height: heightValue,
        '& fieldset': {},
        '&:hover fieldset': {},
        '&.Mui-focused fieldset': {
          borderColor: '#167CBF'
        },
    },
  })

  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const clickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <React.Fragment>
      <InputWrapper isPercent={widthType} width={widthValue}>

        { type === 'TEXT_INPUT_LINE'
          ? <CustomTextField 
              type={valueType}
              id="standard-basic" 
              label={label} 
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              variant="standard"
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE'
          ? <CustomTextField 
              type={valueType}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_PASSWORD'
          ? <CustomTextField 
              type={'password'}
              required={required}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'
          ? <CustomTextField 
              type={values.showPassword ? 'text' : 'password'}
              defaultValue={"qwerty12345"}
              required={required}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '0px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <Visibility></Visibility>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_SEARCH'
          ? <CustomTextField 
              type={'text'}
              defaultValue={""}
              required={required}
              autoComplete={"off"}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '-6px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <Search></Search>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_DATE'
          ? <CustomTextField 
              type={'text'}
              defaultValue={""}
              required={required}
              autoComplete={"off"}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton 
                      style={{ marginRight: '-6px' }} 
                      edge="end"
                      onClick={clickShowPassword}
                      onMouseDown={mouseDownPassword}
                    >
                      <CalendarTodayIcon></CalendarTodayIcon>
                    </IconButton>
                  </InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_SEARCH'
          ? <CustomTextField 
              type={'search'}
              required={required}
              defaultValue={"Поиск по сайту"}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : type === 'TEXT_INPUT_OUTLINE_INLABEL'
          ? <CustomTextField 
              type={valueType}
              required={required}
              id="standard-basic" 
              label={label}
              error={isError}
              disabled={isDisabled}
              autoComplete={"off"}
              InputProps={{
                endAdornment: 
                  <InputAdornment 
                    position="end"
                    style={{ marginRight: '6px' }}
                  >{ innerLabel }</InputAdornment>
              }}
              style={{
                ...css,
                width: '100%'
              }} 
            />
          : <React.Fragment></React.Fragment> }
      </InputWrapper>
    </React.Fragment>
  )

}

export default InputComponent