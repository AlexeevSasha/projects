import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import paper from "paper";
import { Dispatch, useEffect, useRef, useState } from "react";
import { Loading } from "../../../components/ui/Loading";

class ColorLine {
  constructor(public color: any) {}
}
//
class Pointer {
  private point;
  constructor(paper: any) {
    this.point = new paper.Path.Circle({
      center: new paper.Point(-10, -10),
      radius: 5,
      // fillColor:"red",
      strokeColor: "black",
    });
  }
  bringToFront() {
    this.point.bringToFront();
  }
  show() {
    this.point.visible = true;
  }
  hide() {
    this.point.visible = false;
  }
  move(x: any, y: any, color: any) {
    this.point.position.x = x;
    this.point.position.y = y;
    this.point.fillColor = color;
  }
}

class HelperLine {
  private line: any;
  constructor(private paper: any, private width: any, private newLineHandler: any) {
    this.newLine();
  }
  newLine() {
    this.line = new paper.Path.Line({
      strokeWidth: this.width,
    });
  }
  start(x: any, y: any, color: any) {
    this.line.strokeColor = color;
    this.line.position.x = x;
    this.line.position.y = y;
  }
  move(x: any, y: any = null) {
    this.line.lastSegment.point.x = x;
  }
  stop() {
    if (!this.line.segments.length || !this.line.strokeColor) return;
    const [start, end] = [this.line.firstSegment.point.x, this.line.lastSegment.point.x].sort(
      (a, b) => a - b
    );
    this.newLineHandler(start, end, this.line.strokeColor.toCSS());
    this.line.visible = false; //hide line
    this.newLine();
  }
}

class KaphaData {
  start: number | undefined;
  end: number | undefined;
  energy: string | undefined;
  value: number | undefined;
}

class EnergyInterface {
  private sections: [number, number] = [5, 7];
  private width: number;
  private height: number;
  private rulerWidth: number;
  private paper: any;
  private lineHeight;
  private data: KaphaData[] = [];
  private marginX;
  private valueLines: paper.Path.Line[] = [];
  public onChange: ((data: any) => void) | undefined;
  constructor(
    private rulers: EnergyLine[],
    options: {
      width: number;
      height: number;
      horizontalWidthRatio: number;
    }
  ) {
    this.width = options.width;
    this.height = options.height;

    this.rulerWidth = this.width * options.horizontalWidthRatio;
    const marginWidth = this.width - this.rulerWidth;
    this.marginX = marginWidth / 2;

    const energyCount = this.rulers.length;
    const lineCount = energyCount * 2 + 1;
    this.lineHeight = this.height / lineCount;
  }

  sectionByRatio(ratio: number) {
    return Math.floor(this.sections[0] * this.sections[1] * (ratio < 1 ? ratio : ratio - 0.00001));
  }

  textData() {
    const dhatuLabels = ["раса", "ракта", "мамса", "медха", "астхи", "маджа", "шукра"];

    const energy = {
      pitta: "Перегрев",
      vata: "Напряжение",
      kapha: "Застой",
    };
    //data to segments
    let dataSegments: { energy: string; value: number; section: number }[] = [];
    for (const rec of this.data) {
      const start = this.sectionByRatio(rec.start!);
      const end = this.sectionByRatio(rec.end!);
      for (let i = start; i <= end; i++)
        dataSegments.push({
          energy: rec.energy!,
          value: rec.value!,
          section: i,
        });
    }
    //sorted
    dataSegments = dataSegments.sort(
      ({ section: sectionA, value: valueA }, { section: sectionB, value: valueB }) => {
        const sectionOrder = sectionA - sectionB;
        return sectionOrder === 0 ? valueB - valueA : sectionOrder;
      }
    );

    //combine segments
    const combinedEnergy: any[] = [];
    for (const section of dataSegments) {
      if (typeof combinedEnergy[section.section] === "undefined")
        combinedEnergy[section.section] = {};
      combinedEnergy[section.section][section.energy] = section.value;
    }

    //segments to text lines
    const textLines: string[] = [];
    for (const segmentIndex in combinedEnergy) {
      const segment = combinedEnergy[segmentIndex];
      const energies: any = Object.entries(segment)
        .map(([en, val]) => {
          const value = 3 - +val!;
          return value === 1
            ? energy[en as keyof typeof energy]
            : `${value}*${energy[en as keyof typeof energy]}`;
        })
        .join(", ");

      const sectionLg = Math.floor(+segmentIndex / this.sections[1]);
      const sectionSm = +segmentIndex % this.sections[1];

      textLines.push(
        [`${+sectionLg + 1} цилиндр`, dhatuLabels[sectionSm]].join(" ") + ": " + energies
      );
    }
    return textLines.join("\n");
  }
  // dataBlocks() {
  //     //data to segments
  //     let dataSegments: { energy: string, value: number, section: number }[] = [];
  //     for (const rec of this.data) {
  //         const start = this.sectionByRatio(rec.start!);
  //         const end = this.sectionByRatio(rec.end!);
  //         for (let i = start; i <= end; i++)
  //             dataSegments.push({
  //                 energy: rec.energy!,
  //                 value: rec.value!,
  //                 section: i
  //             });
  //     }
  //     //sorted
  //     dataSegments = dataSegments.sort(({ section: sectionA, value: valueA }, { section: sectionB, value: valueB }) => {
  //         const sectionOrder = sectionA - sectionB
  //         return sectionOrder === 0 ? valueB - valueA : sectionOrder
  //     });

  //     //combine segments
  //     const combinedEnergy: any[] = [];
  //     for (const section of dataSegments) {
  //         if (typeof combinedEnergy[section.section] === "undefined")
  //             combinedEnergy[section.section] = {};
  //         combinedEnergy[section.section][section.energy] = 3 - section.value
  //     }

  //     return combinedEnergy
  // }

  getRulerStartY(index: number) {
    return (index * 2 + 1) * this.lineHeight;
  }
  getRulerEndY(index: number) {
    return (index * 2 + 2) * this.lineHeight;
  }
  getRulerStartX(index = 0) {
    return this.marginX;
  }
  getRulerEndX(index = 0) {
    return this.width - this.marginX;
  }

  init(canvasEl: HTMLCanvasElement, defaultData: any) {
    this.paper = paper;
    //clear previus state (if needed)
    this.paper.clear();
    // Get a reference to the canvas object
    this.paper.setup(canvasEl);
    // Create an empty project and a view for the canvas:
    this.paper.view.draw();

    this.data = defaultData;
  }

  getLineByColor(color: any): { energy: string; line: number } | undefined {
    for (const ruler of this.rulers)
      for (const lineIndex in ruler.lines) {
        if (color === ruler.lines[lineIndex]!.color.color)
          return { energy: ruler.energy, line: +lineIndex };
      }
  }

  clearValueLines() {
    for (const line of this.valueLines) line.visible = false;
  }

  getRulerIndex(energyName: any) {
    return this.rulers.findIndex(({ energy }) => energy === energyName);
  }

  getRuler(energyName: any) {
    return this.rulers[this.getRulerIndex(energyName)];
  }

  getPositionX(ratio: any) {
    return this.rulerWidth * ratio + this.marginX;
  }

  drawValueLines() {
    this.clearValueLines();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ui = this;
    for (const lineIndex in this.data) {
      const line = this.data[lineIndex]!;
      const ruler = this.getRuler(line.energy)!;
      const y = ruler.getLineY(line.value! + 0.5);
      this.valueLines.push(
        new this.paper.Path.Line({
          from: [this.getPositionX(line.start), y],
          to: [this.getPositionX(line.end), y],
          strokeColor: ruler.getColorByValue(line.value),
          strokeWidth: 16,
          onMouseEnter(event: any) {
            ui.paper.view.context.canvas.style!.cursor = "pointer";
            ui.paper.view.context.canvas.title = "Двойной клик для удаления";
          },
          onMouseLeave(event: any) {
            ui.paper.view.context.canvas.style!.cursor = "default";
            ui.paper.view.context.canvas.title = undefined;
          },
          onDoubleClick(event: any) {
            if (confirm("Удалить капху?")) {
              ui.data.splice(+lineIndex, 1);
              ui.drawValueLines();
              ui.dataChanged();
            }
          },
        })
      );
    }
  }

  optimise() {
    const data: KaphaData[] = this.data;
    let toRem: number[];

    do {
      toRem = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const a = data[i]!;
          const b = data[j]!;
          if (a.energy === b.energy && a.value === b.value) {
            if (a.start! > b.end! || a.end! < b.start!) continue;
            a.start = Math.min(a.start!, b.start!);
            a.end = Math.max(a.end!, b.end!);
            toRem.push(+j);
          }
        }
      }
      const rem = [...(new Set(toRem) as any)].reverse();
      for (const index of rem) data.splice(index, 1);
    } while (toRem.length);
    this.data = data;
  }
  dataChanged() {
    this.onChange!(this.data);
  }

  handleNewLine(xStart: any, xEnd: any, color: any) {
    const { energy, line } = this.getLineByColor(color)!;

    const rec = new KaphaData();
    rec.energy = energy;
    rec.value = line;
    rec.start = (xStart - this.marginX) / this.rulerWidth;
    rec.end = (xEnd - this.marginX) / this.rulerWidth;

    this.data.push(rec);
    this.optimise();
    this.drawValueLines();
    this.dataChanged();
  }

  drawRuler() {
    const line = new HelperLine(this.paper, 16, this.handleNewLine.bind(this));
    const pointer = new Pointer(this.paper);
    const rulers = [];
    for (const rulerIndex in this.rulers) {
      this.rulers[rulerIndex]!.startX = this.getRulerStartX(+rulerIndex);
      this.rulers[rulerIndex]!.endX = this.getRulerEndX(+rulerIndex);
      this.rulers[rulerIndex]!.startY = this.getRulerStartY(+rulerIndex);
      this.rulers[rulerIndex]!.endY = this.getRulerEndY(+rulerIndex);
      this.rulers[rulerIndex]!.sections = this.sections;

      this.rulers[rulerIndex]!.draw(this.paper, pointer, line);
    }
    // pointer.bringToFront();
  }

  draw() {
    this.drawRuler();
  }

  setNewData(newData: KaphaData[]) {
    this.data = newData;
  }
}

class EnergyLine {
  public lines: ColorLine[] = [];
  public startX: number | undefined;
  public startY: number | undefined;
  public endX: number | undefined;
  public endY: number | undefined;
  public paper: any;
  public fillColor = "rgba(121,55,126,0.21)";
  public sections: [number, number] | undefined;
  constructor(public energy: string, lineColors: ColorLine[], public isDisabled: boolean) {
    for (const color of lineColors) this.lines.push(new ColorLine(color));
  }
  getLineY(lineIndex: number) {
    return ((this.endY! - this.startY!) * lineIndex) / this.lines.length + this.startY!;
  }
  drawSections(paper: any) {
    const lg = this.sections![0];
    const sm = this.sections![1];
    const total = sm * lg;
    for (let i = 0; i <= total; i++) {
      const rem = i % sm;
      const leftPin = rem === 0;
      const x = ((this.endX! - this.startX!) * i) / total + this.startX!;
      new paper.Path.Line({
        from: [x, this.startY! - (leftPin ? 8 : 4)],
        to: [x, this.endY],
        strokeColor: leftPin ? "rgba(24,0,24,0.93)" : "rgba(161,148,161,0.93)",
      });

      if (leftPin)
        new paper.PointText({
          point: [x - 6, this.startY! - 10],
          // content: 'The contents of the point text',
          content: i / sm,
          fillColor: "black",
          fontFamily: "Courier New",
          fontWeight: "bold",
          fontSize: 18,
        });

      if (i < total) {
        if (Math.floor(i / sm))
          new paper.PointText({
            point: [x + 3, this.endY! + 17],
            content: Math.floor(i / sm),
            fillColor: "#737373",
            fontFamily: "Courier New",
            fontSize: 12,
          });
        new paper.PointText({
          point: [x + 9, this.endY! + 9],
          content: rem + 1,
          fillColor: "black",
          fontFamily: "Courier New",
          fontSize: 10,
          fontWeight: "bold",
        });
        new paper.PointText({
          point: [x + 12, this.endY! + 16],
          content: "/",
          fillColor: "#737373",
          fontFamily: "Courier New",
          fontSize: 10,
        });
        new paper.PointText({
          point: [x + 16, this.endY! + 20],
          content: 7,
          fillColor: "#737373",
          fontFamily: "Courier New",
          fontSize: 10,
        });
      }
    }
  }

  getColorByValue(value: any) {
    return this.lines[value]!.color.color;
  }
  draw(paper: any, pointer: any, helperLine: any) {
    this.drawSections(paper);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const en = this;
    for (const lineIndex in this.lines) {
      const from = new paper.Point(this.startX, this.getLineY(+lineIndex));
      const to = new paper.Point(this.endX, this.getLineY(+lineIndex + 1));
      const line = this.lines[lineIndex];
      const l = new paper.Path.Rectangle({
        from,
        to,
        onMouseDown: function (event: any) {
          helperLine.start(event.point.x, en.getLineY(+lineIndex + 0.5), line!.color.color);
        },
      });
      l.fillColor = this.fillColor;
      l.strokeColor = "rgba(241,234,234,0.2)";
      l.onMouseEnter = function (event: any) {
        paper.view.context.canvas.style!.cursor = "crosshair";
        pointer.show();
      };
      l.onMouseLeave = this.isDisabled
        ? undefined
        : function (event: any) {
            // paper.view.context.canvas.style!.cursor = "pointer"
            paper.view.context.canvas.style!.cursor = "default";
            pointer.hide();
          };
      l.onMouseMove = this.isDisabled
        ? undefined
        : function (event: any) {
            pointer.move(event.point.x, en.getLineY(+lineIndex + 0.5), line!.color.color);
          };

      l.onMouseDrag = this.isDisabled
        ? undefined
        : function (event: any) {
            let x = event.point.x;
            if (x < en.startX!) x = en.startX;
            if (x > en.endX!) x = en.endX;
            helperLine.move(x);
          };
      l.onMouseUp = this.isDisabled
        ? undefined
        : function (event: any) {
            helperLine.stop();
          };
    }
  }
}
const ConstitutionComponent = ({
  width = 800,
  height = 400,
  horizontalWidthRatio = 0.9,
  drawingData = [],
  orderAfterPayId = "0",
  id = "",
  setPollution,
}: {
  width?: number;
  height?: number;
  horizontalWidthRatio?: number;
  drawingData?: any[];
  orderAfterPayId?: string | undefined;
  id: string | string[] | undefined;
  setPollution: Dispatch<any>;
}) => {
  const { data: userData } = useSession();
  //   const { client }=useContext(ClientContext:any);
  //   const personId=+(client?.id??1);
  //   const [drawingData]=useQuery(personDrawingData,{personId})
  //   // console.log({drawingData});
  //
  const canvas = useRef(null);
  const [stateData, setStateData] = useState(drawingData);
  //   const [setDrawingData]=useMutation(personDrawingDataSet);
  const [dataText, setDataText] = useState("");

  const setDrawingData = ({ orderAfterPayId, data, callback /*dataBlocks*/ }: any) => {
    // axios.post("/leads")
    if (userData?.user?.userRole === "Admin") {
      axios
        .post("/api/pollution", {
          orderAfterPayId,
          data,
          // dataBlocks
        })
        .then(({ data }) => {
          setStateData(data.data.pollutions);
          callback(data.data.pollutions);
        });
    }
  };

  useEffect(() => {
    const ui = new EnergyInterface(
      [
        new EnergyLine(
          "pitta",
          [
            new ColorLine("rgba(236,27,27,0.9)"),
            new ColorLine("rgba(236,27,27,0.6)"),
            new ColorLine("rgba(236,27,27,0.3)"),
          ],
          userData?.user?.userRole !== "Admin"
        ),
        new EnergyLine(
          "vata",
          [
            new ColorLine("rgba(27,76,236,0.9)"),
            new ColorLine("rgba(27,76,236,0.6)"),
            new ColorLine("rgba(27,76,236,0.3)"),
          ],
          userData?.user?.userRole !== "Admin"
        ),
        new EnergyLine(
          "kapha",
          [
            new ColorLine("rgba(126,105,78,0.9)"),
            new ColorLine("rgba(126,105,78,0.6)"),
            new ColorLine("rgba(126,105,78,0.3)"),
          ],
          userData?.user?.userRole !== "Admin"
        ),
      ],
      {
        width,
        height,
        horizontalWidthRatio,
      }
    );
    //

    ui.init(canvas.current!, stateData ?? []);
    ui.onChange = (data) => {
      setDataText(ui.textData()); //update data text

      setDrawingData({
        orderAfterPayId,
        data,
        callback: (data: KaphaData[]) => ui.setNewData(data),
        // dataBlocks: ui.dataBlocks()
      });
    };

    ui.draw();
    ui.optimise();
    ui.drawValueLines();
  }, [height, horizontalWidthRatio, width, userData]);

  return (
    <div style={{ minWidth: width }}>
      <canvas ref={canvas} width={width} height={height} />

      <Explain text={dataText} />

      {/*<div>*/}
      {/*  /!*<JS data={data}/>*!/*/}

      {/*</div>*/}
    </div>
  );
};

const Explain = ({ text }: any) => {
  return (
    <div className={"m-10 flex justify-center"}>
      <div
        tabIndex={0}
        className="collapse-plus border-base-300 bg-base-100 rounded-box collapse w-fit border"
      >
        <div className="collapse-title text-xl font-medium">Расшифровка</div>
        <div className="collapse-content">
          <pre>{text}</pre>
        </div>
      </div>
    </div>
  );
};

export const DiagnosePollutionDrawer = () => {
  const { query } = useRouter();

  const [pollution, setPollution] = useState<any>();
  useEffect(() => {
    axios.get(`/api/pollution/${query.id}`).then(({ data }) => {
      setPollution(data);
    });
  }, []);

  if (!pollution) return <Loading />;
  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      <ConstitutionComponent
        drawingData={pollution.data}
        orderAfterPayId={query.id?.toString()}
        id={query.id}
        setPollution={setPollution}
      />
    </div>
  );
};
// export default PollutionDrawer;
// export default ConstitutionComponent;
// export default ConstitutionComponent;
