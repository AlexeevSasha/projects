import { Button, Drawer, Form, Tabs } from "antd";
import { routePaths } from "common/constants/routePaths";
import { deepMerge } from "common/helpers/deepMerge";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { PagesSectionInfoT } from "../../../common/interfaces/IPagesSection";
import { StateType } from "../../../store";
import { getSectionDataThunk } from "../../../store/pagesSections/sectionDataActionAsync";
import { sectionsActions } from "../../../store/pagesSections/sectionDataSlice";
import { webSitePageList } from "../webSitePageList";
import { FormAcademyEnter } from "./formAcademyEnter/formAcademyEnter";
import { FormClubContacts } from "./formCLubContacts/formClubContacts";
import { FormChairPlotting } from "./formChairPlotting/formChairPlotting";
import { FormClubHistory } from "./formClubHistory/formClubHistory";
import { FormCLubResults } from "./formClubResults/formCLubResults";
import { FormFoodCourt } from "./formFoodCourt/formFoodCourt";
import { FormKidsComics } from "./formKidsComics/formKidsComics";
import { FormKidsRules } from "./formKidsRules/formKidsRules";
import { FormLegends } from "./formLegends/formLegends";
import { FormLoyaltyPartnersOffers } from "./formLoyaltyPartnersOffers/formLoyaltyPartnersOffers";
import { FormLoyaltyRules } from "./formLoyaltyRules/formLoyaltyRules";
import { FormMainPage } from "./formMainPage/formMainPage";
import { FormMatchInfo } from "./formMatchInfo/formMatchInfo";
import { FormMatches } from "./formMatches/formMathes";
import { FormMediaNews } from "./formMediaNews/formMediaNews";
import { FormServicesAdjacentTerritory } from "./formServicesAdjacentTerritory/formServicesAdjacentTerritory";
import { FormServicesExcursionTours } from "./formServicesExcursionTours/formServicesExcursionTours";
import { FormServicesVip } from "./formServicesVip/formServicesVip";
import { FormSpartakKids } from "./formSpartakKids/formSpartakKids";
import { FormStadiumAbout } from "./formStadiumAbout/formStadiumAbout";
import { FormStadiumContacts } from "./formStadiumContacts/formStadiumContacts";
import { FormStadiumHowToGet } from "./formStadiumHowToGet/formStadiumHowToGet";
import { FormStadiumStaff } from "./formStadiumStaff/formStadiumStaff";
import { FormStadiumUsefulInfo } from "./formStadiumUsefulInfo/formStadiumUsefulInfo";
import { FormTicketsMain } from "./formTicketsMain/formTicketsMain";
import { FormTicketsRules } from "./formTicketsRules/formTicketsRules";
import { FormTicketsFanCard } from "./formTicketsFanCard/formTicketsFanCard";
import { FormCorporateClients } from "./formCorporateClients/formCorporateClients";
import { FormTicketsPremium } from "./formTicketsPremium/formTicketsPremium";
import styled from "styled-components";
import { pageStadiumInfoRepository } from "../../../api/pageStadiumInfoRepository";
import { FormTicketsFamilySector } from "./formTicketsFamilySector/formTicketsFamilySector";
import { FormTicketsInvalidPlaces } from "./formTicketsInvalidPlaces/formTicketsInvalidPlaces";
import { FormMorePrivacy } from "./formMorePrivacy/formMorePrivacy";
import { FormAcademyInfrastructure } from "./formAcademyInfrastructure/formAcademyInfrastructure";

export const PagesSectionForm = memo(() => {
  const navigate = useNavigate();
  const schemaType = useParams<{ id: string }>().id;
  const infoSchema = useMemo(() => webSitePageList.find((elem) => elem.schema === schemaType), [schemaType]);
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<PagesSectionInfoT["info"]>();
  const [lang, setLang] = useState("Ru");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const initialValue = useSelector((state: StateType) => state.pagesSections.sectionInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    if (schemaType) {
      dispatch(getSectionDataThunk(schemaType));
    }
  }, [schemaType]);

  const closeDrawer = () => {
    form.resetFields();
    dispatch(sectionsActions.clean());
    setValues({});
    setVisible(false);
    setTimeout(() => {
      navigate("/" + routePaths.pagesSections);
    }, 150);
  };

  useEffect(() => {
    if (!visible || !initialValue) {
      form.resetFields();
    } else {
      form.setFieldsValue(initialValue?.info);
      setValues(initialValue?.info);
    }
  }, [initialValue, visible]);

  const submitForm = useCallback(async () => {
    const newValue = deepMerge<any[]>({ ...values }, form.getFieldsValue());
    if (schemaType) {
      pageStadiumInfoRepository
        .publish({
          type: schemaType,
          jsonData: JSON.stringify(deepMerge<any[]>({ ...initialValue?.info }, newValue)),
        })
        .then(() => {
          form.resetFields();
          dispatch(sectionsActions.clean());
          setValues({});
          setVisible(false);
          setTimeout(() => {
            navigate("/" + routePaths.pagesSections);
          }, 150);
        });
    }
  }, [form, values, schemaType]);

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const renderScheme = useMemo(() => {
    switch (infoSchema?.schema) {
      case "stadiumAbout":
        return <FormStadiumAbout lang={lang} />;
      case "clubContacts":
        return <FormClubContacts lang={lang} />;
      case "clubHistory":
        return <FormClubHistory lang={lang} />;
      case "stadiumHowToGet":
        return <FormStadiumHowToGet lang={lang} />;
      case "stadiumContacts":
        return <FormStadiumContacts lang={lang} />;
      case "stadiumUsefulInfo":
        return <FormStadiumUsefulInfo lang={lang} />;
      case "clubResults":
        return <FormCLubResults lang={lang} />;
      case "stadiumStaff":
        return <FormStadiumStaff lang={lang} />;
      case "servicesAdjacentTerritory":
        return <FormServicesAdjacentTerritory lang={lang} />;
      case "servicesVip":
        return <FormServicesVip lang={lang} />;
      case "excursionTours":
        return <FormServicesExcursionTours lang={lang} />;
      case "academyEnter":
        return <FormAcademyEnter lang={lang} />;
      case "loyaltyPartnersOffers":
        return <FormLoyaltyPartnersOffers lang={lang} />;
      case "ticketsMain":
        return <FormTicketsMain lang={lang} />;
      case "ticketsRules":
        return <FormTicketsRules lang={lang} />;
      case "ticketsPremium":
        return <FormTicketsPremium lang={lang} />;
      case "ticketsFanCard":
        return <FormTicketsFanCard lang={lang} />;
      case "legends":
        return <FormLegends lang={lang} />;
      case "chairPlotting":
        return <FormChairPlotting lang={lang} />;
      case "loyaltyRules":
        return <FormLoyaltyRules lang={lang} />;
      case "spartakKids":
        return <FormSpartakKids lang={lang} />;
      case "kidsRules":
        return <FormKidsRules lang={lang} />;
      case "kidsComics":
        return <FormKidsComics lang={lang} />;
      case "mediaNews":
        return <FormMediaNews lang={lang} />;
      case "mainPage":
        return <FormMainPage lang={lang} />;
      case "matches":
        return <FormMatches lang={lang} />;
      case "matchInfo":
        return <FormMatchInfo lang={lang} />;
      case "foodCourt":
        return <FormFoodCourt lang={lang} />;
      case "corporateClients":
        return <FormCorporateClients lang={lang} />;
      case "ticketsFamilySector":
        return <FormTicketsFamilySector lang={lang} />;
      case "morePrivacy":
        return <FormMorePrivacy lang={lang} />;
      case "ticketsInvalidPlaces":
        return <FormTicketsInvalidPlaces lang={lang} />;
      case "academyInfrastructure":
        return <FormAcademyInfrastructure lang={lang} />;
      default: {
        console.log("нет такой схемы =>", infoSchema?.schema);

        return null;
      }
    }
  }, [infoSchema, lang]);

  return (
    <Drawer
      title={t("allPages.edit") + " " + t("pagesSections.entity") + ': "' + infoSchema?.name + '"'}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width={"56%"}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("allPages.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab="Русский язык" key="Ru" />
        <Tabs.TabPane tab="Английский язык" key="En" />
      </Tabs>
      <Form form={form} layout="vertical">
        <Container>{renderScheme}</Container>
      </Form>
    </Drawer>
  );
});

const Container = styled.div`
  display: grid;
  grid-row-gap: 24px;
`;
