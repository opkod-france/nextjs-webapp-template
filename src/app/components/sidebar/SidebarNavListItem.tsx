import Link from "@/app/components/shared/Link";
import styled from "@emotion/styled";
import { SvgIconComponent } from "@mui/icons-material";
import {
  Chip,
  ListItemProps,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { rgba, darken } from "polished";
import React from "react";

interface ItemProps {
  activeclassname?: string;
  onClick?: () => void;
  to?: string;
  component?: typeof Link;
  depth: number;
}

const Item = styled(ListItemButton)<ItemProps>`
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    background-color: ${(props) => darken(0.3, props.theme.sidebar.background)};
    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

interface TitleInterface {
  depth: number;
}

const Title = styled(ListItemText)<TitleInterface>`
  margin: 0;
  span {
    color: ${(props) =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

interface SidebarNavListItemProps extends ListItemProps {
  className?: string;
  depth: number;
  href: string;
  icon?: SvgIconComponent;
  badge?: string;
  title?: string;
  id?: string;
}

const SidebarNavListItem = (props: SidebarNavListItemProps) => {
  const { title, href, depth = 0, icon: Icon, badge, id } = props;
  const pathname = usePathname();

  return (
    <Link href={href} data-testid={id}>
      <Item
        depth={depth}
        className={pathname == href ? "active" : ""}
        activeclassname="active"
      >
        {Icon && <Icon />}
        <Title depth={depth}>
          {title}
          {badge && <Badge label={badge} />}
        </Title>
      </Item>
    </Link>
  );
};

export default SidebarNavListItem;
