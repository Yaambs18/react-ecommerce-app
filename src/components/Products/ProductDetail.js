import { Card, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
    const params = useParams();
    const productId = params.id;

    const productsArr = [
        {
            id: '1',
            title: 'Colors',
            price: 100,
            description: 'This is a sample product 1 description.',
            images: ['https://prasadyash2411.github.io/ecom-website/img/Album%201.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'],
            reviews: [
                { id: 1, name: "Alice", rating: 5, comment: "Excellent!", date: "2024-01-10" },
                { id: 2, name: "Bob", rating: 4, comment: "Very good.", date: "2024-01-12" },
            ],
        },
        {
            id: '2',
            title: 'Black and white Colors',
            price: 50,
            description: 'This is a sample product 2 description.',
            images: ['https://prasadyash2411.github.io/ecom-website/img/Album%202.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'],
            reviews: [
                { id: 1, name: "John", rating: 5, comment: "Excellent!", date: "2025-01-10" },
                { id: 2, name: "Doe", rating: 3, comment: "Very good.", date: "2025-01-12" },
            ],
        },
        {
            id: '3',
            title: 'Yellow and Black Colors',
            price: 70,
            description: 'This is a sample product 3 description.',
            images: ['https://prasadyash2411.github.io/ecom-website/img/Album%203.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'],
            reviews: [
                { id: 1, name: "John", rating: 5, comment: "Excellent!", date: "2025-01-10" },
                { id: 2, name: "Doe", rating: 3, comment: "Very good.", date: "2025-01-12" },
            ],
        },
        {
            id: '4',
            title: 'Blue Color',
            price: 100,
            description: 'This is a sample product 4 description.',
            images: ['https://prasadyash2411.github.io/ecom-website/img/Album%204.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png', 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'],
            reviews: [
                { id: 1, name: "Bob", rating: 5, comment: "Excellent!", date: "2025-01-10" },
                { id: 2, name: "Alice", rating: 3, comment: "Very good.", date: "2025-01-12" },
            ],
        }
    ]
    const product = productsArr.find(product => product.id === productId);

    return ( 
        <Card className="m-auto mt-5 mb-5 w-50 border-0 shadow" style={{ backgroundColor: 'rgba(174, 197, 218, 1)' }}>
            <Carousel>
                {product.images.map((image, index) => {
                    return (<Carousel.Item key={index}>
                        <img className="w-100" src={image} alt={`Slide ${index + 1}`} />
                    </Carousel.Item>)
                })}
            </Carousel>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    <strong>Price:</strong> ${product.price}
                </Card.Text>
                <Card.Text>
                    <strong>Description:</strong> {product.description}
                </Card.Text>
                <strong>Reviews:</strong>
                <ul>
                    {product.reviews.map(review => {
                        return (<li key={review.id}>
                            <strong>{review.name}</strong>
                            <span>Rating: {review.rating} stars</span>
                            <p>{review.comment}</p>
                            <small>Reviewed on: {review.date}</small>
                        </li>)
                    })}
                </ul>
            </Card.Body>
        </Card>
    )
}

export default ProductDetail;