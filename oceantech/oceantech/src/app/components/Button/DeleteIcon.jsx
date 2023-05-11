import { Icon, IconButton, Tooltip } from "@mui/material";

export default function DeleteIcon({ onClick }) {
    return (
        <Tooltip title="Xóa">
            <span>
                <IconButton
                    onClick={onClick}
                >
                    <Icon color="error">delete</Icon>
                </IconButton>
            </span>
        </Tooltip>
    )
}