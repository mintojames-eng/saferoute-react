import { useRef, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import './Charts.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler)

function Charts({ stats }) {
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Accidents',
            data: stats.monthlyTrend,
            fill: true,
            backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300)
                gradient.addColorStop(0, 'rgba(6, 182, 212, 0.6)')
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)')
                return gradient
            },
            borderColor: '#06b6d4',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#8b5cf6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    }

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f1f5f9',
                bodyColor: '#94a3b8',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12
            }
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: 'rgba(148, 163, 184, 0.1)', borderDash: [5, 5] } }
        }
    }

    const doughnutData = {
        labels: ['High Risk', 'Medium Risk', 'Low Risk'],
        datasets: [{
            data: stats.riskSegments,
            backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'],
            borderWidth: 0,
            hoverOffset: 8
        }]
    }

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 10,
                    color: '#94a3b8',
                    font: { family: 'Inter' }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12
            }
        }
    }

    return (
        <div className="container charts-container">
            <div className="charts-grid">
                <div className="chart-card card reveal">
                    <h4 className="chart-title">Recurrent Predictive Anomalies</h4>
                    <div className="chart-wrapper">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>
                <div className="chart-card card reveal">
                    <h4 className="chart-title">Risk Distribution by Category</h4>
                    <div className="chart-wrapper chart-center">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts
