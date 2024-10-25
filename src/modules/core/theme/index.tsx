/* eslint-disable react/prop-types */
import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'

import { Locale } from 'antd/lib/locale'
import es_ES from 'antd/locale/es_ES'
import en_US from 'antd/locale/en_US'
import pt_BR from 'antd/locale/pt_BR'


import { COLOR_PALETTE } from '../constants'
import { useLanguageStore } from '../zustand/useTranslate'

interface ICustomConfigProviderProps {
  children: React.ReactNode
}

/**
 * Proveedor de configuración personalizada
 * @param {React.ReactNode} children - Los elementos secundarios a ser renderizados dentro del proveedor
 *
 */
const ThemeProvider: React.FC<ICustomConfigProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>(en_US)

  const { language } = useLanguageStore()

  useEffect(() => {
    switch (language) {
      case 'es':
        setLocale(es_ES)
        break
      case 'en':
        setLocale(en_US)
        break
      case 'pt':
        setLocale(pt_BR)
        break
    }
  }, [language])

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: COLOR_PALETTE.PRIMARY[500],
          fontFamily: 'Montserrat',
        },
        components: {
          Layout: {
            siderBg: COLOR_PALETTE.PRIMARY[900],
            triggerBg: COLOR_PALETTE.PRIMARY[900],
          },

          Input: {
            activeBorderColor: 'rgb(146, 155, 216)',
            hoverBorderColor: 'rgb(96, 110, 198)',
            colorError: 'rgb(240, 78, 72)',
            colorErrorBorderHover: 'rgb(254, 204, 202)',
            colorErrorText: 'rgb(221, 44, 37)',
            colorPrimary: 'rgb(65, 81, 187)',
            colorWarning: 'rgb(255, 184, 34)',
            colorWarningText: 'rgb(245, 159, 19)',
            colorWarningBg: 'rgb(255, 250, 235)',
            colorWarningBgHover: 'rgba(254, 230, 172, 0.61)',
            fontFamily: 'Montserrat',
            borderRadius: 4,
            borderRadiusLG: 6,
            colorBgContainerDisabled: 'rgb(242, 243, 247)',
            colorTextDisabled: 'rgb(192, 196, 210)',
            colorBorder: 'rgb(192, 196, 210)',
          },
          InputNumber: {
            activeBorderColor: 'rgb(146, 155, 216)',
            hoverBorderColor: 'rgb(96, 110, 198)',
            colorError: 'rgb(240, 78, 72)',
            colorErrorBorderHover: 'rgb(254, 204, 202)',
            colorErrorText: 'rgb(221, 44, 37)',
            colorPrimary: 'rgb(65, 81, 187)',
            colorWarning: 'rgb(255, 184, 34)',
            colorWarningText: 'rgb(245, 159, 19)',
            colorWarningBg: 'rgb(255, 250, 235)',
            colorWarningBgHover: 'rgba(254, 230, 172, 0.61)',
            fontFamily: 'Montserrat',
            borderRadius: 4,
            borderRadiusLG: 6,
            colorBgContainerDisabled: 'rgb(242, 243, 247)',
            colorTextDisabled: 'rgb(192, 196, 210)',
            colorBorder: 'rgb(192, 196, 210)',
          },
          Select: {
            optionSelectedBg: 'rgb(231, 233, 247)',
            colorPrimary: 'rgb(65, 81, 187)',
            optionSelectedColor: 'rgb(18, 38, 170)',
            colorError: 'rgb(240, 78, 72)',
            colorErrorBorderHover: 'rgb(254, 204, 202)',
            colorErrorText: 'rgb(221, 44, 37)',
            colorWarning: 'rgb(255, 184, 34)',
            colorWarningText: 'rgb(245, 159, 19)',
            colorWarningBg: 'rgb(255, 250, 235)',
            colorWarningBgHover: 'rgba(254, 230, 172, 0.61)',
            fontFamily: 'Montserrat',
            borderRadius: 4,
            borderRadiusLG: 6,
            colorBgContainerDisabled: 'rgb(242, 243, 247)',
            colorTextDisabled: 'rgb(192, 196, 210)',
            colorBorder: 'rgb(192, 196, 210)',
          },
          Pagination: {
            borderRadius: 999,
            borderRadiusLG: 999,
            borderRadiusSM: 999,
            itemActiveBg: 'rgb(16, 35, 155)',
            itemActiveBgDisabled: 'rgb(232, 234, 243)',
            itemActiveColorDisabled: 'rgb(192, 196, 210)',
            colorPrimaryHover: 'rgb(251, 251, 251)',
            colorPrimaryBorder: 'rgb(16, 35, 155)',
            colorPrimary: 'rgb(255, 255, 255)',
            colorText: 'rgb(77, 81, 99)',
            colorTextDisabled: 'rgb(150, 154, 172)',
            colorBorder: 'rgb(216, 219, 228)',
          },
          Dropdown: {
            colorError: 'rgb(240, 78, 72)',
            colorPrimary: 'rgb(18, 38, 170)',
            colorPrimaryBorder: 'rgb(146, 155, 216)',
            controlItemBgHover: 'rgb(231, 233, 247)',
            colorText: 'rgb(0, 0, 0)',
          },
          Radio: {
            colorPrimary: 'rgb(65, 81, 187)',
            colorPrimaryHover: 'rgb(18, 38, 170)',
            colorPrimaryActive: 'rgb(96, 110, 198)',
            colorPrimaryBorder: 'rgb(182, 188, 229)',
            colorText: 'rgb(0, 0, 0)',
            colorTextDisabled: 'rgb(216, 219, 228)',
            borderRadius: 4,
            borderRadiusLG: 6,
            colorBgContainerDisabled: 'rgba(216, 219, 228, 0.1)',
            colorBorder: 'rgb(192, 196, 210)',
          },
          DatePicker: {
            colorPrimary: 'rgb(65, 81, 187)',
            colorPrimaryBorder: 'rgb(231, 233, 247)',
            activeBorderColor: 'rgb(18, 38, 170)',
            hoverBorderColor: 'rgb(16, 35, 155)',
            cellActiveWithRangeBg: 'rgba(231, 233, 247, 0.8)',
            colorError: 'rgb(240, 78, 72)',
            colorErrorBg: 'rgb(254, 227, 226)',
            colorErrorBgHover: 'rgb(254, 227, 226)',
            colorErrorText: 'rgb(153, 31, 27)',
            colorErrorBorderHover: 'rgba(254, 204, 202, 0.5)',
            cellHoverWithRangeBg: 'rgb(231, 233, 247)',
            cellRangeBorderColor: 'rgb(146, 155, 216)',
            controlItemBgActive: 'rgb(231, 233, 247)',
            borderRadius: 4,
            borderRadiusLG: 6,
            colorBgContainerDisabled: 'rgb(242, 243, 247)',
            colorTextDisabled: 'rgb(192, 196, 210)',
            colorBorder: 'rgb(192, 196, 210)',
          },
          Menu: {
            colorBgBase: 'transparent',
            colorPrimaryBorder: 'rgb(182, 188, 229)',
            itemSelectedBg: 'rgb(16, 35, 155)',
            itemSelectedColor: 'rgb(255, 255, 255)',
            darkItemBg: 'rgb(16, 35, 155)',
            darkSubMenuItemBg: 'rgba(0, 12, 23, 0)',
            itemBorderRadius: 6,
            subMenuItemBorderRadius: 6,
            darkGroupTitleColor: 'rgb(255, 255, 255)',
            darkItemHoverBg: 'rgba(16, 35, 155, 0.40)',
          },
        },
      }}>
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
