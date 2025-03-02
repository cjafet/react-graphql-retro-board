import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartBar = (props) => {
  console.log("ChartProps", props);

  const chartData = {
            labels: ['Kudos', 'Improvs', 'Action Items', 'Last Action Items', 'Likes'],
            datasets: [{
              label: '#',
              data: [props.kudos, props.improvements, props.actionItems, props.lastActionItems, props.totalLikeCount],
              backgroundColor: [
                'rgba(53, 5, 240, 0.5)',
                'rgba(207, 5, 240, 0.5)',
                'rgba(130, 5, 240, 0.5)',
                'rgba(5, 32, 240, 0.5)',
                'rgba(240, 5, 159, 0.5)'
              ],
              borderColor: [
                'rgb(53, 5, 240)',
                'rgb(207, 5, 240)',
                'rgb(130, 5, 240)',
                'rgb(5, 32, 240)',
                'rgb(240, 5, 159)'
              ],
              borderWidth: 1
            }]
          };

  const chartOptions = {
            maintainAspectRatio: false,
            // aspectRatio: 1,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          };

  return (
    <div style={{ marginBottom: "30px"}}>
      <Bar options={chartOptions} data={chartData} height={"350px"} />
    </div>
  );
};

export default ChartBar;


