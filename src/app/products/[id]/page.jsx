import { API_URL } from "@/config";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetails({ params }) {
    const { id } = await params;

    const res = await fetch(`${API_URL}/products/${id}`, {
        cache: "no-store",
    });
    const product = await res.json();

    return (
        <ProductDetailsClient product={product} />
    );
}
