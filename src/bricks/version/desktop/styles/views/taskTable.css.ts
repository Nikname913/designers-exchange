import styled from 'styled-components'
import { ITaskTableDelimiterStyleProps, 
  ITaskTableContainer,
  ITaskTableContainerInner } from '../../../../models-ts/styles/task-table-styles-models'

const css = {
  TaskContainer: styled.section<ITaskTableContainer>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '30px'};
    width: ${props => props.width ? props.width : '100%'};
    background-color: ${props => props.backgroundColor};
    height: ${props => props.height ? props.height : '400px'};
    border-radius: 8px;
  `,
  TaskContainerInner: styled.section<ITaskTableContainerInner>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: ${props => props.width ? props.width : '100%'};
    background-color: ${props => props.backgroundColor};
    height: ${props => props.height ? props.height : '400px'};
    border-radius: 8px;
    overflow: hidden;
  `,
  TaskContainerShadow: styled.div`
    display: block;
    position: absolute;
    width: 93.3333%;
    height: 100%;
    top: 0;
    left: 3.33335%;
    background-color: rgba(214, 221, 226, 0.6);
    filter: blur(10px);
    border-radius: 8px;
  `,
  TaskContainerContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 65%;
    height: 100%;
    padding: 30px;
  `,
  TaskContainerActions: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: 35%;
    height: 100%;
    padding: 30px;
    padding-left: 54px;
    padding-right: 54px;
    padding-bottom: 28px;
  `,
  TaskContainerVerticalDelimiter: styled.span<ITaskTableDelimiterStyleProps>`
    display: block;
    position: relative;
    width: 1px;
    height: 400px;
    background-color: ${props => props.backgroundColor};
  `,
  TACA: {
    TaskStatus: styled.span`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
      margin-bottom: 10px;
    `,
    TaskStatusIndicator: styled.span<{ background: string }>`
      display: block;
      position: absolute;
      width: 9px;
      height: 9px;
      left: 0;
      top: 50%;
      margin-top: -4px;
      margin-left: 1px;
      border-radius: 4px;
      background-color: ${props => props.background};
    `,
    TaskStatusLabel: styled.span<{ color: string }>`
      display: block;
      position: relative;
      font-size: 15px;
      color: ${props => props.color};
      padding-left: 18px;
    `,
    TaskCoast: styled.span<{ color: string }>`
      display: block;
      position: relative;
      width: 100%;
      font-size: 32px;
      color: ${props => props.color};
      font-weight: 700;
      text-align: left;
      margin-bottom: 9px;
    `,
    TaskSafeDeal: styled.span<{ color: string }>`
      display: block;
      position: relative;
      width: 100%;
      font-size: 16px;
      text-align: left;
      color: ${props => props.color};
      margin-bottom: 28px;
    `,
    TaskCoastString: styled.span<{ color: string, marginBottom: string }>`
      display: block;
      position: relative;
      width: 100%;
      font-size: 16px;
      text-align: left;
      color: ${props => props.color};
      margin-bottom: ${props => props.marginBottom};
      line-height: 24px;
    `,
    SafeDealParameters: styled.div<{ backgroundColor: string }>`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
      border-radius: 20px;
      height: 14px;
      overflow: hidden;
      background-color: ${props => props.backgroundColor};  
      margin-bottom: 13px;
    `,
    SafeDealParametersPrepaid: styled.span<{ backgroundColor: string }>`
      display: block;
      position: relative;
      width: 33.33333%;
      height: 14px;
      background-color: ${props => props.backgroundColor};
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      z-index: 2;
    `,
    SafeDealParametersExpert: styled.span<{ backgroundColor: string }>`
      display: block;
      position: absolute;
      width: 66.66666%;
      height: 14px;
      background-color: ${props => props.backgroundColor};
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    `,
    SafeDealParametersComplete: styled.span<{ backgroundColor: string }>`
      display: block;
      position: absolute;
      width: 100%;
      height: 14px;
      background-color: ${props => props.backgroundColor};
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    `
  },
  TACC: {
    TaskInitDate: styled.span<{ color: string }>`
      display: block;
      position: relative;
      width: 100%;
      font-size: 14px;
      color: ${props => props.color};
      margin-bottom: 24px;
    `,
    TaskTitle: styled.h3<{ color: string }>`
      display: block;
      position: relative;
      width: 100%;
      font-size: 20px;
      margin: 0;
      color: ${props => props.color};
      margin-bottom: 20px;
      line-height: 30px;
    `,
    TextContentLine: styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 12px;
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
      margin-top: 13px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    `
  }
}

export default css