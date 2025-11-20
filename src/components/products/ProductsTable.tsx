import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
	{
		id: 1,
		name: "Bluetooth Speaker",
		category: "Electronics",
		price: 49.99,
		stock: 120,
		sales: 1100,
		image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60"
	},
	{
		id: 2,
		name: "Canvas Backpack",
		category: "Accessories",
		price: 45.00,
		stock: 75,
		sales: 650,
		image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&auto=format&fit=crop&q=60"
	},
	{
		id: 3,
		name: "Fitness Tracker",
		category: "Fitness",
		price: 89.99,
		stock: 60,
		sales: 700,
		image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1170&auto=format&fit=crop&q=60"
	},
	{
		id: 4,
		name: "Ceramic Mug",
		category: "Home",
		price: 15.99,
		stock: 200,
		sales: 900,
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60"
	},
	{
		id: 5,
		name: "Desk Lamp",
		category: "Home",
		price: 35.50,
		stock: 95,
		sales: 500,
		image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=500&auto=format&fit=crop&q=60"
	},
	{
		id: 6,
		name: "Wireless Mouse",
		category: "Electronics",
		price: 29.99,
		stock: 150,
		sales: 800,
		image: "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?q=80&w=1162&auto=format&fit=crop&q=60"
	},
	{
		id: 7,
		name: "Yoga Mat",
		category: "Fitness",
		price: 25.00,
		stock: 80,
		sales: 400,
		image: "https://images.unsplash.com/photo-1624651208388-f8726eace8f2?q=80&w=1074&auto=format&fit=crop&q=60"
	},
	{
		id: 8,
		name: "Leather Wallet",
		category: "Accessories",
		price: 39.99,
		stock: 50,
		sales: 350,
		image: "https://images.unsplash.com/photo-1620109176813-e91290f6c795?q=80&w=1170&auto=format&fit=crop&q=60"
	},
];

type Product = {
	id: number;
	name: string;
	category: string;
	price: number;
	stock: number;
	sales: number;
	image: string;
};


const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [editingForm, setEditingForm] = useState({ name: "", category: "", price: "", stock: "", sales: "", image: "" });

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.trim().toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter((product) =>
			product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);
		setFilteredProducts(filtered)
	};

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setEditingForm({
			name: product.name,
			category: product.category,
			price: product.price.toString(),
			stock: product.stock.toString(),
			sales: product.sales.toString(),
			image: product.image
		});
	}

	const handleSaveEdit = () => {
		if (!editingProduct) return;

		const updatedProduct: Product = {
			...editingProduct,
			name: editingForm.name.trim(),
			category: editingForm.category.trim(),
			price: Number.parseFloat(editingForm.price),
			stock: Number.parseInt(editingForm.stock),
			sales: Number.parseInt(editingForm.sales),
			image: editingForm.image || editingProduct.image,
		};

		setFilteredProducts((prevProducts) =>
			prevProducts.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod)
		);
		setEditingProduct(null);
	}
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
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
									<img
										src={product.image}
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
									<button
										className='text-indigo-400 hover:text-indigo-300 mr-2'
										onClick={() => handleEdit(product)}
									>
										<Edit size={18} className="active:text-white" />
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

			{editingProduct && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black opacity-50"
						onClick={() => setEditingProduct(null)}
					/>
					<div className="relative bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md z-10">
						<h3 className="text-lg font-medium mb-4 text-gray-100">
							Edit {editingProduct.name}
						</h3>

						<label className="block text-sm text-gray-300">Name</label>
						<input
							value={editingForm.name}
							onChange={e => setEditingForm(s => ({ ...s, name: e.target.value }))}
							className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-2"
						/>

						<label className="block text-sm text-gray-300">Category</label>
						<input
							value={editingForm.category}
							onChange={e => setEditingForm(s => ({ ...s, category: e.target.value }))}
							className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-2"
						/>

						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="block text-sm text-gray-300">Price</label>
								<input
									type="number"
									step="0.01"
									value={editingForm.price}
									onChange={e => setEditingForm(s => ({ ...s, price: e.target.value }))}
									className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-2"
								/>
							</div>
							<div>
								<label className="block text-sm text-gray-300">Stock</label>
								<input
									type="number"
									value={editingForm.stock}
									onChange={e => setEditingForm(s => ({ ...s, stock: e.target.value }))}
									className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-2"
								/>
							</div>
						</div>

						<label className="block text-sm text-gray-300">Sales</label>
						<input
							type="number"
							value={editingForm.sales}
							onChange={e => setEditingForm(s => ({ ...s, sales: e.target.value }))}
							className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-4"
						/>

						<label className="block text-sm text-gray-300">Image URL</label>
						<input
							value={editingForm.image}
							onChange={e => setEditingForm(s => ({ ...s, image: e.target.value }))}
							className="w-full bg-gray-800 text-white rounded px-3 py-2 mb-3"
						/>

						{editingForm.image && (
							<div className="mb-4 flex justify-center">
								<img
									src={editingForm.image}
									alt={`Preview of ${editingForm.name || editingProduct.name}`}
									className="h-24 w-24 rounded-full object-cover border border-gray-600"
									onError={e => (e.currentTarget.style.display = "none")} // hides preview if URL is invalid
								/>
							</div>
						)}

						<div className="flex justify-end gap-3">
							<button
								onClick={() => setEditingProduct(null)}
								className="px-4 py-2 rounded bg-gray-700 text-gray-200"
							>
								Cancel
							</button>
							<button
								onClick={handleSaveEdit}
								className="px-4 py-2 rounded bg-indigo-600 text-white"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default ProductsTable
