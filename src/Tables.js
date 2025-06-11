import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Tables(props) {
  const { meiji, taishou, shouwa } = props.date.limit;
  const currentYear = props.date.thisYear;
  const { increment, decrement } = props;
  
  // State for managing the infinite scroll data
  const [years, setYears] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const scrollContainerRef = useRef(null);
  const startY = useRef(0);
  const isDragging = useRef(false);

  // Initialize years around current year
  useEffect(() => {
    const initialYears = [];
    const startYear = currentYear - 50; // Start 50 years before current year
    const maxYear = currentYear + 10; // 現在年+10年まで
    
    for (let i = 0; i < 100; i++) {
      const year = startYear + i;
      if (year <= maxYear) {
        initialYears.push(year);
      } else {
        setHasMore(false); // 制限に達したら無限スクロールを停止
        break;
      }
    }
    setYears(initialYears);
  }, [currentYear]);

  // Handle viewport height changes (for mobile Safari)
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    const handleOrientationChange = () => {
      // iOSの向き変更時の遅延対応
      setTimeout(() => {
        setViewportHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // 初期設定
    setViewportHeight(window.innerHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

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
    const maxYear = currentYear + 10; // 現在年+10年まで
    
    for (let i = 1; i <= 20; i++) {
      const nextYear = lastYear + i;
      if (nextYear <= maxYear) {
        newYears.push(nextYear);
      } else {
        setHasMore(false); // 制限に達したらこれ以上読み込まない
        break;
      }
    }
    
    if (newYears.length > 0) {
      setYears(prevYears => [...prevYears, ...newYears]);
    }
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

  // Scroll to current year with smooth animation
  const scrollToCurrentYear = () => {
    const currentYearIndex = years.findIndex(year => year === currentYear);
    if (currentYearIndex !== -1 && scrollContainerRef.current) {
      const rowHeight = 41; // テーブル行の高さ（概算）
      const targetScrollPosition = currentYearIndex * rowHeight;
      const startScrollPosition = scrollContainerRef.current.scrollTop;
      const distance = targetScrollPosition - startScrollPosition;
      const duration = 1000; // 1秒のアニメーション
      const startTime = Date.now();

      const animateScroll = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イーズアウト効果
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentScrollPosition = startScrollPosition + (distance * easeOut);
        scrollContainerRef.current.scrollTop = currentScrollPosition;
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  };

  // Handle pull-to-refresh
  const handleTouchStart = (e) => {
    console.log('TouchStart event:', {
      scrollTop: scrollContainerRef.current?.scrollTop,
      clientY: e.touches[0].clientY,
      touchesLength: e.touches.length
    });
    
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      console.log('Starting pull gesture');
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e) => {
    console.log('TouchMove event:', {
      isDragging: isDragging.current,
      scrollTop: scrollContainerRef.current?.scrollTop
    });
    
    if (!isDragging.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    console.log('Touch move data:', {
      currentY,
      startY: startY.current,
      deltaY,
      scrollTop: scrollContainerRef.current?.scrollTop
    });
    
    if (deltaY > 0 && scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      console.log('Preventing default and setting pull distance:', deltaY);
      e.preventDefault();
      const distance = Math.min(deltaY, 100);
      setPullDistance(distance);
      setIsPulling(distance > 50);
    }
  };

  const handleTouchEnd = () => {
    console.log('TouchEnd event:', {
      isDragging: isDragging.current,
      pullDistance
    });
    
    if (isDragging.current) {
      if (pullDistance > 50) {
        console.log('Pull distance exceeded threshold, loading previous years');
        loadPreviousYears();
      }
      
      console.log('Starting return animation');
      // Smooth return animation
      const startDistance = pullDistance;
      const startTime = Date.now();
      const duration = 300;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentDistance = startDistance * (1 - easeOut);
        setPullDistance(currentDistance);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPullDistance(0);
          setIsPulling(false);
          console.log('Animation complete');
        }
      };
      
      requestAnimationFrame(animate);
      
      isDragging.current = false;
    }
  };

  return (
    <div className="table">
      {/* Current year button */}
      <div style={{ 
        textAlign: 'center', 
        margin: '10px 0' 
      }}>
        <button 
          onClick={scrollToCurrentYear}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#4682b4',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a9bd4'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4682b4'}
        >
          現在
        </button>
      </div>

      {/* Pull-to-refresh indicator */}
      {pullDistance > 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: `translateX(-50%) translateY(${pullDistance - 30}px)`,
          zIndex: 1000,
          fontSize: '14px',
          color: isPulling ? '#1976d2' : '#666',
          transition: 'color 0.2s ease'
        }}>
          {isPulling ? '↓ 離すと更新' : '↓ 下に引っ張る'}
        </div>
      )}
      
      <div
        style={{ 
          height: `${viewportHeight - 80}px`,
          overflow: 'auto',
          transform: `translateY(${pullDistance}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.3s ease-out'
        }}
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
          scrollableTarget={scrollContainerRef.current}
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
    </div>
  );
}
export default Tables;
