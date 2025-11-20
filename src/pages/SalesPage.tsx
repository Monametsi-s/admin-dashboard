import { motion } from 'framer-motion'
import Header from '../components/common/Header';
import { CreditCard, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import SalesOverviewChart from '../components/overview/SalesOverviewChart';
import DailySalesTrend from '../components/sales/DailySalesTrend';
import SalesByCategoryChart from '../components/sales/SalesByCategoryChart';


const salesStats = {
	totalRevenue: "$1,200,000",
	averageOrderValue: "$75",
	conversionRate: "3.5%",
	salesGrowth: "12%"
};

const SalesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Sales Dashboard' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:p-8'>
				{/* SALES STATS */}
				<motion.div
					className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Revenue' icon={DollarSign} value={salesStats.totalRevenue} color='#6366F1' />
					<StatCard
						name='Avg. Order Value'
						icon={ShoppingCart}
						value={salesStats.averageOrderValue}
						color='#10B981'
					/>
					<StatCard
						name='Conversion Rate'
						icon={TrendingUp}
						value={salesStats.conversionRate}
						color='#F59E0B'
					/>
					<StatCard
					name='Sales Growth'
					icon={CreditCard}
					value={salesStats.salesGrowth}
					color='#EF4444' />
				</motion.div>

				<SalesOverviewChart />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-8">
					<SalesByCategoryChart />
					<DailySalesTrend />
				</div>
			</main>
		</div>
	)
}

export default SalesPage
