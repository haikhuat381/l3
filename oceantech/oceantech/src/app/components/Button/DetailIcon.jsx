import { Icon, IconButton, Tooltip } from "@mui/material";

export default function DetailIcon({ onClick, title }) {
  return (
    <Tooltip title={title ? title : "Xem chi tiết"}>
      <span>
        <IconButton
          onClick={onClick}
        >
          <Icon color="success">visibilityIcon</Icon>
        </IconButton>
      </span>
    </Tooltip>
  )
}