import "./About.css";

const About = () => {

    return (
        <div className="about-page">
            <h1 className="about-title">About Us</h1>
            <div className="about-content">
                <img src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png" alt="About Us" className="about-image" />
                <div className="about-text">
                    <p>
                        Welcome to our Ecommerce App! We are dedicated to providing you with the best online shopping experience. Our platform offers a wide range of products, from electronics to fashion, all at competitive prices. Our team is committed to ensuring customer satisfaction through quality service and support. Thank you for choosing us for your shopping needs!
                    </p>
                    <p>
                        Our mission is to make online shopping easy, convenient, and enjoyable for everyone. We strive to offer a seamless experience from browsing to checkout, with secure payment options and fast shipping. Whether you're looking for the latest gadgets or trendy apparel, we have something for everyone. Join our community of satisfied customers and discover the joy of online shopping with us!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;