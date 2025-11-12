import {FC} from "react";
import PaymentContainer from "../container/Payment/Payment.container";
import {Content, Footer} from "antd/es/layout/layout";
import {Layout} from "antd";
import FooterContainer from "../components/FooterContainer";

const PaymentPage: FC = () => {

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Content style={{padding: '0 48px'}}>
                <PaymentContainer/>
            </Content>
            <Footer>
                <FooterContainer></FooterContainer>
            </Footer>
        </Layout>
    )
}

export default PaymentPage
