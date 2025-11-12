import PaymentFirstStep from "./Payment.firstStep"
import PaymentSecondStep from "./Payment.secondStep";
import usePaymentStore from "../../store/PaymentStore";

const PaymentContainer = () => {
    const {step} = usePaymentStore()

    if (step === 2) {
        return <PaymentSecondStep/>
    }
    return <PaymentFirstStep/>

}

export default PaymentContainer
