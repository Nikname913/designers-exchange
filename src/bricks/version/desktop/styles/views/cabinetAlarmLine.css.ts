import styled from "styled-components"

const css = {
  AlarmContainer: styled.div<{ background: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    min-height: 30px;
    border-radius: 8px;
    background-color: ${props => props.background};
    margin-bottom: 10px;
    padding: 18px;
  `
}

export default css
