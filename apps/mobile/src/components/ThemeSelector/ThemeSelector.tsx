import { useTheme } from '@/contexts/ThemeContext';
import {
  THEME_ICONS,
  THEME_MODES,
  THEME_NAMES,
  ThemeMode,
} from '@parkit/shared';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, Menu, Text } from 'react-native-paper';
import { styles } from './ThemeSelector.styles';

export default function ThemeSelector() {
  const { themeMode, setThemeMode } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleThemeChange = async (newTheme: ThemeMode) => {
    await setThemeMode(newTheme);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon='palette'
            size={24}
            onPress={openMenu}
            style={styles.iconButton}
          />
        }
        contentStyle={styles.menuContent}
      >
        {Object.entries(THEME_MODES).map(([key, value], index) => (
          <React.Fragment key={value}>
            <Menu.Item
              onPress={() => handleThemeChange(value as ThemeMode)}
              title={
                <View style={styles.menuItem}>
                  <Text style={styles.icon}>
                    {THEME_ICONS[value as ThemeMode]}
                  </Text>
                  <Text style={styles.themeName}>
                    {THEME_NAMES[value as ThemeMode]}
                  </Text>
                </View>
              }
              leadingIcon={themeMode === value ? 'check' : undefined}
            />
            {index < Object.keys(THEME_MODES).length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
}
