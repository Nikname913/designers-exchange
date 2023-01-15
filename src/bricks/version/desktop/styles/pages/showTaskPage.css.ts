import styled from 'styled-components'
import { IWhiteContainer } from '../../../../models-ts/styles/show-task-page-styles-models'

const css = {
  WhiteContainer: styled.div<IWhiteContainer>`
    display: flex;
    flex-direction: ${props => props.flexParams.direction};
    align-items: ${props => props.flexParams.align};
    justify-content: ${props => props.flexParams.justify};
    position: relative;
    box-sizing: border-box;
    width: ${props => props.width};
    height: ${props => props.height ? props.height : 'auto'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
    border-radius: 8px;
  `,
  Content: styled.section`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: calc(100% - 120px);
    height: auto;
    margin-top: 20px;
  `,
  LeftMenuIconButton: styled.div<{ backgroundColor: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    border-radius: 8px;
    padding-left: 20px;
    background-color: ${props => props.backgroundColor};
    margin-bottom: 10px;
    cursor: pointer;
  `,
  LeftMenuLine: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    width: 100%;
    height: 1px;
    background-color: ${props => props.backgroundColor};
  `,
  SectionsContainer: styled.div`
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    background-color: white;
    padding: 0px 20px;
  `
}

export default css

