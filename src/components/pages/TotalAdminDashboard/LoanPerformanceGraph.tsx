import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ChartData } from "chart.js";
Chart.register(...registerables);

function LoanPerformanceGraph() {
    let chartData: ChartData<"line"> = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgba(0, 0, 0, 0.5)",
                tension: 0.1,
            },
        ],
    };
    return (
        <Line
            data={chartData}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Loan Performance",
                        font: {
                            family: "Poppins",
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}

export default LoanPerformanceGraph;
