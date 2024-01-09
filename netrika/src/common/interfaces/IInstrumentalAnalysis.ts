export interface IInstrumentalAnalysis {
  //"Дата создания направления" - dat.odii_task.task_created
  serviceRequestCreated: string;

  //"МО заявителя" - dat.odii_task.task_organization_requester.Для значения МО отобразить данные головного МО.
  // С backend отправить запрос по полученному uid dat.odii_task.task_organization_requester, вернуть organization.organization_level1_name
  serviceRequesterOrganization?: string | null;

  //"ФИО врача, сделавшего назначение" - вывести данные через пробел "dat.odli_practitionerrole.practitione_family_name"
  // "dat.odli_practitionerrole.practitione_given_name" "dat.odli_practitionerrole.practitione_middle_name",
  // где dat.odii_task.servicerequest_biz_key = dat.odii_serviceRequest.servicerequest_biz_key,
  // dat.odii_serviceRequest.serviceRequest_requester_practitionerrole_biz_key = dat.odli_practitionerrole.practitionerrole_biz_key
  serviceRequesterName?: string | null;

  //"Код запрашиваемой услуги" - dat.odii_serviceRequest.serviceRequest_code
  serviceRequestCode: string | null;

  //"Область исследования" - dat.odii_serviceRequest.serviceRequest_bodySite (1.2.643.2.69.1.1.1.58)
  serviceRequestBodySite?: string | null;

  //"Источник финансирования" - dat.odii_serviceRequest.serviceRequest_orderDetail_code (1.2.643.2.69.1.1.1.32)
  serviceRequestFinanceSource?: string | null;

  //"Приоритет выполнения" - dat.odii_serviceRequest.serviceRequest_priority_code Приоритет выполнения (отметка срочности)
  // (FHIR 2.16.840.1.113883.4.642.1.116)
  serviceRequestPriority?: string | null;

  //"Тип инструментального исследования" - dat.odii_diagnosticreport.diagnosticreport_category_code (dictionary."1.2.643.5.1.13.13.11.1472")
  diagnosticReportCategory?: string | null;

  //"Дата-время выполнения исследования" - dat.odii_observation.observation_issued
  diagnosticReportIssued?: string | null;

  //"Специальность врача, утвердившего результат" - dat.odli_practitionerrole.practitionerrole_specialty_code (dictionary."1.2.643.5.1.13.13.11.1066"),
  // где dat.odii_task.diagnosticreport_biz_key= dat.odii_diagnosticreport.diagnosticreport_biz_key,
  // dat.odii_diagnosticreport.diagnosticreport_practitionerrole_biz_key = dat.odli_practitionerrole.practitionerrole_biz_key
  practitionerSpecialty?: string | null;

  //"Должность медицинского работника, утвердившего результат" - dat.odli_practitionerrole.practitionerrole_code (1.2.643.5.1.13.13.11.1002),
  // где dat.odii_task.diagnosticreport_biz_key = dat.odii_diagnosticreport.diagnosticreport_biz_key,
  // dat.odii_diagnosticreport.diagnosticreport_practitionerrole_biz_key = dat.odli_practitionerrole.practitionerrole_biz_key
  practitionerRole?: string | null;

  //Код и Название проведенного вида исследования/услуги - (<DiagnosticReportTypeCode>), <DiagnosticReportTypeName>
  diagnosticReportType?: string | null;

  //"ФИО врача, утвердившего результат" - вывести данные через пробел "dat.odli_practitionerrole.practitione_family_name"
  // "dat.odli_practitionerrole.practitione_given_name" "dat.odli_practitionerrole.practitione_middle_name",
  // где dat.odii_task.diagnosticreport_biz_key= dat.odii_diagnosticreport.diagnosticreport_biz_key,
  // dat.odii_diagnosticreport.diagnosticreport_practitionerrole_biz_key = dat.odli_practitionerrole.practitionerrole_biz_key
  practitionerName?: string | null;

  //"Результат исследования" - dat.odii_observation.observation_value_value - данные результата выводить в разворачивающемся блоке.
  // Найти в dat.odii_observation записи для которых одинаковое значение dat.odii_observation.diagnosticreport_biz_key значения
  // dat.odii_observation.observation_value_value выводить как новый абзац
  diagnosticReportObservations?: string | null;

  //"МО (утвердили исследование)" - dat.odli_practitionerrole.practitionerrole_organization_biz_key,
  // где dat.odii_task.diagnosticreport_biz_key= dat.odii_diagnosticreport.diagnosticreport_biz_key,
  // dat.odii_diagnosticreport.diagnosticreport_practitionerrole_biz_key = dat.odli_practitionerrole.practitionerrole_biz_key
  practitionerOrganization?: string | null;

  //Код проведенного вида исследования/услуги - dat.odii_diagnosticreport.diagnosticreport_code
  diagnosticReportTypeCode?: string | null;

  //Название проведенного вида исследования/услуги из справочника - dat.odii_diagnosticreport.diagnosticreport_code (1.2.643.2.69.1.1.1.57)
  diagnosticReportTypeName?: string | null;

  //ФИО + должность врача утвердившего результат - <PractitionerName>, <PractitionerRole>
  practitionerDoctor?: string | null;
}
