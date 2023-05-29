import { Box, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectTheme } from "../redux/features/uiModeSlice";

const ThemesList = () => {
  // the first element is the reference to theme settings
  // the second element will be displayed on the menu
  const themes = [
    ['purple', 'purple theme'],
    ['gold', 'gold theme'],
    ['pastelRed', 'pastel red theme'],
    ['skyBlue', 'sky blue theme']
  ];
  const dispatch = useDispatch();

  return (
    <Box>
      {themes.map((theme) => {
        return <MenuItem onClick={() => dispatch(selectTheme(theme[0]))}>{theme[1]}</MenuItem>
      })}
    </Box>
  )
}

export default ThemesList;