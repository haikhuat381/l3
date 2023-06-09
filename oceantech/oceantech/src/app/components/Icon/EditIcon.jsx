import { Icon, IconButton, Tooltip } from "@mui/material";
import { statusOfEditIcon } from "app/constant";

export default function EditIcon({ onClick, status }) {
    return (
        <>
            {
                statusOfEditIcon.includes(status) &&
                <Tooltip title="Sửa">
                    <span>
                        <IconButton onClick={onClick}>
                            <Icon color="primary">edit</Icon>
                        </IconButton>
                    </span>
                </Tooltip>
            }
        </>
    )
}