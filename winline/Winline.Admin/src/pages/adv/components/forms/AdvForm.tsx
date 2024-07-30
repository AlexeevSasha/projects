import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Button, DatePicker, Drawer, Form, Input, Select, Modal, message } from "antd";
import moment, { Moment } from "moment";
import { createBannerThunk, getBannersThunk, updateBannerThunk } from "../../../../modules/adv/advActionAsync";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import { getPlaces } from "../../../../api/requests/adv";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import type { IAdv, IAdvFilters } from "../../../../api/dto/adv/IAdv";
import type { IConfigImage } from "../../../../api/dto/IConfigImage";
import type { IPlace } from "../../../../api/dto/adv/IPlace";
import type { IClub } from "../../../../api/dto/IClub";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps {
  data: IAdv | null;
  onClose: () => void;
  visible: boolean;
  filterValues: IAdvFilters;
}

const image = formsConstantsValidation.entity.adv.image;
const uploadAction = `${process.env.REACT_APP_ADMIN}/Banner/AddImage`;

export const AdvForm = ({ data, onClose, visible, filterValues }: IProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const projects = useSelector((state: StateType) => state.commons.clubs);
  const { isLoading } = useSelector((state: StateType) => state.adv);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [configImage, setConfigImage] = useState<IConfigImage>({ width: 0, height: 0, size: 0 });
  const [disableImage, setDisableImage] = useState<boolean>(true);
  const [disablePlace, setDisablePlace] = useState<boolean>(true);
  const [placeChanged, setPlaceChanged] = useState<boolean>(false);
  const [placeValue, setPlaceValue] = useState<string>();
  const [dateChanged, setDateChanged] = useState<[Moment, Moment] | null>();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [clubValue, setClubValue] = useState<string>();

  const setImageValidation = (sel: string, places1: IPlace[]) => {
    const selectedPlace = places1.find((place: IPlace) => place.id == sel)!;
    if (selectedPlace) {
      const config = { width: selectedPlace.width, height: selectedPlace.height, size: image.size };
      setConfigImage(config);
    }
  };

  useEffect(() => {
    if (dateChanged && clubValue) {
      getPlaces(dateChanged, clubValue, data?.id).then((result) => {
        if (data) {
          setImageValidation(data.locationId, result);
        }
        setPlaces(result);
        setDisablePlace(false);
        const searchLocation = placeValue || form.getFieldValue("locationId");
        const placeBusy = result.find((place: IPlace) => place.id == searchLocation && place.currentCountImage == place.maxCountImage);
        if (placeBusy) {
          setPlaceValue(searchLocation);
          form.resetFields(["locationId"]);
          setDisableImage(true);
          form.submit();
        } else {
          form.setFieldsValue({
            locationId: searchLocation
          });
        }
        if (form.getFieldValue("locationId")) {
          setDisableImage(false);
        }
      });
    }
  }, [dateChanged, clubValue]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        rangeDate: [moment(data.startPublish), moment(data.endPublish)],
        locationId: data.locationId,
        clubId: data.clubId,
        imageUri: data.imageUri,
        transitionUri: data.transitionUri
      });
      setImageUrl(data.imageUri);
      setClubValue(data.clubId);
      setPlaceValue(data.locationId);
      setDateChanged([moment(data.startPublish), moment(data.endPublish)]);
    }
  }, [form, data]);

  const closeDrawer = () => {
    form.resetFields();
    setImageUrl("");
    setDisableImage(true);
    setDisablePlace(true);
    setClubValue("");
    setPlaceValue("");
    setDateChanged(null);
    onClose();
  };

  const confirmModal = (action: Function) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.edit") + "?",
      maskClosable: true,
      content: t("adv.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        action();
        closeDrawer();
      }
    });
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const dataInPayload = { startPublish: values.rangeDate[0], endPublish: values.rangeDate[1], ...values };
      delete dataInPayload["rangeDate"];
      if (values.rangeDate[1] < moment()) {
        message.error(i18next.t("validations.invalidEndPublish"));

        return;
      }
      if (data) {
        confirmModal(() => {
          dispatch(
            updateBannerThunk({
              id: data.id,
              ...dataInPayload
            })
          ).then(() => dispatch(getBannersThunk(filterValues)));
        });
      } else {
        dispatch(createBannerThunk({ ...dataInPayload })).then(() => dispatch(getBannersThunk(filterValues)));
        closeDrawer();
      }
    });
  };

  const handleClubChange = (value: string) => {
    setClubValue(value);
    setPlaceValue("");
    setPlaceChanged(!placeChanged);
    setDisableImage(true);
    form.resetFields(["locationId", "imageUri"]);
  };

  const handlePlaceChange = (sel: string) => {
    setImageUrl("");
    setDisableImage(false);
    setPlaceChanged(!placeChanged);
    setPlaceValue(sel);
    setImageValidation(sel, places);
    form.resetFields(["imageUri"]);
  };

  const handlerDateChanged = (value: any) => {
    setDateChanged(value);
    if (!value) {
      setDisablePlace(true);
      setDisableImage(true);
    }
  };

  const options = useMemo(
    () =>
      projects.map((project: IClub) => (
        <Option key={project.id} value={project.id}>
          {project.clubName}
        </Option>
      )),
    [projects]
  );

  const placeOptions = useMemo(
    () =>
      places.map((place: IPlace) => (
        <Option key={place.id} value={place.id} disabled={place.currentCountImage == place.maxCountImage}>
          {place.name} - {place.currentCountImage}/{place.maxCountImage}
        </Option>
      )),
    [places]
  );

  return (
    <Drawer
      title={
        data ? t("common.edit") + " " + t("adv.entity").toLowerCase() : t("common.buttonsText.create") + " " + t("adv.entity").toLowerCase()
      }
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={visible}
      width={400}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          required={false}
          label={t("adv.rangeDate")}
          name={"rangeDate"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
        >
          <RangePicker format={formsConstantsValidation.dateTimeFormat} onChange={handlerDateChanged} showTime />
        </Form.Item>
        <Form.Item
          label={t("common.title")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.adv.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.adv.max })
            }
          ]}
          name={"name"}
        >
          <Input size={"middle"} />
        </Form.Item>

        <Form.Item
          required={false}
          label={t("common.project")}
          name={"clubId"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
        >
          <Select
            placeholder={t("common.selectPlaceholder")}
            showSearch={false}
            size={"middle"}
            defaultValue={data?.clubId}
            onChange={handleClubChange}
            disabled={!!data?.clubId}
          >
            {options}
          </Select>
        </Form.Item>
        <Form.Item
          required={false}
          label={t("common.place")}
          name={"locationId"}
          rules={[
            {
              required: true,
              message: t("validations.maxLimitBanners")
            }
          ]}
        >
          <Select
            placeholder={t("common.selectPlaceholder")}
            showSearch={false}
            size={"middle"}
            defaultValue={placeValue}
            onChange={handlePlaceChange}
            disabled={disablePlace}
          >
            {placeOptions}
          </Select>
        </Form.Item>
        <ImageUpload
          action={`${uploadAction}?locationId=${placeValue}`}
          label={t("common.image")}
          updateImage={imageUrl}
          form={form}
          name={"imageUri"}
          entity={image}
          mimeTypes={["image/jpeg", "image/png"]}
          disabled={disableImage}
          config={configImage}
          validationDependence={placeChanged}
        />
        <Form.Item
          label={t("common.links.hyperLink")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              type: "url",
              message: t("validations.invalidUri")
            },
            {
              max: formsConstantsValidation.link.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })
            }
          ]}
          name={"transitionUri"}
        >
          <Input size={"middle"} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
