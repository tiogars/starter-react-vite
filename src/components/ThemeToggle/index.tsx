import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeMode, selectThemeMode } from '../../store/themeSlice';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <Tooltip title={`Basculer vers le thème ${mode === 'light' ? 'sombre' : 'clair'}`}>
      <IconButton onClick={handleToggle} color="inherit">
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
