import React from "react";
import { Button, Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ContentWrapper from "@d-app/modules/utils/ContentWrapper";

const I18 = props => {
    return (
        <ContentWrapper>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <div className="col">
                                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">Header lite</h6> */}
                                    <h2 className="mb-0">Coming soon...</h2>
                                </div>
                            </Row>
                        </CardHeader>
                        {/* <CardBody>
                    <div>Welcome</div>
                </CardBody> */}
                    </Card>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default I18;
