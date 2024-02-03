import { frFR as coreFrFR } from '@mui/material/locale';
import { createTheme as createMuiTheme, Theme } from '@mui/material/styles';
import { frFR as dataGridFrFR } from '@mui/x-data-grid-pro';
import { frFR } from '@mui/x-date-pickers/locales';

import breakpoints from './breakpoints';
import components from './components';
import shadows from './shadows';
import typography from './typography';
import variants from './variants';

interface ITheme extends Theme {
  name?: string;
}

const createTheme = (name: string): ITheme => {
  let themeConfig = variants.find(variant => variant.name === name);

  if (!themeConfig) {
    // eslint-disable-next-line no-console
    console.warn(new Error(`The theme ${name} is not valid`));
    themeConfig = variants[0];
  }

  return createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      components,
      typography,
      shadows,
      palette: themeConfig.palette,
    },
    {
      name: themeConfig.name,
      header: themeConfig.header,
      footer: themeConfig.footer,
      sidebar: themeConfig.sidebar,
    },
    frFR,
    dataGridFrFR,
    coreFrFR
  );
};

export default createTheme;
