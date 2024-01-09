import React, { useState } from "react";
import { GetLayout } from "../../src/components/layout/getLayout";
import { SizeTable } from "../../src/components/sizeTable/sizeTable";
import { CustomButton } from "../../src/components/buttons/customButton";
import {
  childClothesSize,
  childShooseSize,
  childSocksSize,
  guardsSize,
  menBotoomSize,
  menShoesSize,
  menTopSize,
  menTytesSize,
  socksSize,
  teenagerShoeseSize,
  womenBottomSize,
  womenShooseSize,
  womenTopSize,
} from "../../src/components/sizeTable/sizeTableData";
import styled from "styled-components";

export default function MockTable() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);
  const [visible11, setVisible11] = useState(false);
  const [visible12, setVisible12] = useState(false);
  const [visible13, setVisible13] = useState(false);

  return (
    <div>
      <Content>
        <CustomButton type={"red"} onClick={() => setVisible1(true)}>
          {menShoesSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible2(true)}>
          {menTopSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible3(true)}>
          {menBotoomSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible4(true)}>
          {menTytesSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible5(true)}>
          {womenShooseSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible6(true)}>
          {childClothesSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible7(true)}>
          {childSocksSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible8(true)}>
          {womenTopSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible9(true)}>
          {womenBottomSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible10(true)}>
          {socksSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible11(true)}>
          {guardsSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible12(true)}>
          {teenagerShoeseSize.title}
        </CustomButton>
        <CustomButton type={"red"} onClick={() => setVisible13(true)}>
          {childShooseSize.title}
        </CustomButton>
      </Content>
      <SizeTable
        title={menShoesSize.title}
        value={menShoesSize.value}
        visible={visible1}
        onClick={() => setVisible1(false)}
      />
      <SizeTable
        title={menTopSize.title}
        value={menTopSize.value}
        visible={visible2}
        onClick={() => setVisible2(false)}
        text={menTopSize.text}
        textTitle={menTopSize.textTitle}
        imgPath={"/images/clothesSize_v1.0.0.png"}
      />
      <SizeTable
        title={menBotoomSize.title}
        value={menBotoomSize.value}
        visible={visible3}
        onClick={() => setVisible3(false)}
      />
      <SizeTable
        title={menTytesSize.title}
        value={menTytesSize.value}
        visible={visible4}
        onClick={() => setVisible4(false)}
      />
      <SizeTable
        title={womenShooseSize.title}
        value={womenShooseSize.value}
        visible={visible5}
        onClick={() => setVisible5(false)}
      />
      <SizeTable
        title={childClothesSize.title}
        value={childClothesSize.value}
        visible={visible6}
        onClick={() => setVisible6(false)}
      />
      <SizeTable
        title={childSocksSize.title}
        value={childSocksSize.value}
        visible={visible7}
        onClick={() => setVisible7(false)}
      />
      <SizeTable
        title={womenTopSize.title}
        value={womenTopSize.value}
        visible={visible8}
        onClick={() => setVisible8(false)}
      />
      <SizeTable
        title={womenBottomSize.title}
        value={womenBottomSize.value}
        visible={visible9}
        onClick={() => setVisible9(false)}
      />
      <SizeTable
        title={socksSize.title}
        value={socksSize.value}
        visible={visible10}
        onClick={() => setVisible10(false)}
      />
      <SizeTable
        title={guardsSize.title}
        value={guardsSize.value}
        visible={visible11}
        onClick={() => setVisible11(false)}
      />
      <SizeTable
        title={teenagerShoeseSize.title}
        value={teenagerShoeseSize.value}
        visible={visible12}
        onClick={() => setVisible12(false)}
      />
      <SizeTable
        title={childShooseSize.title}
        value={childShooseSize.value}
        visible={visible13}
        onClick={() => setVisible13(false)}
      />
    </div>
  );
}

MockTable.getLayout = GetLayout;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 1vw;
  & > div {
    width: fit-content;
  }
`;
