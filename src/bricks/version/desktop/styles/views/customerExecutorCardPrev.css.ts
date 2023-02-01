import styled from 'styled-components'
import { ICustExecContainer } from '../../../../models-ts/styles/cust-exec-card-prev-styles-models'

const css = {
  CardWrapper: styled.section<ICustExecContainer>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: ${prop => prop.width};
    height: ${prop => prop.height};
    background-color: ${prop => prop.backgroundColor};
    border-radius: 8px;
    padding: 30px;
    margin-bottom: ${prop => prop.mb ? prop.mb : '30px'};
    margin-right: ${prop => prop.mar ? prop.mar : '0px'};
  `,
  CardWrapperContentLine: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    height: auto;
  `,
  CardWrapperContentLineTags: styled.div<{ marginTop: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    height: auto;
    margin-top: ${props => props.marginTop};
  `,
  UserAvatar: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 84px;
    border-radius: 50%;
    margin-right: 40px;
  `,
  UserAvatarIsOnlineIndicator: styled.span<{ backgroundColor: string }>`
    display: block;
    position: absolute;
    top: 100%;
    left: 100%;
    margin-top: -15px;
    margin-left: -17px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor};
  `,
  UserTextInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    line-height: 23px;
    padding-right: 50px;
  `,
  UserName: styled.h3`
    display: block;
    position: relative;
    width: 100%;
    font-size: 18px;
    margin: 0px;
    margin-bottom: 3px;
  `,
  UserEmployment: styled.span<{ color: string }>`
    display: block;
    position: relative;
    color: ${props => props.color};
    margin: 0px;
    margin-bottom: 10px;
    font-size: 13px;
  `,
  RatingContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin-top: 34px;
  `,
  StatContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin-top: 26px;
    height: 40px;
    width: 100%;
    margin-left: 24px;
  `,
  StatContainerContent: styled.div`
    display: block;
    position: relative;
    height: 40px;
    padding-right: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  StatContainerDelimiter: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    width: 1px;
    height: 40px;
    background-color: ${props => props.backgroundColor};
    margin-right: 12px;
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
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 12px;
  `
}

export default css