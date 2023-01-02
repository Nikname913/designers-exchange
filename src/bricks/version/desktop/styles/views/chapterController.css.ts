import styled from 'styled-components'
import { IChapterControllerStyleProps,
  IChapterControllerRoundStyleProps,
  IChapterControllerRoundPlusStyleProps } from '../../../../models-ts/styles/chapter-controller-styles-models'

const css = {
  ChapterContainerLine: styled.div<IChapterControllerStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: ${props => props.backgroundColor};
    width: calc(100% - 24px);
    height: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    margin-bottom: 44px;
  `,
  ChapterContainerStepRound: styled.div<IChapterControllerRoundStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor};
    border: 2px solid white;
    cursor: pointer;
  `,
  ChapterContainerStepRoundPlus: styled.div<IChapterControllerRoundPlusStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor};
    border: 2px solid white;
    cursor: pointer;
  `,
  ChapterContainerStepRoundInner: styled.span`
    display: block;
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: white;
  `,
  ChapterContainerStepRoundLabelText: styled.span<{ textAlign: string }>`
    display: block;
    position: absolute;
    line-height: 17px;
    text-align: ${props => props.textAlign};
  `
}

export default css