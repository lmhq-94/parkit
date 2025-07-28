import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { client } from '@/lib/apollo';

function AppContent({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <CustomThemeProvider>
          <AppContent {...props} />
        </CustomThemeProvider>
      </LanguageProvider>
    </ApolloProvider>
  );
}
