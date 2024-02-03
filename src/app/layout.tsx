
import MuiXLicense from "@/app/components/shared/MuiXLicense";
import DayJsLocalizationProvider from "@/app/context/DayJsLocalizationProvider";
import MuiThemeProvider from "@/app/context/MuiThemeProvider";
import NextAuthProvider from "@/app/context/NextAuthProvider";
import QueryClientProvider from "@/app/context/QueryClientProvider";
import "@/vendor/jvectormap.css";
import "@/vendor/perfect-scrollbar.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import dayjs from "dayjs";

import "dayjs/locale/fr";

dayjs.locale("fr");
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
      {/*  BaseLayout */}
      <head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryClientProvider>
          <NextAuthProvider>
            <DayJsLocalizationProvider>
              <AppRouterCacheProvider>
                <MuiThemeProvider>{children}</MuiThemeProvider>
              </AppRouterCacheProvider>
            </DayJsLocalizationProvider>
          </NextAuthProvider>
        </QueryClientProvider>
        <MuiXLicense />
      </body>
    </html>
  );
};
export default RootLayout;
