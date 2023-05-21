import { PersonAddAlt1Rounded } from "@mui/icons-material"
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"

const AddUserToGroupOption = (props) => {

  const listButtonStyles = {
    marginTop: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "10px",
  }

  const handleClick = () => {
    props.openAddUsers();
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

AddUserToGroupOption.defaultProps = {
  openAddUsers: () => {}
}

export default AddUserToGroupOption;