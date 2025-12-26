import { Card, Button } from "react-bootstrap";

const Product = (props) => {
    const productsList = props.productsList.map(product => {
        return (<Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Img className="product-image" variant="top" src={product.imageUrl} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>);
    })
    return productsList;
}

export default Product;