import { CustomLink } from "../CustomLink";
import styled from "astroturf/react";

export const Links = () => {
  return (
    <LinksStyle>
      <ul>
        <li>
          <CustomLink target="_blank" href="/help/order/">
            Как сделать заказ
          </CustomLink>
        </li>
        <li>
          <CustomLink target="_blank" href="/help/faq">
            Вопросы и ответы
          </CustomLink>
        </li>
        <li>
          <CustomLink target="_blank" href="https://polza.ru/help/bonus/">
            Программа лояльности
          </CustomLink>
        </li>
        <li>
          <CustomLink target="_blank" href="/blog">
            Полезные статьи
          </CustomLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomLink target="_blank" href="/company">
            О компании
          </CustomLink>
        </li>
        <li>
          <CustomLink target="_blank" href="/profile/pharmacies">
            Аптеки для самовывоза
          </CustomLink>
        </li>
      </ul>
    </LinksStyle>
  );
};

const LinksStyle = styled.nav`
  @import "variables";

  display: flex;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  margin: 0 40px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 12px;
    }
  }

  @media (max-width: 1200px) {
    display: block;
    width: fit-content;
    margin: 0 20px;
  }

  @include respond-to(small) {
    margin: 0 0 24px 0;
    a {
      color: $blue1;
      font-size: 16px;
    }
  }
`;
