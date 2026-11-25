import { createGlobalStyle, css } from 'styled-components';

export const themeColors = {
  gray: {
    900: '#16191D',
    800: '#1B1E22',
    700: '#24272B',
    600: '#3B3E41',
    500: '#71757A',
  },
  white: { itself: '#FFFFFF' },
  blue: { 600: '#0284C7', 500: '#0EA5E9', 400: '#38BDF8' },
  green: { 500: '#10B981' },
  hex2Rgba(hex: string, alpha: number) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};

export const xlBody = css`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
`;

export const lBody = css`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export const mBody = css`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

export const sBody = css`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      //border:1px solid red !important;
  }
  
  body {
    overflow-x: hidden;
    font-family: 'Satoshi', sans-serif;
    ${mBody};

    color-scheme: light dark;
    color: ${themeColors.white.itself};
    background-color: ${themeColors.gray['900']};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  h1 {
    margin: 0 0 24px 0;
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    line-height: 56px;
  }

  h2 {
    margin: 0 0 16px 0;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 40px;
  }
  
  button {
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;

    &[disabled] {
      cursor: not-allowed;
    }
  }

  .container {
      --offset-x: 24px;    

      max-width: calc(var(--offset-x) * 2 + 1024px);
      padding-left: var(--offset-x);
      padding-right: var(--offset-x);
      margin: 0 auto;
      width: 100%;
  }

  .text-overflow {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
  }
  
  .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
  }
  
   @media screen and (max-width: 768px) {
       .container {
           --offset-x: 16px;
       }
   }
`;

export default GlobalStyle;
