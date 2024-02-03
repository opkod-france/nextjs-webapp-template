import { SidebarItemsType } from "@/src/types/sidebar";
import SidebarNavListItem from "./SidebarNavListItem";

interface SidebarNavListProps {
  depth: number;
  pages: SidebarItemsType[];
}

const SidebarNavList = (props: SidebarNavListProps) => {
  const { pages, depth } = props;

  return (
    <>
      {pages.map((page) => (
        <SidebarNavListItem
          depth={depth}
          href={page.href}
          icon={page.icon}
          key={page.key}
          badge={page.badge}
          title={page.title}
          id={page.key}
        />
      ))}
    </>
  );
};

export default SidebarNavList;
