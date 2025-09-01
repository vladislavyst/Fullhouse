import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

interface ReviewsSectionProps {
  title: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

const ReviewsSection = ({ 
  title, 
  reviews, 
  averageRating, 
  totalReviews, 
  className = '' 
}: ReviewsSectionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
          
          {/* Aggregate Rating для SEO */}
          <div 
            className="flex items-center justify-center space-x-2 mb-4"
            itemScope 
            itemType="https://schema.org/AggregateRating"
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-primary">
              <span itemProp="ratingValue">{averageRating}</span>
              <span className="text-muted-foreground">/5</span>
            </span>
            <span className="text-muted-foreground">
              (<span itemProp="reviewCount">{totalReviews}</span> отзывов)
            </span>
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Читайте отзывы наших клиентов о качестве строительства и обслуживании
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card 
              key={review.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              itemScope 
              itemType="https://schema.org/Review"
            >
              <CardContent className="p-6">
                {/* Заголовок отзыва */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 
                      className="font-semibold text-primary mb-1"
                      itemProp="author"
                      itemScope 
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{review.author}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <time itemProp="datePublished" dateTime={review.date}>
                        {new Date(review.date).toLocaleDateString('ru-RU')}
                      </time>
                    </p>
                  </div>
                  
                  {review.verified && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ Проверен
                    </div>
                  )}
                </div>

                {/* Рейтинг */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {review.rating}/5
                  </span>
                </div>

                {/* Текст отзыва */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-accent/20" />
                  <p 
                    className="text-muted-foreground leading-relaxed pl-4"
                    itemProp="reviewBody"
                  >
                    {review.text}
                  </p>
                </div>

                {/* Микроразметка для рейтинга */}
                <meta itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" />
                <meta itemProp="ratingValue" content={review.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                <meta itemProp="worstRating" content="1" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Кнопка "Все отзывы" */}
        <div className="text-center mt-8">
          <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Читать все отзывы
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
