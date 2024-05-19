import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface RegistrationChartProps {
    registrationsPerDay: { date: string, count: number }[];
}

const RegistrationChart: React.FC<RegistrationChartProps> = ({ registrationsPerDay }) => {
    const data: ChartData<'line'> = {
        labels: registrationsPerDay.map(item => item.date),
        datasets: [
            {
                label: 'Registrations per Day',
                data: registrationsPerDay.map(item => item.count),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default RegistrationChart;
