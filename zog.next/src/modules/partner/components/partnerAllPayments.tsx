import { useState } from "react";
import { PaymentOrderT } from "../interfaces/PaymentOrderT";
import axios from "axios";
import { StatusPaymentOrder } from "../interfaces/StatusPaymentOrder";
import { Partner } from "./partner";
import { Loading } from "../../../components/ui/Loading";
import { AppTable } from "../../../components/ui/AppTable";
import { adminPaymentTableColumns } from "../constants/adminPaymentTableColumns";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  partnerList: PaymentOrderT[];
}

export const PartnerAllPayments = ({ partnerList }: IProps) => {
  const { locale } = useRouter();
  const [userList, setUserList] = useState<PaymentOrderT[]>(partnerList);
  const [loading, setLoading] = useState(false);

  const onSearch = (value: string, status: string) => {
    axios
      .post("/api/payment/getList", { email: value, status })
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch(function (error) {})
      .finally(() => {
        setLoading(false);
      });
  };

  const approveOrder = (paymentOrder: PaymentOrderT) => {
    axios
      .post("/api/payment/approve", { ...paymentOrder, status: StatusPaymentOrder.ApprovedAdmin })
      .then((res) => {
        setUserList(userList.map((elem) => (elem.id === paymentOrder.id ? res.data.data : elem)));
        // onSearch(searchParams.value, searchParams.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const cancelOrder = (paymentOrder: PaymentOrderT) => {
    axios
      .post("/api/payment/cancel", { ...paymentOrder, status: StatusPaymentOrder.Cancel })
      .then((res) => {
        setUserList(userList.map((elem) => (elem.id === paymentOrder.id ? res.data.data : elem)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="container flex flex-col justify-center gap-8 px-4 py-16 ">
        <Partner.FilterPayment onSearch={onSearch} />
        {loading ? (
          <Loading />
        ) : (
          <AppTable
            columns={adminPaymentTableColumns(getLanguage(locale), approveOrder, cancelOrder)}
            rows={userList}
          />
        )}
      </div>
    </div>
  );
};
