import React from "react";
import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import { styled } from "common/styles/styled";

export default class BpmnModeler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const url = this.props.url;
    const diagramXML =
      this.props?.diagramXML ||
      `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.0">
  <collaboration id="Collaboration_0pm7oiy">
    <participant id="Participant_17xiyar" name="id_pomp_graph=1111_Маршрут ОКС" processRef="Process_1" />
  </collaboration>
  <process id="Process_1" isExecutable="false">
    <laneSet id="LaneSet_1fd5wtn">
      <lane id="Lane_0tea37h" name="stage_code=&#39;65f3da2b-2429-45ff-97a7-e6e77aeb5bdb&#39;|Лечение">
        <flowNodeRef>Activity_14jdotu</flowNodeRef>
        <childLaneSet id="LaneSet_0v73u32">
          <lane id="Lane_07i6xgg">
            <flowNodeRef>Activity_14jdotu</flowNodeRef>
          </lane>
        </childLaneSet>
      </lane>
      <lane id="Lane_0zkvh3c" name="stage_code=&#39;25cdcb23-2f6d-4537-b21f-086e1b8242a7&#39;|Диспансерное наблюдение">
        <flowNodeRef>Activity_1cbt74c</flowNodeRef>
        <childLaneSet id="LaneSet_0aus3ah">
          <lane id="Lane_0oajv1p">
            <flowNodeRef>Activity_1cbt74c</flowNodeRef>
          </lane>
        </childLaneSet>
      </lane>
      <lane id="Lane_199u16g" name="stage_code=&#39;7aa437fb-3242-4e4b-a1c3-e44ce5301749&#39;|Диагностика">
        <flowNodeRef>Activity_1s61952</flowNodeRef>
        <flowNodeRef>Activity_0ykdgrw</flowNodeRef>
        <flowNodeRef>Activity_0scpyjm</flowNodeRef>
        <flowNodeRef>Activity_1vpku4n</flowNodeRef>
        <flowNodeRef>Activity_0glmnl6</flowNodeRef>
        <childLaneSet id="LaneSet_14tjjgs">
          <lane id="Lane_18ujyk8">
            <flowNodeRef>Activity_1s61952</flowNodeRef>
            <flowNodeRef>Activity_0ykdgrw</flowNodeRef>
            <flowNodeRef>Activity_0scpyjm</flowNodeRef>
            <flowNodeRef>Activity_1vpku4n</flowNodeRef>
            <flowNodeRef>Activity_0glmnl6</flowNodeRef>
          </lane>
        </childLaneSet>
      </lane>
      <lane id="Lane_0esoi0p" name="stage_code=&#39;aa82d4d2-31d2-4693-a983-4b9b75744cbc&#39;|Подозрение">
        <flowNodeRef>Activity_1bsizew</flowNodeRef>
        <flowNodeRef>Activity_05xqpud</flowNodeRef>
        <childLaneSet id="LaneSet_0ya9pbb">
          <lane id="Lane_0mswoww">
            <flowNodeRef>Activity_1bsizew</flowNodeRef>
            <flowNodeRef>Activity_05xqpud</flowNodeRef>
          </lane>
        </childLaneSet>
      </lane>
      <lane id="Lane_1en295v" name="stage_code=&#39;b866fc73-b658-4c5c-90f5-e463b7a581b8&#39;|Медицинская реабилитация">
        <flowNodeRef>Activity_1dra6yw</flowNodeRef>
        <childLaneSet id="LaneSet_1pkjxrp">
          <lane id="Lane_0dxopr7">
            <flowNodeRef>Activity_1dra6yw</flowNodeRef>
          </lane>
        </childLaneSet>
      </lane>
    </laneSet>
    <subProcess id="Activity_1bsizew" name="id_pomp_state=21712|Выполнение ЭКГ в СМП">
      <outgoing>Flow_158sbez</outgoing>
      <task id="Activity_0dcni67" name="id_pomp_activity=1517|918н - Маршрут ОКС - Выполнение ЭКГ в СМП" />
    </subProcess>
    <subProcess id="Activity_05xqpud" name="id_pomp_state=21711|Постановка предварительного диагноза">
      <incoming>Flow_158sbez</incoming>
      <outgoing>Flow_02ifdyp</outgoing>
    </subProcess>
    <subProcess id="Activity_1dra6yw" name="id_pomp_state=21717|1 этап медицинской медицинской реабилитации">
      <incoming>Flow_162ef7t</incoming>
      <task id="Activity_1auwzo9" name="id_pomp_activity=1519|918н - Маршрут ОКС - 1 этап медицинской медицинской реабилитации" />
    </subProcess>
    <subProcess id="Activity_1s61952" name="id_pomp_state=21709|Госпитализация пациента">
      <incoming>Flow_02ifdyp</incoming>
      <outgoing>Flow_0hj7wen</outgoing>
    </subProcess>
    <subProcess id="Activity_14jdotu" name="id_pomp_state=21727|Выполнение ЧКВ">
      <incoming>Flow_0zby5rm</incoming>
      <outgoing>Flow_00t7fx4</outgoing>
      <task id="Activity_0ubivyw" name="id_pomp_activity=1527|918н - Маршрут ОКС - Выполнение ЧКВ" />
    </subProcess>
    <subProcess id="Activity_0ykdgrw" name="id_pomp_state=21710|Осмотр кардиолога">
      <incoming>Flow_0hj7wen</incoming>
      <outgoing>Flow_1yyo98o</outgoing>
      <task id="Activity_096k6kp" name="id_pomp_activity=1516|918н - Маршрут ОКС - Осмотр кардиолога" />
    </subProcess>
    <subProcess id="Activity_0scpyjm" name="id_pomp_state=21705|Выполнение ЭКГ">
      <incoming>Flow_1yyo98o</incoming>
      <outgoing>Flow_162ef7t</outgoing>
      <outgoing>Flow_115mytw</outgoing>
      <task id="Activity_1n4fx5x" name="id_pomp_activity=1512|918н - Маршрут ОКС - Выполнение ЭКГ" />
    </subProcess>
    <subProcess id="Activity_1vpku4n" name="id_pomp_state=21699|Потверждение диагноза">
      <incoming>Flow_115mytw</incoming>
      <outgoing>Flow_1woaer9</outgoing>
    </subProcess>
    <subProcess id="Activity_0glmnl6" name="id_pomp_state=21697|Выполнение коронарографии">
      <incoming>Flow_1woaer9</incoming>
      <outgoing>Flow_0zby5rm</outgoing>
      <task id="Activity_1gx190x" name="id_pomp_activity=1506|918н - Маршрут ОКС - Выполнение коронарографии" />
    </subProcess>
    <subProcess id="Activity_1cbt74c" name="id_pomp_state=21723|Постановка на диспансерное наблюдение">
      <incoming>Flow_00t7fx4</incoming>
    </subProcess>
    <sequenceFlow id="Flow_158sbez" sourceRef="Activity_1bsizew" targetRef="Activity_05xqpud" />
    <sequenceFlow id="Flow_02ifdyp" sourceRef="Activity_05xqpud" targetRef="Activity_1s61952" />
    <sequenceFlow id="Flow_162ef7t" sourceRef="Activity_0scpyjm" targetRef="Activity_1dra6yw" />
    <sequenceFlow id="Flow_0hj7wen" sourceRef="Activity_1s61952" targetRef="Activity_0ykdgrw" />
    <sequenceFlow id="Flow_0zby5rm" sourceRef="Activity_0glmnl6" targetRef="Activity_14jdotu" />
    <sequenceFlow id="Flow_00t7fx4" sourceRef="Activity_14jdotu" targetRef="Activity_1cbt74c" />
    <sequenceFlow id="Flow_1yyo98o" sourceRef="Activity_0ykdgrw" targetRef="Activity_0scpyjm" />
    <sequenceFlow id="Flow_115mytw" sourceRef="Activity_0scpyjm" targetRef="Activity_1vpku4n" />
    <sequenceFlow id="Flow_1woaer9" sourceRef="Activity_1vpku4n" targetRef="Activity_0glmnl6" />
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Collaboration_0pm7oiy">
      <bpmndi:BPMNShape id="Participant_17xiyar_di" bpmnElement="Participant_17xiyar" isHorizontal="true">
        <omgdc:Bounds x="160" y="80" width="1590" height="1560" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0tea37h_di" bpmnElement="Lane_0tea37h" isHorizontal="true">
        <omgdc:Bounds x="190" y="650" width="1560" height="330" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_07i6xgg_di" bpmnElement="Lane_07i6xgg" isHorizontal="true">
        <omgdc:Bounds x="220" y="650" width="1530" height="330" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0zkvh3c_di" bpmnElement="Lane_0zkvh3c" isHorizontal="true">
        <omgdc:Bounds x="190" y="980" width="1560" height="330" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0oajv1p_di" bpmnElement="Lane_0oajv1p" isHorizontal="true">
        <omgdc:Bounds x="220" y="980" width="1530" height="330" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_199u16g_di" bpmnElement="Lane_199u16g" isHorizontal="true">
        <omgdc:Bounds x="190" y="340" width="1560" height="310" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_18ujyk8_di" bpmnElement="Lane_18ujyk8" isHorizontal="true">
        <omgdc:Bounds x="220" y="340" width="1530" height="310" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0esoi0p_di" bpmnElement="Lane_0esoi0p" isHorizontal="true">
        <omgdc:Bounds x="190" y="80" width="1560" height="260" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0mswoww_di" bpmnElement="Lane_0mswoww" isHorizontal="true">
        <omgdc:Bounds x="220" y="80" width="1530" height="260" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1en295v_di" bpmnElement="Lane_1en295v" isHorizontal="true">
        <omgdc:Bounds x="190" y="1310" width="1560" height="330" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0dxopr7_di" bpmnElement="Lane_0dxopr7" isHorizontal="true">
        <omgdc:Bounds x="220" y="1310" width="1530" height="330" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0xuegey" bpmnElement="Activity_1bsizew" isExpanded="true">
        <omgdc:Bounds x="250" y="110" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0ym4zh4" bpmnElement="Activity_0dcni67">
        <omgdc:Bounds x="310" y="170" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_06gnekl" bpmnElement="Activity_05xqpud" isExpanded="true">
        <omgdc:Bounds x="510" y="110" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0r99xnx" bpmnElement="Activity_1dra6yw" isExpanded="true">
        <omgdc:Bounds x="370" y="1350" width="250" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1blljql" bpmnElement="Activity_1auwzo9">
        <omgdc:Bounds x="450" y="1410" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_111vx1j" bpmnElement="Activity_1s61952" isExpanded="true">
        <omgdc:Bounds x="250" y="400" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1szjrkb" bpmnElement="Activity_14jdotu" isExpanded="true">
        <omgdc:Bounds x="250" y="700" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1qxksv7" bpmnElement="Activity_0ubivyw">
        <omgdc:Bounds x="310" y="770" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0js5wk1" bpmnElement="Activity_0ykdgrw" isExpanded="true">
        <omgdc:Bounds x="510" y="400" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0mzujwb" bpmnElement="Activity_096k6kp">
        <omgdc:Bounds x="560" y="460" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_13ugrsr" bpmnElement="Activity_0scpyjm" isExpanded="true">
        <omgdc:Bounds x="770" y="400" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1w1nho9" bpmnElement="Activity_1n4fx5x">
        <omgdc:Bounds x="820" y="460" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0pjmdrr" bpmnElement="Activity_1vpku4n" isExpanded="true">
        <omgdc:Bounds x="1040" y="400" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_14kpicd" bpmnElement="Activity_0glmnl6" isExpanded="true">
        <omgdc:Bounds x="1310" y="400" width="210" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_14eh7s7" bpmnElement="Activity_1gx190x">
        <omgdc:Bounds x="1370" y="460" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1cbt74c_di" bpmnElement="Activity_1cbt74c" isExpanded="true">
        <omgdc:Bounds x="260" y="1040" width="260" height="200" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_158sbez_di" bpmnElement="Flow_158sbez">
        <omgdi:waypoint x="460" y="210" />
        <omgdi:waypoint x="510" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_02ifdyp_di" bpmnElement="Flow_02ifdyp">
        <omgdi:waypoint x="615" y="310" />
        <omgdi:waypoint x="615" y="355" />
        <omgdi:waypoint x="355" y="355" />
        <omgdi:waypoint x="355" y="400" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hj7wen_di" bpmnElement="Flow_0hj7wen">
        <omgdi:waypoint x="460" y="500" />
        <omgdi:waypoint x="510" y="500" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1yyo98o_di" bpmnElement="Flow_1yyo98o">
        <omgdi:waypoint x="720" y="500" />
        <omgdi:waypoint x="770" y="500" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_162ef7t_di" bpmnElement="Flow_162ef7t">
        <omgdi:waypoint x="875" y="600" />
        <omgdi:waypoint x="875" y="1330" />
        <omgdi:waypoint x="495" y="1330" />
        <omgdi:waypoint x="495" y="1350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_115mytw_di" bpmnElement="Flow_115mytw">
        <omgdi:waypoint x="980" y="500" />
        <omgdi:waypoint x="1040" y="500" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1woaer9_di" bpmnElement="Flow_1woaer9">
        <omgdi:waypoint x="1250" y="500" />
        <omgdi:waypoint x="1310" y="500" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zby5rm_di" bpmnElement="Flow_0zby5rm">
        <omgdi:waypoint x="1520" y="500" />
        <omgdi:waypoint x="1560" y="500" />
        <omgdi:waypoint x="1560" y="670" />
        <omgdi:waypoint x="355" y="670" />
        <omgdi:waypoint x="355" y="700" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_00t7fx4_di" bpmnElement="Flow_00t7fx4">
        <omgdi:waypoint x="460" y="800" />
        <omgdi:waypoint x="510" y="800" />
        <omgdi:waypoint x="510" y="1010" />
        <omgdi:waypoint x="390" y="1010" />
        <omgdi:waypoint x="390" y="1040" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;
    const container = this.containerRef.current;

    this.bpmnViewer = new BpmnJS({ container });

    this.bpmnViewer.on("import.done", (event) => {
      const { error, warnings } = event;

      if (error) {
        return this.handleError(error);
      }

      this.bpmnViewer.get("canvas").zoom("fit-viewport");

      return this.handleShown(warnings);
    });

    if (url) {
      return this.fetchDiagram(url);
    }

    if (diagramXML) {
      return this.displayDiagram(diagramXML);
    }
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;

    if (props.url !== prevProps.url) {
      return this.fetchDiagram(props.url);
    }

    const currentXML = props.diagramXML || state.diagramXML;

    const previousXML = prevProps.diagramXML || prevState.diagramXML;

    if (currentXML && currentXML !== previousXML) {
      return this.displayDiagram(currentXML);
    }
  }

  displayDiagram(diagramXML) {
    this.bpmnViewer.importXML(diagramXML);
  }

  fetchDiagram(url) {
    this.handleLoading();

    fetch(url)
      .then((response) => response.text())
      .then((text) => this.setState({ diagramXML: text }))
      .catch((err) => this.handleError(err));
  }

  handleLoading() {
    const { onLoading } = this.props;

    if (onLoading) {
      onLoading();
    }
  }

  handleError(err) {
    const { onError } = this.props;

    if (onError) {
      onError(err);
    }
  }

  handleShown(warnings) {
    const { onShown } = this.props;

    if (onShown) {
      onShown(warnings);
    }
  }

  render() {
    return <BPMNContainer className="react-bpmn-diagram-container2" ref={this.containerRef} />;
  }
}
const BPMNContainer = styled.div`
  border: 1px solid #000000;
  height: 700px;
  width: 100%;
  margin: auto;
`;
