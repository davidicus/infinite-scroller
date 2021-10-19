import * as React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function ModeSwitch() {
  // Dark mode state
  const [darkMode, setDarkMode] = React.useState(true);

  const handleChange = () => {
    document.querySelector('body').classList.toggle('light');
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="app-theme-toggle">
      {darkMode ? (
        <Tooltip title="Toggle light mode">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleChange}
          >
            <WbSunnyIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Toggle dark mode">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleChange}
          >
            <Brightness2Icon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default ModeSwitch;
