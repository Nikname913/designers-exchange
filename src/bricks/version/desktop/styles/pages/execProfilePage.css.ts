import styled from "styled-components"

const css = {
  ContentContainerLocal: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    alignItems: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    paddingLeft: 20px;
    height: auto;
    width: calc(100% - 300px);
  `,
  TagsContent: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background-color: white;
    border-radius: 8px;
    min-height: 40px;
    width: 100%;
    padding: 40px;
    padding-bottom: 30px;
    box-sizing: border-box;
  `,
  TagElement: styled.span<{ background: string }>`
    display: block;
    position: relative;
    border-radius: 4px;
    background-color: ${props => props.background};
    text-align: center;
    line-height: 36px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 12px;
  `,
  ReviewsContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background-color: white;
    border-radius: 8px;
    min-height: 40px;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  ReviewsContentLine: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
  `,
  ReviewContainer: styled.div<{ background: string }>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    min-height: 20px;
    border-radius: 2px;
    background-color: ${props => props.background};
    padding: 30px;
  `,
  Delimiter: styled.span<{ background: string }>`
    display: block;
    position: relative;
    width: 100%;
    height: 1px;
    background-color: ${props => props.background};
  `
}

export default css