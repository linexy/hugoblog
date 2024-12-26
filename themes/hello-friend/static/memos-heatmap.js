const themes = {
    github: {
        empty: '#ebedf0',
        colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39']
    }
};

async function fetchMemosData(year, domain) {
    try {
        const response = await fetch(`${domain}/api/v1/memo?creatorId=1&limit=1000`);
        const data = await response.json();
        
        const yearData = {};
        data.forEach(memo => {
            const date = new Date(memo.createdTs * 1000);
            if (date.getFullYear() === year) {
                const dateStr = d3.timeFormat('%Y-%m-%d')(date);
                yearData[dateStr] = (yearData[dateStr] || 0) + 1;
            }
        });
        
        return yearData;
    } catch (error) {
        console.error('获取数据失败:', error);
        return {};
    }
}

function createHeatmap(data, year, container) {
    const cellSize = 12;
    const cellPadding = 2;
    const weekWidth = cellSize + cellPadding;
    
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 1);
    const dates = d3.timeDays(yearStart, yearEnd);
    
    const totalWeeks = Math.ceil(d3.timeWeek.count(yearStart, yearEnd));
    const width = (totalWeeks + 1) * weekWidth + margin.left + margin.right;
    const height = 7 * weekWidth + margin.top + margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const maxCount = Math.max(1, d3.max(Object.values(data)) || 0);
    const colorScale = d3.scaleQuantize()
        .domain([0, maxCount])
        .range([themes.github.empty, ...themes.github.colors]);

    g.selectAll('rect')
        .data(dates)
        .enter()
        .append('rect')
        .attr('x', d => {
            const weeksSinceStart = d3.timeWeek.count(yearStart, d);
            return weeksSinceStart * weekWidth;
        })
        .attr('y', d => d.getDay() * weekWidth)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('fill', d => {
            const dateStr = d3.timeFormat('%Y-%m-%d')(d);
            return colorScale(data[dateStr] || 0);
        });
}

// 初始化函数
async function initMemosHeatmap(containerId, memosUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const data = await fetchMemosData(currentYear, memosUrl);
    createHeatmap(data, currentYear, container);
}