import { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../../components/AppAccess/LoadingScreen";
import { Payment } from "../../modules/payment/component/payment";
import { getLinkRbManual } from "../../api/payment";

export default function StripeManualPayPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (price: string, email: string) => {
    setLoading(true);
    const url = await getLinkRbManual(price, email);
    url ? router.push(url).then() : setLoading(false);
  };

  return (
    <div>
      <div className={"mt-10 flex flex-col items-center justify-center p-2  "}>
        <Payment.PaymentCardManual onSubmit={onSubmit} />
        <div className={"mt-5 max-w-md text-center"}>
          После оплаты вам на указанную при оплате почту, придёт письмо с методическим пособием.
          <br />
          <strong>А так же письмо для входа в личный кабинет с подарком</strong>
        </div>
      </div>

      <LoadingScreen show={loading} fixed />
    </div>
  );
}
