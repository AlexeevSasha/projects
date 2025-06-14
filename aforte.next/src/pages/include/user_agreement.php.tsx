import { Container } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import React from "react";
import styled from "astroturf/react";
import Link from "next/link";

export default function Agreement() {
  return (
    <Container>
      <Wrapper>
        <h1>Согласие на обработку персональных данных</h1>
        <p>
          Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от
          27.07.2006 года Вы подтверждаете свое согласие на обработку компанией ООО ФК «Пульс» (ОГРН
          1025006172267, ИНН 5047045359, адрес местонахождения юридического лица: 141402, РФ, МО, г.
          Химки, ул. Ленинградская, д. 29, эт. 2, каб. 98) персональных данных: сбор,
          систематизацию, накопление, хранение, уточнение (обновление, изменение), использование,
          блокирование, обезличивание, уничтожение, передачу (в том числе аптечным и курьерским
          организациям) исключительно в целях регистрации, бронирования товаров, организации
          обратной связи, улучшения качества сервиса, сбора статистики, информирования о ценах,
          акциях, персональных предложениях и прочей информации рекламного характера. Компания ООО
          ФК «Пульс» гарантирует конфиденциальность получаемой информации.
        </p>
        <p>
          ООО ФК «Пульс» принимает все необходимые технические, организационные и правовые меры для
          защиты персональных данных от неправомерного или случайного доступа, уничтожения,
          изменения, копирования, распространения и иных несанкционированных действий третьих лиц.
        </p>
        <p>
          ООО ФК «Пульс» принимает все необходимые технические, организационные и правовые меры для
          защиты персональных данных от неправомерного или случайного доступа, уничтожения,
          изменения, копирования, распространения и иных несанкционированных действий третьих лиц.
        </p>
        <p>
          Настоящее согласие распространяется на следующие Ваши персональные данные: фамилия, имя,
          отчество, дата и место рождения, адрес электронной почты, адрес доставки заказов,
          контактный телефон, платёжные реквизиты, социальное положение, имущественное положение,
          образование, профессия, доходы.
        </p>
        <p>
          К персональным данным, также относятся файлы куки, которые содержат информацию о действиях
          пользователя на сайте{" "}
          <Link target="_blank" href="https://polza.ru">
            https://polza.ru
          </Link>
          , сведения о его оборудовании и браузере, ip-адресе, а также дату и время сессии.
        </p>
        <p>
          ООО ФК «Пульс» обрабатывает только необходимые для: бронирования товара на сайте, оказания
          услуг, отправки сообщений (в том числе о статусе заказа, рекламных, информационных и
          рекомендационных), предоставления сервисной и клиентской поддержки персональные данные
          пользователей. Никакая дополнительная информация не собирается и не хранится.
        </p>
        <p>
          Предоставленные пользователями персональные данные могут быть использованы в следующих
          целях:
        </p>
        <Lists>
          <li>
            Идентификация зарегистрированного пользователя с целью оказания услуг по договору
            розничной купли-продажи товаров дистанционным способом;
          </li>
          <li>
            Обеспечение обратной связи пользователю, в том числе:
            <Lists style={{ paddingLeft: 20 }}>
              <li>
                В целях обеспечения технической и клиентской поддержки (ответы на отзывы, запросы и
                заявки пользователей);
              </li>
              <li>В целях информирования о статусе бронирования;</li>
            </Lists>
          </li>
          <li>Улучшение качества текущих функций и сервисов ООО ФК «Пульс» и внедрение новых;</li>
          <li>
            Предоставление информации о ценах, акциях, персональных предложениях и рекомендациях,
            новой продукции и сервисах, рекламных мероприятиях и в целях обработки результатов таких
            мероприятий;
          </li>
          <li>Проведение статистических исследований, основанных на обезличенных данных;</li>
          <li>
            Предоставление персональных данных пользователя курьерским службам доставки и аптечным
            организациям с целью доставки заказов;
          </li>
          <li>
            Определение местоположения пользователя с целью выявления близлежащих точек самовывоза
            для более качественного оказания услуг дистанционной продажи;
          </li>
        </Lists>
        <p>
          Срок действия согласия является неограниченным. Вы можете в любой момент отозвать
          настоящее согласие, направив письменное уведомления на адрес: 141402, РФ, МО, г. Химки,
          ул. Ленинградская, д. 29, эт. 2, каб. 98 с пометкой «Отзыв согласия на обработку
          персональных данных».
        </p>
        <p>
          Обращаем ваше внимание, что отзыв согласия на обработку персональных данных влечёт за
          собой удаление Вашей учётной записи с Интернет-сайта (
          <Link target="_blank" href={"http://polza.ru"}>
            http://polza.ru
          </Link>
          ), а также уничтожение записей, содержащих ваши персональные данные, в системах обработки
          персональных данных компании ООО ФК «Пульс», что может сделать невозможным пользование
          интернет-сервисами компании ООО ФК «Пульс».
        </p>
        <p>
          ООО ФК «Пульс» вправе вносить изменения и дополнения в настоящую Политику без согласия
          Пользователя. Новая редакция Политики вступает в силу с момента ее размещения на сайте
          <Link target="_blank" href={"http://polza.ru"}>
            {" "}
            http://polza.ru
          </Link>
          , если иное не предусмотрено в Политике.
        </p>
        <p>
          Гарантирую, что представленная мной информация является полной, точной и достоверной, а
          также что при представлении информации не нарушаются действующее законодательство
          Российской Федерации, законные права и интересы третьих лиц. Вся представленная информация
          заполнена мною в отношении себя лично.
        </p>
        <p>
          Настоящее согласие действует в течение всего периода хранения персональных данных, если
          иное не предусмотрено законодательством Российской Федерации.
        </p>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  @import "variables";

  color: rgb($black, 0.7);
  padding-bottom: 30px;

  h1 {
    color: $black;
    margin: 40px 0;
    font-size: 30px;
  }
  a {
    color: $blue1;
  }
  p {
    margin: 24px 0;
  }
`;

const Lists = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    margin: 12px 0 0 20px;
  }

  li:before {
    position: absolute;
    left: -20px;
    content: "\2014";
  }
`;

Agreement.getLayout = getLayout;
