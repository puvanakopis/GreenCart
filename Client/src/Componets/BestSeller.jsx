import ProductCard from './ProductCard';
import { useAppContext } from '../Context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();

    return (
        <div className="mt-16">
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
                {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default BestSeller;
