import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import AuthNavbar from "@d-app/modules/Navbar/AuthNavbar";
import AuthFooter from "@d-app/modules/Footer/AuthFooter";
import routes from "@d-app/layouts/Auth/routes";

const Auth = props => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return <Route path={props.match.path + prop.path} component={prop.component} key={key} />;
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
                <div className="header bg-gradient-info py-7 py-lg-8">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-light">
                                        Use below forms to login or create new account.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Switch>
                            {getRoutes(routes)}
                            <Redirect from="/" to={`${props.match.path}/login`} />
                        </Switch>
                    </Row>
                </Container>
            </div>
            <AuthFooter />
        </>
    );
};

export default Auth;
