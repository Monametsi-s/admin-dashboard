import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
	{ id: 1, name: "Bluetooth Speaker", category: "Electronics", price: 49.99, stock: 120, sales: 1100 },
	{ id: 2, name: "Canvas Backpack", category: "Accessories", price: 45.00, stock: 75, sales: 650 },
	{ id: 3, name: "Fitness Tracker", category: "Fitness", price: 89.99, stock: 60, sales: 700 },
	{ id: 4, name: "Ceramic Mug", category: "Home", price: 15.99, stock: 200, sales: 900 },
	{ id: 5, name: "Desk Lamp", category: "Home", price: 35.50, stock: 95, sales: 500 },
	{ id: 6, name: "Wireless Mouse", category: "Electronics", price: 29.99, stock: 150, sales: 800 },
	{ id: 7, name: "Yoga Mat", category: "Fitness", price: 25.00, stock: 80, sales: 400 },
	{ id: 8, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 50, sales: 350 },
];


const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.trim().toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter((product) =>
			product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);
		setFilteredProducts(filtered)
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">
					Product List
				</h2>
				<div className="relative">
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
					<input type="text" className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={handleSearch}
					value={searchTerm}
					/>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize tracking-wider">Name</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize tracking-wider">Category</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize tracking-wider">Stock</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize tracking-wider">Price</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize tracking-wider">Sales</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 capitalize  tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700">
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{duration: 0.3}}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									${product.price.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

		</motion.div>
	)
}

export default ProductsTable
