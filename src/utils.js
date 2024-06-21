import { format } from "date-fns";


export const formatDate = (timestamp) => {
    const date = new Date(timestamp.replace("/", "T"));
    return format(date, "MMM dd, HH:mm");
    // Without package method
    // const date = new Date(timestamp);
    // return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`;
};