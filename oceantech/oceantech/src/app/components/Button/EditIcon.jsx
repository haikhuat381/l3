import { Icon, IconButton, Tooltip } from "@mui/material";

export default function EditIcon({ onClick }) {
    return (
        <Tooltip title="Sửa">
            <span>
                <IconButton onClick={onClick}>
                    <Icon color="primary">edit</Icon>
                </IconButton>
            </span>
        </Tooltip>
    )
}