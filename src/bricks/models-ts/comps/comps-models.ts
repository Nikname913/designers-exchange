import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { MouseEventHandler } from 'react'
import { OptionsOrGroups } from 'react-select'
import { CSSProperties } from 'styled-components'

export interface IButton {
  type: string,
  action: MouseEventHandler<HTMLButtonElement>,
  actionData: any,
  inner: string,
  css: Object,
  widthType: string,
  widthValue: number,
  children: string | null,
  childrenCss: CSSProperties | undefined,
  iconSrc: string | null,
  iconCss: CSSProperties | undefined,
  muiIconSize: number | null,
  MuiIconChildren: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
}

export interface IInput {
  type: string,
  widthType: string,
  widthValue: number,
  heightValue: string,
  css: Object,
  required: boolean,
  valueType: string,
  label: string,
  labelShrinkLeft: string,
  isError: boolean,
  isDisabled: boolean, 
  innerLabel: string | null
}

export interface IAlert {
  type: string,
  message: string,
  css: Object,
}

export interface IModal {
  type: string,
  title: string,
  message: string,
  isShow: boolean,
  action: any,
}

export interface ISelect {
  params: Object | CSSProperties,
  placeholder: string,
  data: OptionsOrGroups<any, any> | undefined,
  action: Function,
  actionType: string,
  actionParams: Object | string | [],
  showIcon: boolean,
  icon: any,
  iconStyles: CSSProperties,
  multy: boolean,
  isDisabled?: boolean
}

export interface IButtonStyleProps {
  isPercent: string,
  width: number,
}

export interface IInputStyleProps {
  isPercent: string,
  width: number,
}

interface ISelectStylePropsSub {
  width: number,
  height: number,
  mt: string,
  mb: string,
  borra: string
}

export interface ISelectStyleProps {
  styles: ISelectStylePropsSub | any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')