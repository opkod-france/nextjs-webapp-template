import { SvgIconComponent } from '@mui/icons-material';

export type SidebarItemsType = {
  href: string;
  title?: string;
  icon?: SvgIconComponent;
  children?: SidebarItemsType[];
  badge?: string;
  key: string;
};
