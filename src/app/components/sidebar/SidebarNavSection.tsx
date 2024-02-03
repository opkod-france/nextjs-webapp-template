import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';



import SidebarNavList from './SidebarNavList';
import { SidebarItemsType } from '@/src/types/sidebar';

const Title = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  font-size: ${props => props.theme.typography.caption.fontSize};
  padding: ${props => props.theme.spacing(4)} ${props => props.theme.spacing(7)}
    ${props => props.theme.spacing(1)};
  opacity: 0.4;
  text-transform: uppercase;
  display: block;
`;

interface SidebarNavSectionProps {
  // className?: Element;
  component?: React.ElementType;
  pages: SidebarItemsType[];
  title?: string;
  key: React.Key;
}

const SidebarNavSection = (props: SidebarNavSectionProps) => {
  const {
    title,
    pages,
    // className,
    component: Component = 'nav',
    ...rest
  } = props;

  return (
    <Component {...rest}>
      {title && <Title variant='subtitle2'>{title}</Title>}
      <SidebarNavList pages={pages} depth={0} />
    </Component>
  );
};

export default SidebarNavSection;
