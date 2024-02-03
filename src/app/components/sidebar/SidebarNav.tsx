import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import ReactPerfectScrollbar from 'react-perfect-scrollbar';



import SidebarNavSection from './SidebarNavSection';
import { SidebarItemsType } from '@/src/types/sidebar';

const baseScrollbar = (props: any) => css`
  background-color: ${props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
`;

const Scrollbar = styled.div`
  ${baseScrollbar}
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)};
  padding-bottom: ${props => props.theme.spacing(2.5)};
`;

interface SidebarNavProps {
  items: {
    title?: string;
    pages: SidebarItemsType[];
    key: string;
  }[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar;

  return (
    <ScrollbarComponent>
      <List disablePadding>
        <Items>
          {items &&
            items.map(item => (
              <SidebarNavSection
                component='div'
                key={item.key}
                pages={item.pages}
                title={item.title}
              />
            ))}
        </Items>
      </List>
    </ScrollbarComponent>
  );
};

export default SidebarNav;
