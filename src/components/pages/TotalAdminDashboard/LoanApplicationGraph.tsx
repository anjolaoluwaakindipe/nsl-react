import { ChartData } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function LoanApplicationGraph() {
    const data: ChartData<"doughnut"> = {
        labels: ["Red", "Orange", "Blue"],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: "Popularity of colours",

                data: [55, 23, 96],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(0, 0, 0, 0.5)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <Doughnut
                data={data}
            
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Loan Application",
                            font: {
                                family: "Poppins",
                            },
                        },
                        
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                font: {
                                    family: "Poppins",
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default LoanApplicationGraph;
