import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ReviewFormT } from "../interfaces/Review";
import { nameConsultListsEnum } from "../constants/nameLists";
import { addReview } from "../../../api/review";
import { Modal } from "../../../common/components/modal/modal";
import { ReviewModal } from "./ReviewModal";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

const defaultValue = {
  fullName: "",
  nameConsult: "",
  rating: "",
  likeIt: "",
  offers: "",
  comfort: "",
  recommendation: "",
  personalAboutTorsunov: "",
  agreement: false,
};

export const ReviewForm = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).review;
  const [success, setSuccess] = useState(false);
  const [initialValues, setInitialValues] = useState<ReviewFormT>(defaultValue);

  const handleChange = useCallback(({ target }: ChangeEvent<unknown>) => {
    const data: { key: string; value: string | boolean } = { key: "", value: "" };
    if (target instanceof HTMLInputElement) {
      const { type, checked, value, name } = target;
      data.value = type === "checkbox" ? checked : value;
      data.key = name;
    } else if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
      data.value = target.value;
      data.key = target.name;
    }

    setInitialValues((prev) => ({ ...prev, [data.key]: data.value }));
  }, []);

  const onSuccess = useCallback(() => {
    setSuccess(true);
    setInitialValues(defaultValue);
  }, []);

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    addReview(initialValues, onSuccess).then();
  };

  return (
    <div>
      <form onSubmit={handlerSubmit} className={"flex flex-col gap-4"}>
        <div>
          <label
            htmlFor={"fullName"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.enter + " " + lang.full_name}
          </label>
          <input
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
            }
            onChange={handleChange}
            required
            id={"fullName"}
            name={"fullName"}
            value={initialValues.fullName}
          />
        </div>

        <div>
          <label
            htmlFor={"nameConsult"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.who_did_you_consult}
          </label>
          <select
            name={"nameConsult"}
            id={"nameConsult"}
            required
            value={initialValues.nameConsult}
            className={
              "block  w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
            }
            onChange={handleChange}
          >
            <option value=""></option>
            {Object.entries(nameConsultListsEnum).map(([key, value]) => (
              <option className={"!text-gray-900"} key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={"rating"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.assess_from_1_to_10}
          </label>
          <select
            value={initialValues.rating}
            name={"rating"}
            id={"rating"}
            className={
              "block  w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
            }
            onChange={handleChange}
          >
            <option value=""></option>
            {[...Array(10).keys()].map((num) => (
              <option className={"!text-gray-900"} key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={"likeIt"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.what_did_you_like}
          </label>
          <textarea
            rows={4}
            style={{ minHeight: "80px" }}
            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChange}
            id={"likeIt"}
            name={"likeIt"}
            value={initialValues.likeIt}
          />
        </div>

        <div>
          <label
            htmlFor={"offers"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.what_can_we_improve}
          </label>
          <textarea
            rows={4}
            style={{ minHeight: "80px" }}
            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChange}
            id={"offers"}
            name={"offers"}
            value={initialValues.offers}
          />
        </div>

        <div>
          <label
            htmlFor={"comfort"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.how_comfortable_using_site}
          </label>
          <textarea
            rows={4}
            style={{ minHeight: "80px" }}
            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChange}
            id={"comfort"}
            name={"comfort"}
            value={initialValues.comfort}
          />
        </div>

        <div>
          <label
            htmlFor={"recommendation"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.recommend_service}
          </label>
          <textarea
            rows={4}
            style={{ minHeight: "80px" }}
            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChange}
            id={"recommendation"}
            name={"recommendation"}
            value={initialValues.recommendation}
          />
        </div>
        <div>
          <label
            htmlFor={"personalAboutTorsunov"}
            className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {lang.review_personal}
          </label>
          <textarea
            rows={4}
            style={{ minHeight: "80px" }}
            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleChange}
            id={"personalAboutTorsunov"}
            name={"personalAboutTorsunov"}
            value={initialValues.personalAboutTorsunov}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="agreement"
            type="checkbox"
            checked={initialValues.agreement}
            name="agreement"
            onChange={handleChange}
            className="h-4  w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="agreement"
            className="ml-2  cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {lang.consent_to_publication_resources}
          </label>
        </div>

        <button
          className={
            "rounded border border-blue-500 bg-transparent  p-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          }
          type={"submit"}
        >
          {lang.send_review}
        </button>
      </form>
      {success ? (
        <Modal
          title={"Спасибо за вашу обратную связь"}
          outsideClick={() => setSuccess(false)}
          content={<ReviewModal />}
        />
      ) : null}
    </div>
  );
};
