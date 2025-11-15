import { motion } from "framer-motion";
import { AreaChart, LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from "recharts";
import { useState } from "react";

const salesData = [
	{ month: "Jul", sales: 7000 },
	{ month: "Aug", sales: 6800 },
	{ month: "Sep", sales: 5200 },
	{ month: "Oct", sales: 7800 },
	{ month: "Nov", sales: 8500 },
	{ month: "Dec", sales: 9200 },
	{ month: "Jan", sales: 4300 },
	{ month: "Feb", sales: 3800 },
	{ month: "Mar", sales: 5600 },
	{ month: "Apr", sales: 6100 },
	{ month: "May", sales: 7300 },
	{ month: "Jun", sales: 6900 },
];

const SalesOverviewChart = () => {

	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex flex-col items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-gray-100">
					Sales Overview
				</h2>
				<div className="h-80 w-full">
					<ResponsiveContainer>
						<LineChart data={salesData} >
							<XAxis dataKey="month" interval={"preserveStartEnd"} stroke='#9CA3AF' />
							<YAxis stroke='#9CA3AF' />

							<Tooltip
								contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
								itemStyle={{ color: "#E5E7EB" }}
							/>

							<Line dataKey="sales" stroke="red"  />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</motion.div>

	)
}

export default SalesOverviewChart
