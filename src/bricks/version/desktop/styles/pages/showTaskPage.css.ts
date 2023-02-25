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
    padding: 30px;
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
  `,
  WhiteContainerContentLine: styled.div<{ justify: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.justify};
    position: relative;
    width: 100%;
    box-sizing: border-box;
  `,
  WhiteContainerTitle: styled.span`
    display: block;
    position: relative;
    font-size: 16px;
    font-weight: bold;
    margin: 0px;
  `,
  AvatarContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 50px;
    height: 50px;
  `,
  AvatarStatusIndicator: styled.span<{ background: string }>`
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.background};
    left: 100%;
    margin-left: -12px;
    top: 100%;
    margin-top: -12px;
  `,
  NameContainer: styled.span`
    display: block;
    position: relative;
    font-size: 18px;
    margin-left: 20px;
  `,
  SearchStatusIndicator: styled.span<{ background: string }>`
    display: block;
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.background};
    margin-right: 10px;
  `,
  FileIconContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 18%;
    cursor: pointer;
  `,
  FileIconTitle: styled.span<{ color: string }>`
    display: block;
    position: relative;
    width: 100%;
    font-size: 12px;
    padding-left: 10px;
    margin-top: 20px;
    color: ${props => props.color};
  `,
  FileIconSize: styled.span<{ color: string }>`
    display: block;
    position: relative;
    width: 100%;
    font-size: 12px;
    padding-left: 10px;
    margin-top: 5px;
    color: ${props => props.color};
  `,
  CommandButton: styled.span<{ background: string }>`
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background-color: ${props => props.background};
    font-size: 14px;
    font-weight: normal;
    line-height: 34px;
    text-align: right;
    top: 0%;
    left: 100%;
    margin-top: -7px;
    margin-left: 20px;
    padding-right: 14px;
    cursor: pointer;
  `
}

export default css

