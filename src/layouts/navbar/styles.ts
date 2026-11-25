import { NavLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

import { FilecoinLogoFull as FilecoinLogoFullSvg } from 'src/assets/svg/filecoin-logo-full.tsx';
import { FilecoinLogo as FilecoinLogoSvg } from 'src/assets/svg/filecoin-logo.tsx';
import { Dropdown as DropdownNative } from 'src/components/dropdown';
import { mBody, themeColors } from 'src/styles/global';

export const Banner = styled.div`
  background: #78350f;
  color: #fef3c7;
  text-align: center;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1.5;
`;

export const Wrapper = styled.div`
  background: ${themeColors.gray['900']};
  border-bottom: 1px solid ${themeColors.gray['700']};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  gap: 16px;
  min-height: 96px;

  > div:first-child {
    margin-right: 64px;
  }

  @media screen and (max-width: 768px) {
    min-height: auto;
    flex-wrap: wrap;
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;

export const FilecoinLogo = styled(FilecoinLogoSvg)`
  display: none;
`;
export const FilecoinLogoFull = styled(FilecoinLogoFullSvg)`
  display: block;
  margin-right: 16px;
`;

export const LogoLink = styled(NavLink)`
  display: inline-flex;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    ${FilecoinLogo} {
      display: block;
    }
    ${FilecoinLogoFull} {
      display: none;
    }
  }
`;

const NavItemStyles = css`
  text-decoration: none;
  ${mBody};
  color: ${themeColors.gray['500']};

  &:hover,
  &:focus,
  &.active {
    color: ${themeColors.white.itself};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`;

export const NavItem = styled(NavLink)`
  ${NavItemStyles};
`;

export const NavItemExternal = styled.a`
  ${NavItemStyles};
`;

export const LeftContainer = styled.div<{ $isDashboard: boolean }>`
  margin-left: auto;
  display: flex;
  gap: 16px;
  align-items: center;

  @media screen and (max-width: 768px) {
    order: 3;
    margin-left: ${({ $isDashboard }) => ($isDashboard ? 'auto' : '0')};
    width: ${({ $isDashboard }) => ($isDashboard ? 'auto' : '100%')};
  }
`;

export const Dropdown = styled(DropdownNative)<{ $isDashboard: boolean }>`
  margin-left: ${({ $isDashboard }) => ($isDashboard ? 'auto' : '0')};

  @media screen and (max-width: 768px) {
    margin-left: auto;
  }
`;

// export const GithubLink = styled.a`
//   height: 48px;
//   width: 48px;
//   border: 1px solid ${themeColors.gray['700']};
//   padding: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
//   color: ${themeColors.white.itself};
//
//   &:focus,
//   &:hover {
//     background: ${themeColors.gray['700']};
//   }
//
//   @media screen and (max-width: 768px) {
//     margin-left: auto;
//     height: 40px;
//     width: 40px;
//   }
// `;

export const SearchForm = styled.form`
  display: flex;
  max-width: 340px;
  width: 100%;

  > div {
    flex-grow: 1;
  }

  input {
    height: 48px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;

    input {
      height: 40px;
    }
  }
`;
