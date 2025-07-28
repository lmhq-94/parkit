import { useLanguage } from '@/contexts/LanguageContext';
import {
  LANGUAGE_FLAGS,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '@parkit/shared';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, Menu, Text } from 'react-native-paper';
import { styles } from './LanguageSelector.styles';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    await setLanguage(newLanguage);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon='translate'
            size={24}
            onPress={openMenu}
            style={styles.iconButton}
          />
        }
        contentStyle={styles.menuContent}
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, value], index) => (
          <React.Fragment key={value}>
            <Menu.Item
              onPress={() => handleLanguageChange(value as SupportedLanguage)}
              title={
                <View style={styles.menuItem}>
                  <Text style={styles.flag}>
                    {LANGUAGE_FLAGS[value as SupportedLanguage]}
                  </Text>
                  <Text style={styles.languageName}>
                    {LANGUAGE_NAMES[value as SupportedLanguage]}
                  </Text>
                </View>
              }
              leadingIcon={language === value ? 'check' : undefined}
            />
            {index < Object.keys(SUPPORTED_LANGUAGES).length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
}
