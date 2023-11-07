import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../../common/components/modal/modal";
import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";
import { PaymentOrderT, ShortPaymentOrderT } from "../interfaces/PaymentOrderT";
import { FormCreatePayment } from "./formCreatePayment";
import { defaultFormCreatePayment } from "../constants/defaultFormCreatePayment";
import { AppTable } from "../../../components/ui/AppTable";
import { partnerPaymentTableColumns } from "../constants/partnerPaymentTableColumns";
import { StatusPaymentOrder } from "../interfaces/StatusPaymentOrder";
import { Loading } from "../../../components/ui/Loading";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

export const PartnerPaymentTable = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [info, setInfo] = useState<InvoiceInfoT>();
  const [openModal, setOpenModal] = useState(false);
  const [cardInfo, setCardInfo] = useState<ShortPaymentOrderT>(defaultFormCreatePayment);
  const [tableData, setTableData] = useState<PaymentOrderT[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .get("/api/payment/info")
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/api/payment/getMyList")
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (value: ShortPaymentOrderT) => {
    setLoading(true);
    setOpenModal(false);
    axios
      .post("/api/payment/create", { ...value })
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        getData();
        setLoading(false);
      });
  };

  const confirmOrder = (paymentOrder: PaymentOrderT) => {
    axios
      .post("/api/payment/confirm", { ...paymentOrder, status: StatusPaymentOrder.Cancel })
      .then((res) => {
        setTableData(tableData.map((elem) => (elem.id === paymentOrder.id ? res.data.data : elem)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelOrder = (paymentOrder: PaymentOrderT) => {
    setLoading(true);
    axios
      .post("/api/payment/cancel", { ...paymentOrder, status: StatusPaymentOrder.Cancel })
      .then((res) => {
        setTableData(tableData.map((elem) => (elem.id === paymentOrder.id ? res.data.data : elem)));
        axios
          .get("/api/payment/info")
          .then((res) => {
            setInfo(res.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="p-4">
      <p>
        {lang.partner.all_time}: {info?.totalCount || 0} ₽
      </p>
      <p>
        {lang.partner.on_account}: {info?.balance || 0} ₽
      </p>
      <p>
        {lang.partner.retrieved}: {info?.underReview || 0} ₽
      </p>
      <p>
        {lang.partner.paid}: {info?.approve || 0} ₽
      </p>
      <p>
        <button
          className="my-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          onClick={() => setOpenModal(true)}
        >
          {lang.partner.cash_out}
        </button>
      </p>
      {openModal ? (
        <Modal
          title={lang.modal.payment_creation.title}
          content={
            <FormCreatePayment
              cancel={() => setOpenModal(false)}
              onSubmit={onSubmit}
              balance={info?.balance}
              defaultValue={cardInfo}
            />
          }
          outsideClick={() => setOpenModal(false)}
        />
      ) : null}
      <AppTable
        columns={partnerPaymentTableColumns(lang, confirmOrder, cancelOrder)}
        rows={tableData}
      />
    </div>
  );
};
