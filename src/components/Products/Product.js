import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";

const Product = (props) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (product) => {
        cartCtx.addItem({
            ...product,
            quantity: 1
        });
    }

    const productsList = props.productsList.map((product, index) => {
        return (<Card key={index} style={{ width: '18rem', margin: '20px' }}>
            <Card.Img className="product-image" variant="top" src={product.imageUrl} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCartHandler(product)}>Add to Cart</Button>
            </Card.Body>
        </Card>);
    })
    return productsList;
}

export default Product;