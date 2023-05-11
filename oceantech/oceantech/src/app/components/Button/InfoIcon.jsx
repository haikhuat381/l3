import { Icon, IconButton, Tooltip } from "@mui/material";

export default function InfoIcon({ onClick }) {
    return (
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
    )
}