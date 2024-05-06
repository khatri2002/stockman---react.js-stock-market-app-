import { useEffect, useState } from "react";

import get_market_data from "../services/get_market_data";
import { formatMarketData, get_date_range } from "../helper/handle-market-data";

import { ReactComponent as LoadingIcon } from '../assets/images/loading_icon.svg';
import styles from "../assets/css/table-section.module.css";

function TableSection() {

    const [stockData, setStockData] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [index, setIndex] = useState({
        start: null,
        end: null
    });
    const [showloading, setShowLoading] = useState(true);

    useEffect(() => {
        get_market_data()
            .then((data) => {
                const stockData = data.data.reverse();
                const formattedData = formatMarketData(stockData);
                setStockData(formattedData);

                const startIndex = 0;
                const endIndex = formattedData.length < 7 ? formattedData.length : 7;
                setIndex({ start: startIndex, end: endIndex });

                const dateRange = get_date_range(stockData);
                setDateRange(dateRange);

                setShowLoading(false);
            })
            .catch((error) => {
                alert("Something went wrong. Please try again later.");
            });
    }, [])

    const handleNext = () => {
        let startIndex = index.start + 7;
        let endIndex = stockData.length < index.end + 7 ? stockData.length : index.end + 7;
        setIndex({
            start: startIndex,
            end: endIndex
        });
    }

    const handlePrev = () => {
        let startIndex = index.start - 7;
        let endIndex = index.end - 7;
        setIndex({
            start: startIndex,
            end: endIndex
        });
    }


    return (
        <>
            <div className={styles.tableSection}>
                <div className={styles.tableContainer}>
                    {
                        showloading
                            ?
                            <LoadingIcon className={styles.loadingIcon} />
                            :
                            <>
                                <h2>Market Data</h2>
                                <div className={styles.tableWrapper}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                {
                                                    dateRange.slice(index.start, index.end).map((date, index) => (
                                                        <th key={index}>{date}</th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>open</th>
                                                {
                                                    dateRange.slice(index.start, index.end).map((date, index) => {
                                                        const data = stockData.find(data => data.date === date);
                                                        if (data) {
                                                            return (
                                                                <td key={index} className={data.className.open}>
                                                                    {data.open}
                                                                </td>
                                                            );
                                                        } else {
                                                            return <td key={index}>NA</td>;
                                                        }
                                                    })
                                                }
                                            </tr>
                                            <tr>
                                                <th>close</th>
                                                {
                                                    dateRange.slice(index.start, index.end).map((date, index) => {
                                                        const data = stockData.find(data => data.date === date);
                                                        if (data) {
                                                            return (
                                                                <td key={index} className={data.className.close}>
                                                                    {data.close}
                                                                </td>
                                                            );
                                                        } else {
                                                            return <td key={index}>NA</td>;
                                                        }
                                                    })
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.tablePagination}>
                                    <span>
                                        {index.start + 1}
                                        -
                                        {index.end} of {stockData.length}
                                    </span>
                                    <div className={styles.btnContainer}>
                                        <button type="button" onClick={handlePrev} disabled={index.start === 0}>Previous</button>
                                        <button type="button" onClick={handleNext} disabled={index.end === stockData.length}>Next</button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div >
        </>
    );
}

export default TableSection;