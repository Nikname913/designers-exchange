import styled from 'styled-components'

const css = {
  Container: styled.div<{ background?: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    height: 40px;
    background-color: ${props => props.background ? props.background : 'white'};
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 0 18px;
    cursor: pointer;
  `,
  MenuListItem: styled.span`
    display: block;
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 38px;
    padding-left: 13px;
    font-size: 13px;
    :hover {
      cursor: pointer;
      background-color: #F2F4FC;
    }
  `
}

export default css