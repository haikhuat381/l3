import { Icon, IconButton, Tooltip } from "@mui/material";
import { statusOfDeleteIcon } from "app/constant";
export default function DeleteIcon({ onClick, status }) {
    return (
        <>
            {
                statusOfDeleteIcon.includes(status) &&
                    <Tooltip title="Xóa">
                        <span>
                            <IconButton
                                onClick={onClick}
                            >
                                <Icon color="error">delete</Icon>
                            </IconButton>
                        </span>
                    </Tooltip>
            }
        </>
        
    )
}