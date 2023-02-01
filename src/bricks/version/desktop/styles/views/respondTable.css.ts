import styled from 'styled-components'
import { IRespondTableContainer } from '../../../../models-ts/styles/respond-table-styles-models'

const css = {
  RespondContainer: styled.section<IRespondTableContainer>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '30px'};
    width: ${props => props.width ? props.width : '100%'};
    background-color: ${props => props.backgroundColor};
    min-height: 80px;
    height: ${props => props.height ? props.height : '400px'};
    border-radius: 8px;
    padding: 30px;
  `,
  ContentLine: styled.div<{ justify?: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    position: relative;
    width: 100%;
  `,
  AvatarContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 84px;
    height 84px;
    border-radius: 50%;
    margin-right: 20px;
  `,
  UserName: styled.span`
    display: block;
    position: relative;
    font-size: 16px;
    line-height: 22px;
    width: 180px;
    margin-bottom: 5px;
  `,
  UserJobType: styled.span<{ color: string }>`
    display: block;
    position: relative;
    color: ${props => props.color};
    font-size: 12px;
  `,
  StatDelimeter: styled.span`
    display: block;
    position: relative;
    width: 1px;
    height: 100%;
    min-height: 38px;
    background-color: #EBEBEC;
    margin-left: 10px;
    margin-right: 10px;
  `,
  TagsContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    margin-left: 10px;
  `,
  SpecializationTag: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    background-color: ${props => props.backgroundColor};
    height: 38px;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    cursor: pointer;
    font-size: 12px;
  `
}

export default css