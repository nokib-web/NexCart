import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
    return (
        <div className="card bg-base-100 hover:scale-105 bg-linear-to-r from-orange-50 to-amber-50  shadow-sm hover:shadow-xl transition rounded-xl overflow-hidden">

            {/* Image */}
            <figure className="h-64 w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                />
            </figure>

            {/* Body */}
            <div className="card-body p-5">

                {/* Title */}
                <h2 className="card-title text-secondary text-lg font-semibold">
                    {product.name}
                </h2>

                {/* Short Description */}
                <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                </p>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-secondary text-xl font-bold">
                        ${product.price}
                    </span>

                    <Link href={`/products/${product._id}`}>
                        <button className="btn btn-primary bg-linear-to-r from-orange-500 to-amber-500 hover:btn-secondary text-white btn-sm">
                            Details
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
