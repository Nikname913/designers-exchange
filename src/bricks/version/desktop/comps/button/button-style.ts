import styled from 'styled-components'
import { IButtonStyleProps } from '../../../../models-ts/comps/comps-models'

const css = {
  ButtonWrapper: styled.div<IButtonStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: ${props => props.isPercent === '%' ? props.width + '%' : props.width + 'px' }
  `
}

export default css