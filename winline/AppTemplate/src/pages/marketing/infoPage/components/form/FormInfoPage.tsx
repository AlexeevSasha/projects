import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Card, Divider, Form, Image, Input, message, Modal, Upload } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { ViewingHtmlModal } from "../ViewingHtmlModal";
import JoditEditor from "jodit-react";
import { debounce } from "lodash";
import { IFilterContent } from "../../../../../api/dto/content/IContent";
import { StateType, useAppDispatch } from "../../../../../core/redux/store";
import { getImageInfoPageEntities } from "../../../../../modules/content/infoPage/imageInfoPage/imageInfoPageSelector";
import {
  addImageInfoPageThunk,
  deleteImageInfoPageThunk,
  getAllImageInfoPageThunk
} from "../../../../../modules/content/infoPage/imageInfoPage/imageInfoPageActionAsync";
import { infoPage } from "../../../../../modules/content/infoPage/infoPage/infoPageSlice";
import { addInfoPageThunk, updateInfoPageThunk } from "../../../../../modules/content/infoPage/infoPage/infoPageActionAsync";
import { Loader } from "../../../../../ui/Loader";
import { FiltersHeaderBase } from "../../../../../ui/customFilters/FiltersHeaderBase";
import { imageInfoPage } from "../../../../../modules/content/infoPage/imageInfoPage/imageInfoPageSlice";
import { XSSProtection } from "../../../../../common/helpers/infoPage/XSSProtection";
import { theme } from "../../../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { ContentStyled, HeaderStyled, StyledTooltip, TitleStyled } from "../../../../../ui/commonComponents";
import { useNavigate } from "react-router-dom";
import { ImageModalForm } from "./ImgModalForm";
import { routePaths } from "../../../../../common/constants/routePaths";

export const FormInfoPage = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const [imageInfoPageFilters, setImageInfoPageFilters] = useState<IFilterContent>({
    pagination: 1,
    sorting: "",
    contentType: "Image",
    name: "",
    date: null
  });
  const editor = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [imgData, setImgData] = useState<any | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [errorHtmlData, setErrorHtmlData] = useState<boolean>(false);
  const token = useSelector((state: StateType) => state.authData.authData.access_token);
  const { count, isLoading } = useSelector((state: StateType) => state.imageInfoPage);
  const currentInfoPage = useSelector((state: StateType) => state.infoPage.currentInfoPage);
  const imageInfoPages = useSelector(getImageInfoPageEntities);

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("common.image") + " " + t("common.modal.contentNeuter"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => dispatch(deleteImageInfoPageThunk(id))
    });
  };

  const changeImageFilters = useCallback(
    debounce((nameField: string, value: string | number) => {
      setImageInfoPageFilters((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    []
  );

  const resetFilters = useCallback(() => {
    setImageInfoPageFilters({ ...imageInfoPageFilters, name: "" });
  }, [imageInfoPageFilters]);

  useEffect(() => {
    if (htmlContent !== "" && htmlContent !== "<p><br></p>") {
      setErrorHtmlData(false);
    }
  }, [htmlContent]);

  useEffect(() => {
    dispatch(getAllImageInfoPageThunk(imageInfoPageFilters));
  }, [
    getAllImageInfoPageThunk,
    imageInfoPageFilters.sorting,
    imageInfoPageFilters.pagination,
    imageInfoPageFilters.contentType,
    imageInfoPageFilters.name,
    count
  ]);

  useEffect(() => {
    if (currentInfoPage) {
      setHtmlContent(currentInfoPage?.additionalInfo?.htmlContent);
    }
  }, [currentInfoPage]);

  const closeForm = () => {
    dispatch(infoPage.actions.setCurrentInfoPage({ infoPage: null }));
    navigate(-1);
    setHtmlContent("");
  };

  const submitFormInfoPage = () => {
    if (htmlContent === "" || htmlContent === "<p><br></p>") {
      setErrorHtmlData(true);
    }
    if (!errorHtmlData) {
      form.validateFields().then((values) => {
        if (currentInfoPage) {
          dispatch(
            updateInfoPageThunk({
              ...currentInfoPage,
              ...values,
              additionalInfo: {
                htmlContent: htmlContent,
                buttons: []
              }
            })
          );
        } else {
          dispatch(
            addInfoPageThunk({
              ...values,
              contentType: "InfoPage",
              contentStatus: "Published",
              additionalInfo: {
                htmlContent: htmlContent,
                buttons: []
              }
            })
          );
        }
        closeForm();
      });
    }
  };

  const addImage = (file: any) => {
    dispatch(
      addImageInfoPageThunk({
        name: file.name,
        tag: null,
        contentType: "Image",
        contentStatus: "Unknown",
        additionalInfo: {
          path: file.response
        }
      })
    );
  };

  const config = {
    language: "ru",
    placeholder: t("marketing.infoPages.form.fillForm"),
    removeButtons: ["preview"]
  };

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper>
        <div style={{ width: "60%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 20 }}>
            <Button onClick={() => setHtmlData(htmlContent)} disabled={errorHtmlData}>
              {t("common.view")}
            </Button>
          </div>
          <FormPage form={form} layout="vertical">
            <Form.Item
              label={t("common.title")}
              required={false}
              name={"name"}
              initialValue={currentInfoPage?.name}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <Input size={"middle"} maxLength={150} />
            </Form.Item>
            <Form.Item label={t("marketing.infoPages.tag")} required={false} name={"tag"} initialValue={currentInfoPage?.tag}>
              <Input size={"middle"} maxLength={150} />
            </Form.Item>
            <div style={{ border: errorHtmlData ? "1px solid red" : "" }}>
              <JoditEditor
                ref={editor}
                value={htmlContent}
                //@ts-ignore
                config={config}
                // tabIndex={-1} // tabIndex of textarea
                onBlur={(newContent) => setHtmlContent(XSSProtection(newContent))}
                // preferred to use only this option to update the content for performance reasons
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                // onChange={(newContent) => setHtmlContent(XSSProtection(newContent))}
              />
            </div>
            {errorHtmlData && <span style={{ color: theme.colors.red }}>{t("validations.required")}</span>}
          </FormPage>
        </div>
        <div style={{ width: "40%" }}>
          <FiltersHeaderBase
            placeholder={t("marketing.infoPages.form.imageSearch")}
            name={"name"}
            onChange={changeImageFilters}
            resetFilters={resetFilters}
            isDisabledResetFilters={false}
          />
          <Upload
            action={`${process.env.REACT_APP_API}/content/v1/Content/AddImage`}
            headers={{
              Authorization: `Bearer ${token}`
            }}
            name="formFile"
            listType="picture"
            onChange={(info) => {
              if (info.file.status === "done") {
                dispatch(imageInfoPage.actions.setStateLoadigImageInfoPage(false));
                addImage(info.file);
              } else if (info.file.status === "error") {
                message.error("При загрузке данных произошла ошибка.");
                dispatch(imageInfoPage.actions.setStateLoadigImageInfoPage(false));
              } else {
                dispatch(imageInfoPage.actions.setStateLoadigImageInfoPage(true));
              }
            }}
            className="upload-list-inline"
            showUploadList={false}
            onPreview={(e) => setImgData(e)}
          >
            <UploadButton icon={<UploadOutlined />}>{t("common.upload")}</UploadButton>
          </Upload>
          {imageInfoPages.length ? (
            <ImgWrapper>
              {imageInfoPages.map((item) => {
                return (
                  <ImgItem key={item.id}>
                    <StyledTooltip title={t("marketing.infoPages.form.moveImage")}>
                      <Image src={item.additionalInfo.path} preview={false} />
                    </StyledTooltip>
                    <div>
                      <a onClick={() => setImgData(item)}>{item.name}</a>
                      <span style={{ color: theme.colors.lightGray }}>{item.tag}</span>
                    </div>
                    <StyledTooltip title={t("common.delete")}>
                      <Button type="link" icon={<DeleteOutlined />} onClick={() => showDeleteModal?.(item.id)} />
                    </StyledTooltip>
                  </ImgItem>
                );
              })}
            </ImgWrapper>
          ) : (
            <h3>{t("marketing.infoPages.form.noData")}</h3>
          )}
        </div>
      </Wrapper>
      <Divider style={{ margin: "20px 0px" }} />
      <FooterWrapper>
        <Button onClick={closeForm}>{t("common.buttonsText.cancel")}</Button>
        <Button onClick={submitFormInfoPage} type="primary" htmlType={"submit"}>
          {t("common.buttonsText.save")}
        </Button>
      </FooterWrapper>
      <ImageModalForm setImgData={setImgData} imgData={imgData} />
      <ViewingHtmlModal setHtmlData={setHtmlData} htmlData={htmlData} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  height: 700px;
  overflow-y: scroll;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button:first-child {
    margin-right: 16px;
  }
`;

const FormPage = styled(Form)`
  margin: 0 20px 0 20px;
`;

const UploadButton = styled(Button)`
  position: absolute;
  top: 24px;
  right: 60px;
  @media (max-width: 1660px) {
    position: relative;
    top: 0;
    right: 0;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  height: 66%;
  overflow-y: scroll;
  align-content: flex-start;
`;

const ImgItem = styled.div`
  display: flex;
  border: 1px solid #d9d9d9;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  width: 200px;
  height: 70px;
  img {
    margin-right: 8px;
    width: 48px;
    height: 48px;
    cursor: grab;
    :active {
      cursor: grabbing;
    }
  }
  div + div {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
