import { SidebarItemsType } from '@/src/types/sidebar';
import { People } from '@mui/icons-material';



export const pagesSection: SidebarItemsType[] = [
  {
    href: "/missions",
    title: "Missions",
    key: "missions-page",
  },
  {
    href: "/statistics",
    title: "Statistiques",
    key: "statistics-page",
  },
  {
    href: "/pilots",
    title: "Pilotes",
    key: "pilots-page",
  },
  {
    href: "/planes",
    title: "Avions",
    key: "planes-page",
  },
  {
    href: "/hospitals",
    title: "Hospitals",
    key: "hospitals-page",
  },
  {
    href: "/aiports",
    title: "Aiports",
    key: "aiports-page",
  },
];

export const adminSections: SidebarItemsType[] = [
  {
    href: '/admin/users',
    icon: People,
    title: 'Utilisateurs',
    key: 'admin-users-pages',
  },
];
