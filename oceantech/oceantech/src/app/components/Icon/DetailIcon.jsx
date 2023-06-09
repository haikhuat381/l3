import { Icon, IconButton, Tooltip } from "@mui/material";
import { statusOfDetailIcon } from "app/constant";

export default function DetailIcon({ onClick, title, status }) {
  return (
    <>
      {
        (statusOfDetailIcon.includes(status)) &&
          <Tooltip title={title ? title : "Xem chi tiết"}>
            <span>
              <IconButton
                onClick={onClick}
              >
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </span>
          </Tooltip>
      }
    </>
  )
}