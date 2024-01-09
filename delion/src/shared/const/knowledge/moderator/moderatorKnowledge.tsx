import { Divider } from '@shared/ui';
import { Knowledge } from '@shared/ui/Knowledge/Knowledge';
import type { IKnowledgeData } from '../index';

export const moderatorKnowledge: IKnowledgeData[] = [
  {
    id: 1,
    title: 'Дата рождения',
    description: (
      <Knowledge>
        <Knowledge.Title>Дата рождения</Knowledge.Title>
        <Knowledge.Text>
          Сверьте дату рождения участника по удостоверяющему документу (паспорт или свидетельство о
          рождении)
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 2,
    title: 'Номер свидетельства о рождении или номер паспорта',
    description: (
      <Knowledge>
        <Knowledge.Title>Номер свидетельства о рождении или номер паспорта</Knowledge.Title>
        <Knowledge.Text>
          Сверьте данные (фио, серия и номер) свидетельства о рождении или паспорта с прикрепленным
          удостоверяющим документом
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 3,
    title: 'Номер СНИЛС',
    description: (
      <Knowledge>
        <Knowledge.Title>Номер СНИЛС</Knowledge.Title>
        <Knowledge.Text>
          Сверьте данные (фио и номер) СНИЛС с прикрепленным документом СНИЛС.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 4,
    title: 'Письменное согласие на обработку данных',
    description: (
      <Knowledge>
        <Knowledge.Title>Письменное согласие на обработку данных</Knowledge.Title>
        <Knowledge.Text>Проверьте письменное согласие на обработку данных:</Knowledge.Text>
        <Divider />
        <Knowledge.List
          list={[
            'документ заполнен в полном объеме.',
            'подписи поставлены в нужном месте.',
            'данные участника в согласии совпадают с данными в анкете.',
          ]}
        />
      </Knowledge>
    ),
  },
  {
    id: 5,
    title: 'Документы, подтверждающие категорию',
    description: (
      <Knowledge>
        <Knowledge.Title>Документы, подтверждающие категорию</Knowledge.Title>
        <Knowledge.Text>
          Проверьте соответствие вида документа с выбранной категорией участника, ее данные и срок
          действия.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 6,
    title: 'Доброе дело',
    description: (
      <Knowledge>
        <Knowledge.Title>Доброе дело</Knowledge.Title>
        <Knowledge.Text>Проверьте, совершил ли мечтатель доброе дело.</Knowledge.Text>
        <Divider />
        <Knowledge.Text>
          В случае, если категория, описание и ссылка на доброе дело полностью соответсвует условиям
          - выберите зеленый цвет.
        </Knowledge.Text>
        <Knowledge.Text>Если частично соответсвует - желтый.</Knowledge.Text>
        <Knowledge.Text>Если не соответсвует - красный.</Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 7,
    title: 'Желание мечтателя',
    description: (
      <Knowledge>
        <Knowledge.Title>Желание мечтателя</Knowledge.Title>
        <Knowledge.Text>
          Сверьте загаданное желание с информацией о том, почему участник мечтает о нем.
        </Knowledge.Text>
        <Divider />
        <Knowledge.Text>
          В случае, если желание полностью соответствует информации о мечтателе - выберите зеленый
          цвет.
        </Knowledge.Text>
        <Knowledge.Text>Если частично соответсвует - желтый.</Knowledge.Text>
        <Knowledge.Text>Если не соответсвует - красный.</Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 8,
    title: 'Материальный подарок',
    description: (
      <Knowledge>
        <Knowledge.Title>Материальный подарок</Knowledge.Title>
        <Knowledge.Text>
          Убедитесь, что указан один конкретный подарок, ссылка соответствует выбранной
          подкатегории, цена подарка не превышает возможную стоимость.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 9,
    title: 'Ссылка на материальный подарок',
    description: (
      <Knowledge>
        <Knowledge.Title>Ссылка на материальный подарок</Knowledge.Title>
        <Knowledge.Text>
          Проверьте ссылку на подарок.Ссылки должны вести на официальные интернет-магазины РФ
        </Knowledge.Text>
        <Divider />
        <Knowledge.Text>
          Недопустимы ссылки на алиэкспресс, шейн или ссылки на интернет-магазины в соц. сетях.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 10,
    title: 'Наименование материального подарка',
    description: (
      <Knowledge>
        <Knowledge.Title>Наименование материального подарка</Knowledge.Title>
        <Knowledge.Text>
          Описание желания всегда начинается со слов{' '}
          <Knowledge.Text color={'blue'} isInline>
            «Мечтает о/об …»
          </Knowledge.Text>
          . Впишите желание в поле.
        </Knowledge.Text>
        <Knowledge.Text>Обращаем ваше внимание на правила русского языка:</Knowledge.Text>
        <Divider />
        <Knowledge.Example
          title={'Если следующее слово начинается на согласный звук, то предлог О.'}
        >
          Мечтает о машинке, мечтает о книге
        </Knowledge.Example>
        <Knowledge.Example
          title={'Если следующее слово начинается на гласный звук, то предлог ОБ.'}
        >
          Мечтает об игрушке, мечтает об электрогитаре
        </Knowledge.Example>
        <Knowledge.Example title={'Исключение составляют те слова, которые начинаются на Е, Ю, Я'}>
          Мечтает о елке
        </Knowledge.Example>
        <Knowledge.Text>
          <Knowledge.Text color={'blue'}>Внимание:</Knowledge.Text>
          Точку в конце предложения не ставить
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 11,
    title: 'Стоимость материального подарка',
    description: (
      <Knowledge>
        <Knowledge.Title>Укажите стоимость подарка.</Knowledge.Title>
        <Knowledge.Text>Для материальных категорий:</Knowledge.Text>
        <Divider />
        <Knowledge.List
          list={[
            'из двух разных ссылок выбирается большая цена подарка.',
            'цена, указанная в ссылке на желание, округляется до числа кратного 500 в большую сторону.',
            'точки в цене не ставятся.',
          ]}
        />
      </Knowledge>
    ),
  },
  {
    id: 12,
    title: 'Тематика и категории нематериального желания',
    description: (
      <Knowledge>
        <Knowledge.Title>Тематика и категории нематериального желания</Knowledge.Title>
        <Knowledge.Text>
          Убедитесь, что указано одно конкретное желание и соответствует выбранной категории.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 13,
    title: 'Описание нематериального желания',
    description: (
      <Knowledge>
        <Knowledge.Title>Описание нематериального желания</Knowledge.Title>
        <Knowledge.Text>
          Описание желания всегда начинается со слов{' '}
          <Knowledge.Text color={'blue'} isInline>
            «Мечтает ...»
          </Knowledge.Text>
          . Впишите желание в поле.
        </Knowledge.Text>
        <Knowledge.Text>Обращаем ваше внимание на правила русского языка:</Knowledge.Text>
        <Divider />
        <Knowledge.Example>
          Мечтает побывать в роли пилота
          <br />
          Мечтает о кулинарном мастер-классе
          <br />
          Мечтает посетить Москву
          <br />
          Мечтает о встрече с писателем
          <br />
          Мечтает покорить вершину горы
        </Knowledge.Example>
        <Knowledge.Text>
          <Knowledge.Text color={'blue'}>Внимание:</Knowledge.Text>
          Точку в конце предложения не ставить
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 14,
    title: 'Стоимость нематериального желания',
    description: (
      <Knowledge>
        <Knowledge.Title>Укажите стоимость желания.</Knowledge.Title>
        <Knowledge.Text>Для нематериальных категорий желаний:</Knowledge.Text>
        <Divider />
        <Knowledge.Text>
          - если желание предполагает онлайн-участие (онлайн-курсы, мастер-классы и т.д.), цена
          округляется до числа кратного 500 в большую сторону.
        </Knowledge.Text>
        <Knowledge.Example
          title={
            '- если желание предполагает офлайн-участие в пределах региона, в котором проживает участник, цена округляется до числа кратного 500 в большую сторону и умножается на два, к полученной цене прибавляется 10.000 рублей.'
          }
        >
          Мечтатель из Казани и мечта связана с посещением Аквапарка в Казани. Стоимость входа в
          аквапарк по ссылке 5.000 рублей.
        </Knowledge.Example>
        <Knowledge.Text>
          - прикреплена ссылка на определенную услугу за пределами региона, в котором проживает
          участник, цена округляется до числа кратного 500 в большую сторону и умножается на два, к
          полученной цене прибавляется 40.000 рублей.
        </Knowledge.Text>
        <Knowledge.Text>
          -если желание связано с поездкой куда-либо или целью, а ссылка не прикреплена - назначаем
          цену 80.000 рублей.
        </Knowledge.Text>
        <Knowledge.Text>
          - если желание связано с ролью или встречей, а ссылка не прикреплена - назначаем цену
          50.000 рублей.
        </Knowledge.Text>
      </Knowledge>
    ),
  },
  {
    id: 15,
    title: 'Наличие данных о родителе в системе ФЗО',
    description: (
      <Knowledge>
        <Knowledge.Text>Проверьте наличие данных о родителе в системе ФЗО</Knowledge.Text>
      </Knowledge>
    ),
  },
];
