import { useTheme } from "@emotion/react"
import { PersonAddAlt1Rounded } from "@mui/icons-material"
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"

const AddUserToGroup = (props) => {

  const { palette } = useTheme();

  const listButtonStyles = {
    marginTop: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "10px",
  }

  const handleClick = () => {
    
  }

  return (
    // <div>add user</div>

    <ListItemButton sx={listButtonStyles} onClick={(event) => handleClick()}>
      <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: '#58bf71' }}>
            <PersonAddAlt1Rounded />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<div>
          <Typography>Add users</Typography>
        </div>} />
      </ListItem>
    </ListItemButton>

  )
}

export default AddUserToGroup;