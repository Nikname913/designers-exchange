import styled from 'styled-components'
import { IInputStyleProps } from '../../../../models-ts/comps/comps-models'

const css = {
  InputWrapper: styled.div<IInputStyleProps>`
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