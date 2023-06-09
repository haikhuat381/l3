import { messageOfNoData, endDateBeforeStartDate, endDateAfterCurrentDate, startDateAfterEndDate, startDateAfterCurrentDate, formatDateSend } from "app/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const transformStatusToValue = (status, value1, value2) => {
    const results = status ? value1 : value2;
    return results;
};

export const getValue = (value, status) => {
    const noDataMessage = transformStatusToValue(status, messageOfNoData, "");
    return value || noDataMessage;
};

const isDateAfter = (date1, date2) => {
    return date1 > date2;
};

const isEndDateBeforeStartDate = (startDate, endDate) => {
    return isDateAfter(startDate, endDate);
};

const isEndDateInvalid = (endDate) => {
    return isDateAfter(endDate, formatDateSend(new Date()));
};

const isStartDateAfterEndDate = (startDate, endDate) => {
    return isDateAfter(startDate, endDate);
};

const isStartDateInvalid = (startDate) => {
    return isDateAfter(startDate, formatDateSend(new Date()));
};

export const handleEndDateChange = (workExperience, endDate) => {
    if (isEndDateBeforeStartDate(workExperience.startDate, endDate)) {
        toast.warning(endDateBeforeStartDate);
        return false;
    }
    if (isEndDateInvalid(endDate)) {
        toast.warning(endDateAfterCurrentDate);
        return false;
    }
    return true;
};

export const handleStartDateChange = (workExperience, startDate) => {
    if (isStartDateAfterEndDate(startDate, workExperience.endDate)) {
        toast.warning(startDateAfterEndDate);
        return false;
    }
    if (isStartDateInvalid(startDate)) {
        toast.warning(startDateAfterCurrentDate);
        return false;
    }
    return true;
};