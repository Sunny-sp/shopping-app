import { Container, Row, Col } from "react-bootstrap"
import React from "react"
function Footer () {
    return (<>
        <footer>
            <Container className="text-center" >
                <Row>
                    <Col md={12}>
                        <span>
                            copyright &copy; Shopping App
                        </span>
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
    )
};
export default Footer;
