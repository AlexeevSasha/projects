import styled from "astroturf/react";
import { TitleSeo } from "./TitleSeo";
import { ParagraphSeo } from "./ParagraphSeo";

export const SeoTextPolzaru = () => {
  return (
    <Container>
      <TitleSeo>
        Интернет-аптека Polzaru&nbsp;&mdash; заказ лекарств с&nbsp;доставкой в&nbsp;Москве
      </TitleSeo>
      <Content>
        <ParagraphSeo>
          Ключевая ценность нашей компании — это забота о вашем здоровье. Мы не продвигаем дорогие
          лекарства и всегда готовы объяснить преимущества и недостатки оригинальных препаратов и
          дженериков, а также разных товаров с одинаковым действующим веществом. Для нас важно
          правильно сориентировать вас в широком спектре современных фармпрепаратов и способов
          поддержания здоровья с учетом ваших запросов и возможностей.
        </ParagraphSeo>
        <ParagraphSeo>
          Культура профилактики заболеваний, возможно, пока что не так сильно развита в нашей
          стране. Однако мы прикладываем все усилия, чтобы в первую очередь концентрироваться на
          предупреждении болезней и пропагандируем этот подход как наиболее рациональный и здоровый
          метод сохранения телесного и психического благополучия.
        </ParagraphSeo>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 16px;
  padding: 28px 20px;

  @include respond-to(small) {
    padding: 8px;
  }
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 12px;

  @include respond-to(small) {
    grid-gap: 0;
  }
`;
