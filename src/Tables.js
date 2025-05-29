import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Tables(props) {
  const { meiji, taishou, shouwa } = props.date.limit;
  const currentYear = props.date.thisYear;
  const { increment, decrement } = props;
  
  // State for managing the infinite scroll data
  const [years, setYears] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Initialize years around current year
  useEffect(() => {
    const initialYears = [];
    const startYear = currentYear - 50; // Start 50 years before current year
    for (let i = 0; i < 100; i++) {
      initialYears.push(startYear + i);
    }
    setYears(initialYears);
  }, [currentYear]);

  // Function to calculate wareki (Japanese era) string
  const wareki_str = (anno) => {
    let str = "";
    if (anno <= 1867) {
      str = "-";
    } else if (anno < meiji) {
      str = `明治${anno - 1867}年`;
    } else if (anno < taishou) {
      str = `大正${anno - 1911}年`;
    } else if (anno < shouwa) {
      str = `昭和${anno - 1925}年`;
    } else if (anno < 2019) {
      str = `平成${anno - 1988}年`;
    } else {
      str = `令和${anno - 2018}年`;
    }
    return str;
  };

  // Function to calculate Reiwa era string
  const reiwa_str = (anno) => {
    let str = "";
    const reiwaPeriod = anno - 2018;
    if (reiwaPeriod <= 0) {
      str = "-";
    } else {
      str = `令和${reiwaPeriod}年`;
    }
    return str;
  };

  // Function to determine CSS class
  const class_name = (anno) => {
    let str = "";
    if (anno % 10 === 0) {
      str = "demilita";
    } else if (anno === currentYear) {
      str = "this_year";
    }
    return str;
  };

  // Load more years when scrolling down
  const fetchMoreData = () => {
    const newYears = [];
    const lastYear = years[years.length - 1];
    for (let i = 1; i <= 20; i++) {
      newYears.push(lastYear + i);
    }
    setYears(prevYears => [...prevYears, ...newYears]);
  };

  // Load more years when scrolling up (prepend to beginning)
  const loadPreviousYears = () => {
    const newYears = [];
    const firstYear = years[0];
    for (let i = 20; i >= 1; i--) {
      newYears.push(firstYear - i);
    }
    setYears(prevYears => [...newYears, ...prevYears]);
  };

  return (
    <div className="table">
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <button 
          onClick={loadPreviousYears}
          style={{ 
            padding: '8px 16px', 
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          過去の年を読み込む
        </button>
      </div>
      
      <InfiniteScroll
        dataLength={years.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>読み込み中...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>すべての年を表示しました</b>
          </p>
        }
        height={600}
        style={{ overflow: 'auto' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {years.map((anno, i) => {
              return (
                <tr key={`${anno}-${i}`}>
                  <td className={class_name(anno)} style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {anno}年
                  </td>
                  <td className={class_name(anno)} style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {wareki_str(anno)}
                  </td>
                  <td className={class_name(anno)} style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {reiwa_str(anno)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
export default Tables;
