import { MenuItem, Select } from '@material-ui/core';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  font-size: 24px !important;
  height: 30px !important;
  margin-left: 5px;

  ::before {
    border-bottom: none !important;
  }

  .MuiSelect-select {
    display: flex;
  }
`;

const Flag = styled.img`
  height: 25px;
  width: auto;
`;

const LanguageSelect: FC<Props> = ({ allLanguages }) => {
  const router = useRouter();
  const { t, lang } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (router.asPath === '/') {
      Router.pushI18n('/', '/', { lang: lng });
    } else {
      const routes = router.asPath.split('/');
      if (allLanguages.includes(routes[1])) {
        routes.splice(1, 1);
      }

      const route = routes.join('/') ? routes.join('/') : '/';

      Router.pushI18n(route, route, { lang: lng });
    }
  };

  return (
    <StyledSelect
      value={lang}
      onChange={(e) => changeLanguage(e.target.value as string)}
    >
      <MenuItem value="es">
        <Flag alt={t('common:spanish')} src="/flag_es.png" />
      </MenuItem>
      <MenuItem value="en">
        <Flag alt={t('common:english')} src="/flag_en.png" />
      </MenuItem>
      <MenuItem value="pt">
        <Flag alt={t('common:portuguese')} src="/flag_pt.png" />
      </MenuItem>
      <MenuItem value="de">
        <Flag alt={t('common:german')} src="/flag_de.png" />
      </MenuItem>
    </StyledSelect>
  );
};

export default LanguageSelect;

export interface Props {
  allLanguages: string[];
}