import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type TimeRangeKey = "week" | "month" | "quarter" | "year";

type RevenuePoint = {
	label: string;
	revenue: number;
	target: number;
};

type TimeRangeConfig = {
	label: string;
	description: string;
	data: RevenuePoint[];
};

const CHART_DATA: Record<TimeRangeKey, TimeRangeConfig> = {
	week: {
		label: "This Week",
		description: "Daily performance compared to targets",
		data: [
			{ label: "Mon", revenue: 980, target: 900 },
			{ label: "Tue", revenue: 1020, target: 950 },
			{ label: "Wed", revenue: 1100, target: 1050 },
			{ label: "Thu", revenue: 1250, target: 1150 },
			{ label: "Fri", revenue: 1400, target: 1300 },
			{ label: "Sat", revenue: 1700, target: 1500 },
			{ label: "Sun", revenue: 1540, target: 1450 },
		],
	},
	month: {
		label: "This Month",
		description: "Weekly revenue vs monthly target",
		data: [
			{ label: "Week 1", revenue: 4200, target: 4000 },
			{ label: "Week 2", revenue: 4600, target: 4200 },
			{ label: "Week 3", revenue: 5100, target: 4800 },
			{ label: "Week 4", revenue: 5400, target: 5200 },
		],
	},
	quarter: {
		label: "This Quarter",
		description: "Monthly performance against quarterly targets",
		data: [
			{ label: "Jan", revenue: 14500, target: 14000 },
			{ label: "Feb", revenue: 13250, target: 13500 },
			{ label: "Mar", revenue: 16200, target: 15000 },
		],
	},
	year: {
		label: "This Year",
		description: "Monthly revenue compared to strategic targets",
		data: [
			{ label: "Jan", revenue: 14500, target: 14000 },
			{ label: "Feb", revenue: 13250, target: 13500 },
			{ label: "Mar", revenue: 16200, target: 15000 },
			{ label: "Apr", revenue: 15500, target: 15200 },
			{ label: "May", revenue: 16800, target: 16000 },
			{ label: "Jun", revenue: 17400, target: 17000 },
			{ label: "Jul", revenue: 18250, target: 17500 },
			{ label: "Aug", revenue: 19000, target: 18200 },
			{ label: "Sep", revenue: 17800, target	: 17600 },
			{ label: "Oct", revenue: 18800, target: 18500 },
			{ label: "Nov", revenue: 19550, target: 19200 },
			{ label: "Dec", revenue: 21000, target: 20500 },
		],
	},
};

const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRangeKey>("week");

	const activeConfig = useMemo(() => CHART_DATA[selectedTimeRange], [selectedTimeRange]);

	const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
				<div>
					<h2 className='text-xl font-semibold text-gray-100'>Revenue vs Target</h2>
					<p className='text-sm text-gray-400'>{activeConfig.description}</p>
				</div>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(event) => setSelectedTimeRange(event.target.value as TimeRangeKey)}
				>
					{(Object.entries(CHART_DATA) as [TimeRangeKey, TimeRangeConfig][]).map(([key, config]) => (
						<option key={key} value={key}>
							{config.label}
						</option>
					))}
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={activeConfig.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id='revenueGradient' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='#8B5CF6' stopOpacity={0.5} />
								<stop offset='95%' stopColor='#8B5CF6' stopOpacity={0} />
							</linearGradient>
							<linearGradient id='targetGradient' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='#10B981' stopOpacity={0.4} />
								<stop offset='95%' stopColor='#10B981' stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='label' stroke='#9CA3AF' tick={{ fill: "#9CA3AF" }} />
						<YAxis stroke='#9CA3AF' tick={{ fill: "#9CA3AF" }} tickFormatter={formatCurrency} width={80} />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.85)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
							formatter={(value: number) => formatCurrency(value)}
							labelFormatter={(label) => `${activeConfig.label}: ${label}`}
						/>
						<Legend wrapperStyle={{ color: "#E5E7EB" }} />
						<Area type='monotone' dataKey='revenue' stroke='#8B5CF6' strokeWidth={2} fill='url(#revenueGradient)' name='Revenue' />
						<Area type='monotone' dataKey='target' stroke='#10B981' strokeWidth={2} fill='url(#targetGradient)' name='Target' />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	)


}
export default RevenueChart;
