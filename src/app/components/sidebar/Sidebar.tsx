import styled from "@emotion/styled";
import {
  Drawer as MuiDrawer,
  ListItemButton,
  Grid,
  Badge,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

import SidebarNav from "./SidebarNav";
import { SidebarItemsType } from "@/src/types/sidebar";
import Link from "@/app/components/shared/Link";
import Version from "@/app/components/shared/Version";

const Drawer = styled(MuiDrawer)`
  border-right: 0;
  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;
  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

export interface SidebarProps {
  PaperProps: {
    style: {
      width: any;
    };
  };
  variant?: "permanent" | "persistent" | "temporary";
  open?: boolean;
  onClose?: () => void;
  items: {
    title?: string;
    pages: SidebarItemsType[];
    key: string;
  }[];
  showFooter?: boolean;
}

const FooterBadge = (props: any) => (
  <Badge
    {...props}
    sx={{
      marginRight: (theme) => theme.spacing(1),
      "& span": {
        border: (theme) => `1.5px solid ${theme.palette.common.white}`,
        height: "12px",
        width: "12px",
        borderRadius: "50%",
      },
    }}
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    color="success"
    variant="dot"
  />
);
const FooterText = (props: any) => (
  <Typography
    {...props}
    sx={{
      color: (theme) => theme.palette.common.white,
    }}
    variant="body2"
  />
);

const FooterSubText = (props: any) => (
  <Typography
    {...props}
    sx={{
      color: (theme) => theme.palette.common.white,
      fontSize: "0.7rem",
      display: "block",
      padding: "1px",
    }}
    variant="caption"
  />
);

const Sidebar = ({ items, ...rest }: SidebarProps) => {
  const { data: sessionData } = useSession();
  return (
    <Drawer variant="permanent" {...rest}>
      <Link href="/protected/">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
            bgcolor:'transparent',
            textDecoration:'none'
          }}
        >
          <Brand>
            {/* <BrandIcon /> */}
            AstonMedical
            {/* <Box ml={1}>
            Mira <BrandChip label="PRO" />
          </Box> */}
          </Brand>
          <Version />
        </Box>
      </Link>
      <SidebarNav items={items} />
      <Grid
        container
        sx={{ backgroundColor: "rgb(30, 42, 56)" }}
        padding={3}
        spacing={2}
      >
        <Grid item>
          <FooterBadge>
            <Avatar alt={JSON.stringify(sessionData?.user?.name)}></Avatar>
          </FooterBadge>
        </Grid>
        <Grid item>
          {sessionData && (
            <>
              <FooterText color={"white"}>
                {sessionData?.user?.email}
              </FooterText>
              <FooterSubText color={"white"}>
                {sessionData?.user?.role_type}
              </FooterSubText>
            </>
          )}
          {!sessionData && (
            <>
              <FooterText>Lucy Lavender</FooterText>
              <FooterSubText>UX Designer</FooterSubText>
            </>
          )}
        </Grid>
      </Grid>
      {/* {!!showFooter && <Footer />} */}
    </Drawer>
  );
};

export default Sidebar;
