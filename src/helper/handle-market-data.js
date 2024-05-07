import moment from 'moment';
import styles from '../assets/css/table-section.module.css';

// Function to format the market data, and add class names to the open and close prices
export const formatMarketData = (stockData) => {
    const formattedData = stockData.map((data, index) => {
        const previousDay = stockData[index - 1];
        const className = {
            open: "",
            close: ""
        };

        if (index > 0) {
            if (data.open >= previousDay.close) {
                className.open = styles.success;
            } else if (data.open < previousDay.close) {
                className.open = styles.danger;
            }
        }

        if (data.close > data.open) {
            className.close = styles.success;
        } else if (data.close < data.open) {
            className.close = styles.danger;
        }

        return {
            ...data,
            date: moment(data.date).format('DD-MM-YYYY'),
            className: className
        };
    });
    return formattedData;
};

// Function to get the date range from the market data
export const get_date_range = (stockData) => {
    const dates = stockData.map(obj => new Date(obj.date));
    const maxDate = new Date(Math.max.apply(null, dates));
    const minDate = new Date(Math.min.apply(null, dates));
    let dateRange = [];
    for (let date = new Date(minDate); date <= maxDate; date.setDate(date.getDate() + 1)) {
        dateRange.push(moment(date).format('DD-MM-YYYY'));
    }
    return dateRange;
}