'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { getReviews, addReview } from '@/app/lib/actions';
import styles from "../ui/styles/productRevies.module.css";

// Define the Review type
type Review = {
  review_id: number;
  rating: number;
  comment: string;
  account_firstname: string;
  account_company_name: string;
  created_at: string;
};

// ProductReviews component
export default function ProductReviews({ productId }: { productId: number }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      const data = await getReviews(productId);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
    })();
  }, [productId]);

  // Handle form submission for adding a review
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;

    startTransition(async () => {
      const data = await addReview(productId, rating, comment);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setComment('');
      setRating(0);
    });
  }

  // Render the component
  return (
  <div className={styles.reviews_section}>
    <h2>Ratings</h2>

    {/* Average visible to all */}
    <div className={styles.average_block}>
      <span className={styles.average_stars}>
        {'★'.repeat(Math.round(avgRating))}
        {'☆'.repeat(5 - Math.round(avgRating))}
      </span>
      <span className={styles.average_value}>
        {avgRating > 0 ? avgRating.toFixed(1) : 'No ratings yet'}
      </span>
    </div>

    {/* Review list */}
    {reviews.length > 0 ? (
      reviews.map((r) => (
        <div key={r.review_id} className={styles.review_item}>
          <strong>{r.account_company_name || r.account_firstname}</strong>
          <p className={styles.review_stars}>
            {'★'.repeat(r.rating)}
            {'☆'.repeat(5 - r.rating)}
          </p>
          <p>{r.comment}</p>
        </div>
      ))
    ) : (
      <p>No reviews yet</p>
    )}

    {/* Form for logged-in users */}
    {session ? (
      <form onSubmit={handleSubmit} className={styles.review_form}>
        <label>Rating:</label>
        <div className={styles.stars_input}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={`${styles.star_icon} ${n <= rating ? styles.active : ''}`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows={3}
          className={styles.textarea}
        />

        <button type="submit" disabled={isPending} className={styles.submit_btn}>
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    ) : (
      <p className={styles.login_message}>
        <em>Log in to leave a review.</em>
      </p>
    )}
  </div>
);
}
