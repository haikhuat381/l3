import moment from "moment";

export const formatDateView = (date) => {
    return moment(date).format("DD-MM-YYYY")
}

export const formatDateSend= (date) => {
    return moment(date).format("YYYY-MM-DD")
}
