import * as React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ModeSwitch() {
  // Dark mode state
  const [darkMode, setDarkMode] = React.useState(
    document.querySelector('body').classList.contains('dark')
  );

  // Add dark mode class
  const handleChange = () => {
    document.querySelector('body').classList.toggle('dark');
    setDarkMode((prev) => !prev);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={darkMode ? 'dark-mode' : 'light-mode'}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        value="light-mode"
        aria-label="Toggle light mode"
        className="app-bar__mode-switch"
      >
        <Tooltip title="Toggle light mode">
          <WbSunnyIcon size="small" sx={{ marginRight: '0.5rem' }} />
        </Tooltip>
        Light mode
      </ToggleButton>
      <ToggleButton
        value="dark-mode"
        aria-label="Toggle dark mode"
        className="app-bar__mode-switch"
      >
        <Tooltip title="Toggle dark mode">
          <NightlightIcon size="small" sx={{ marginRight: '0.5rem' }} />
        </Tooltip>
        Dark mode
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
