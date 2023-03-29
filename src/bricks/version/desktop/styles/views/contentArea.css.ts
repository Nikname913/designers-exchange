import styled from 'styled-components'
import { IContentAreaContainer } from '../../../../models-ts/styles/content-area-styles-models'

const css = {
  ContentArea: styled.section<IContentAreaContainer>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
    align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    position: relative;
    width: 100%;
    height: auto;
    padding-left: 200px;
    padding-right: 210px;
    box-sizing: border-box;
  `,
  ContentContainer: styled.section`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    width: calc(100% - 120px);
    box-sizing: border-box;
  `,
  CustExecContentInnerArea: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: space-between;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 420px);
    height: auto;
    padding-left: 16px;
  `,
  PageTitle: styled.h3`
    display: block;
    position: relative;
    font-size: 32px;
    margin-top: 28px;
    margin-bottom: 18px;
  `,
  BackwardButton: styled.span<{ color: string }>`
    display: block;
    position: relative;
    color: ${props => props.color};
    cursor: pointer;
  `
}

export default css