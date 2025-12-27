"use client";
import React, { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { API_URL } from "@/config";

const ReviewSection = ({ productId }) => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0); // Trigger re-fetch

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${API_URL}/reviews/${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [productId, refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSignedIn) {
            toast.error("Please login to leave a review");
            return;
        }
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setLoading(true);
        const reviewData = {
            productId,
            userId: user.id,
            userName: user.fullName || user.firstName || "Anonymous",
            userImage: user.imageUrl,
            rating,
            comment,
        };

        try {
            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                toast.success("Review submitted successfully!");
                setComment("");
                setRating(0);
                setRefresh(prev => prev + 1); // Refresh list
            } else {
                toast.error("Failed to submit review");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12 bg-base-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews ({reviews.length})</h2>

            {/* List Reviews */}
            <div className="space-y-6 mb-10">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b pb-4 last:border-none">
                            <div className="flex items-center gap-3 mb-2">
                                {review.userImage ? (
                                    <img
                                        src={review.userImage}
                                        alt={review.userName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-6 h-6 text-gray-500" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold">{review.userName}</p>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? "fill-current" : "stroke-current text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 ml-auto">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Add Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Write a Review</h3>
                {isSignedIn ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Your Review</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-gray-600 mb-2">Please log in to write a review.</p>
                        {/* You might want to add a login button here if you have a specific route */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
