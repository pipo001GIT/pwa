import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// components/DataInput.js
import { useFormContext, useWatch, FormProvider, useForm } from 'react-hook-form';
// components/DataInput.js

const DataInput = () => {
  const { register } = useFormContext();

  return (
    <div className="mb-6">
      <label htmlFor="data_" className="block text-sm font-medium text-gray-700 mb-1">
        Data Input:
      </label>
      <input
        id="data_"
        {...register("data_", { valueAsNumber: true })}
        className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter a number"
      />
    </div>
  );
};



// components/LineGraph.js
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// components/LineGraph.js
import React, { useMemo } from 'react';


const LineGraph = () => {
  const { control } = useFormContext();
  const dataValue = useWatch({ control, name: "data_" });

  const yValues = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const xValues = Array(yValues.length).fill(dataValue || 0);

  const data = {
    labels: yValues,
    datasets: [
      {
        label: 'Line Graph',
        data: xValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Input Value',
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Line Graph</h2>
      <Line data={data} options={options} />
    </div>
  );
};





// components/Form.js

const DataForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Data Form with Line Graph</h1>
        <DataInput />
        <LineGraph />
      </form>
    </FormProvider>
  );
};





export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
                 <DataForm />

    </div>
  );
}
