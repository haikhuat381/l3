import { Icon, IconButton, Tooltip } from "@mui/material";
import { statusOfInfoIcon } from "app/constant";

export default function InfoIcon({ onClick, status }) {
    return (
        <>
            {statusOfInfoIcon.includes(status) &&
                <Tooltip title="Thông tin">
                    <span>
                        <IconButton
                            onClick={onClick}
                        >
                            <Icon
                                style={{ color: "#EED370" }}
                            >
                                report
                            </Icon>
                        </IconButton>
                    </span>
                </Tooltip>
            }
        </>
    )
}