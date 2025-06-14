import { formatDate } from "../../../../assets/constants/date";

export const votingRU = {
  monthModalHeader: "Winline игрок месяца!",
  matchModalHeader: "Winline игрок матча!",
  seasonModalHeader: "Winline игрок сезона!",
  seasonText1: (date: string) =>
    `Выберите лучшего игрока сезона и лично вручите награду победителю! Вы решаете, какой футболист внёс наибольший вклад в успех команды за прошедший сезон. Голосование завершится ${formatDate(
      date,
      "dd MMMM",
      "ru"
    )} в  ${formatDate(date, "HH:mm", "ru")}.`,
  seasonText2:
    "Каждый, кто выполнит все условия голосования, может получить шанс лично вручить награду лучшему игроку сезона. Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать!",
  monthText1: (date: string) =>
    `Выберите лучшего игрока месяца и лично вручите награду победителю! Вы решаете, какой футболист внёс наибольший вклад в успех команды за прошедший месяц. Голосование завершится ${formatDate(
      date,
      "dd MMMM",
      "ru"
    )} в  ${formatDate(date, "HH:mm", "ru")}.`,
  monthText2:
    "Каждый, кто выполнит все условия голосования, может получить шанс лично вручить награду лучшему игроку месяца. Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать!",
  matchText1:
    "Выберите лучшего игрока матча из списка красно-белых номинантов: для этого зарегистрируйтесь в личном кабинете и проголосуйте за своего фаворита. Кто на ваш взгляд был лучшим в прошедшей игре? ! Решайте сейчас!",
  matchText2:
    "Еще более важное голосование проходит за звание лучшего игрока месяца: примерно раз в 30 дней красно-белая семья выбирает самого ценного футболиста. По итогам голосования один из болельщиков, выбранный рандомно среди выполнивших все условия на сайте Winline, лично вручит награду MVP месяца и пообщается со своим кумиром прямо на «Открытие Банк Арене».",
  timerTitle: "До конца голосования",
  timerDesignations: {
    days: "дни",
    hours: "часы",
    minutes: "минуты",
    seconds: "секунды",
  },
  votingEnded: "Голосование окончено",
  month: {
    presentTheAward: {
      title: "Лично вручите награду футболисту",
      list: [
        "Решайте, кто внёс наибольший вклад в успех команды за прошедший месяц",
        "Выполните все условия голосования и получите шанс ЛИЧНО ВРУЧИТЬ НАГРАДУ лучшему игроку месяца",
        "Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать",
      ],
    },
    conditions: [
      "Войдите в свой аккаунт и проголосуйте за игрока месяца",
      'Зарегистрируйтесь  на сайте или в приложении <a href="https://winline.ru" rel="nofollow" target="__blank">winline</a>',
      'Сделайте <a href="https://winline.ru" rel="nofollow" target="__blank">любую ставку</a> на ближайший матч «Спартака»',
    ],
  },
  season: {
    presentTheAward: {
      title: "Лично вручите награду футболисту",
      list: [
        "Решайте, кто внёс наибольший вклад в успех команды за прошедший сезон",
        "Выполните все условия голосования и получите шанс ЛИЧНО ВРУЧИТЬ НАГРАДУ лучшему игроку сезона",
        "Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать",
      ],
    },
    conditions: [
      "Войдите в свой аккаунт и проголосуйте за игрока сезона",
      'Зарегистрируйтесь  на сайте или в приложении <a href="https://winline.ru" rel="nofollow" target="__blank">winline</a>',
      'Сделайте <a href="https://winline.ru" rel="nofollow" target="__blank">любую ставку</a> на сайте или в приложении <a href="https://winline.ru" rel="nofollow" target="__blank">Winline</a>',
    ],
  },
  conditionsTitle: "Условия",
  voteToPlayer: 'Проголосовать <span class="button_text">за игрока</span>',
  playersBlockTitle: "Выберите игрока",
  activeChoose: "Ваш выбор",
  textAfterVoting:
    "Ваш голос учтен. Выполните оставшиеся 2 условия и получите шанс вручить награду лучшему игроку лично!",
  newsTitle: "Как это было",
  matchFooterHeader: "Об акции",
  matchFooterText1:
    "Выберите лучшего игрока матча из списка красно-белых номинантов: для этого зарегистрируйтесь в личном кабинете и проголосуйте за своего фаворита. Кто на ваш взгляд был лучшим в прошедшей игре? ! Решайте сейчас!",
  matchFooterText2:
    "Еще более важное голосование проходит за звание лучшего игрока месяца: примерно раз в 30 дней красно-белая семья выбирает самого ценного футболиста. По итогам голосования один из болельщиков, выбранный рандомно среди выполнивших все условия на сайте <a href='https://winline.ru' rel='nofollow' target='__blank'>Winline</a>, лично вручит награду MVP месяца и пообщается со своим кумиром прямо на «Открытие Банк Арене».",
  vote: "проголосовать",
  rulesTitle: "Правила акции",
  edition: "Редакция с изменениями от 29 марта 2023 года",
  rules: {
    1: {
      title: "Общие положения",
      items: {
        1: {
          text: "Акция «Лучший игрок. Без вариантов» (далее – Акция) проводится в рамках маркетинговой политики Общества, направленной на повышение узнаваемости, увеличение уровня информированности целевой аудитории и рост лояльности к бренду (товарному знаку) WINLINE (средству индивидуализации организатора азартных игр в букмекерской конторе).",
        },
        2: {
          text: "Акция проводится на сайте и в мобильном приложении winline (далее – Сайт).",
        },
        3: {
          text: "Организация и проведение Акции регламентированы законодательством Российской Федерации, а также настоящими правилами и условиями участия в Акции (по тексту – Правила) и Приказом Генерального директора Общества, вводящим их в действие.",
        },
        4: {
          text: "Акция носит исключительно маркетинговый характер, не является лотереей, не основана на риске и не требует внесения платы за участие. Участие в Акции является добровольным.",
        },
      },
    },

    2: {
      title: "Сведения об организаторе Акции",
      items: {
        1: {
          text: "Организатором Акции является Общество с ограниченной ответственностью «Управляющая компания Национального коневодческого союза» (далее – Организатор, букмекерская контора WINLINE), имеющее следующие реквизиты: адрес: 123112, г. Москва, Пресненская набережная, д. 8, стр. 1, этаж 11; ИНН 7714707736, ОГРН 1077758954635, товарные знаки: «WINLINE», «ЗАПЛАТИТ. БЕЗ ВАРИАНТОВ».",
        },
        2: {
          text: "Источником информации об Организаторе, о правилах проведения Акции, количестве призов по результатам Акции, сроках, месте и порядке их получения является сайт (далее – Сайт).",
        },
      },
    },

    3: {
      title: "Сроки проведения Акции",
      items: {
        1: {
          text: "Акция проводится в течение сезона 2022/2023 в период с 1 июля 2022 года по 30 июня 2023 года включительно, включая период определения победителей и выдачи призов.",
        },
      },
    },

    4: {
      title: "Условия участия в Акции",
      items: {
        1: {
          text: "Участником Акции может стать любой клиент Организатора, соответствующий одновременно следующим условиям (далее – Участник): ",
          list: {
            1: "клиент зарегистрировался на Сайте ранее или в период проведения Акции;",
            2: "клиент прошел идентификацию;",
            3: "клиент совершил минимум одну интерактивную ставку на Сайте в период проведения Акции;",
            4: "клиент подтвердил свое согласие на участие в Акции, нажав кнопку «голосуй» на Сайте.",
          },
          2: {
            text: "Принимая участие в Акции Участник выражает свое согласие с настоящими Правилами, Политикой в отношении обработки персональных данных, Правилами приема ставок и выплаты выигрышей, Правилами азартных игр.",
          },
        },
      },
    },

    5: {
      title: "Перечень призов Акции",
      items: {
        1: {
          text: "Перечень призов (далее – Приз): «Право лично вручить награду лучшему футболисту ФК «Спартак» (по итогам месяца).",
        },
        2: {
          text: "Выплата денежного эквивалента стоимости Приза, либо его замена другим призом не производится. Возврат и обмен Приза Организатором не производится.",
        },
        3: {
          text: "Перечень призов может быть изменен в одностороннем порядке по усмотрению Организатора.",
        },
      },
    },

    6: {
      title: "Определение победителей",
      items: {
        1: {
          text: "Победителями Акции (далее – Победители) признаются Участники, проголосовавшие в период проведения Акции за футболиста ФК «Спартак», набравшего наибольшее количество голосов за первую часть сезона, за сезон, за матч, за месяц и совершившие минимум одну интерактивную ставку на Сайте в период проведения Акции. Победители определяются Организатором в случайном порядке.",
        },
        2: {
          text: "Период определения победителей соответствует периоду проведения голосования.",
        },
      },
    },

    7: {
      title: "Порядок вручения призов",
      items: {
        1: {
          text: "Победителям вручаются Призы в следующем порядке:",
          items: {
            1: {
              text: "1 место – право лично вручить награду лучшему футболисту ФК «Спартак».",
            },
          },
        },
        2: {
          text: "Организатор не возмещает (не компенсирует) Победителям расходы (затраты), понесенные Победителями для получения Приза или в связи с его получением (проезд, проживание и пр.).",
        },
      },
    },

    8: {
      title: "Права и обязанности Участников и Организатора Акции",
      items: {
        1: {
          text: "Участник имеет право:",
          list: {
            1: "принять участие в Акции в соответствии с настоящими Правилами;",
            2: "получать информацию о сроках и условиях проведения Акции;",
            3: "получить Приз в случае признания Участника Победителем (при условии, что Участник соответствует всем требованиям, указанным в настоящих Правилах);",
            4: "отказаться от участия в Акции.",
          },
        },
        2: {
          text: "Участник обязан:",
          list: {
            1: "соблюдать все условия настоящих Правил",
          },
        },
        3: {
          text: "Организатор имеет право:",
          list: {
            1: "требовать от Участника соблюдения настоящих Правил;",
            2: "отказать любому лицу в участии в Акции в случае нарушения Правил;",
            3: "вносить изменения в Правила в ходе проведения Акции (все изменения вступают в силу с момента их опубликования на Сайте);",
            4: "отказать Победителю в выдаче Приза в случае установления факта несоблюдения Правил;",
            5: "выдать Призы Победителям;",
            6: "расширить или изменить перечень Призов.",
          },
        },
        4: {
          text: "Организатор не несет ответственности:",
          list: {
            1: "за переносы сроков и сбои в проведении Акции;",
            2: "за неисполнение (несвоевременное исполнение) Участниками своих обязанностей, предусмотренных настоящими Правилами;",
            3: "за не ознакомление Участников с Правилами Акции;",
            4: "за сбои в работе и другие технические неполадки операторов связи (телефонной и интернет), непосредственно обслуживающих Участников и Организатора;",
            5: "за получение от Участников неполных и/или некорректных контактных и/или иных сведений, необходимых в целях проведения Акции;",
            6: "за неполучение от Участников писем, звонков, факсимильных и/или электронных сообщений, в том числе по вине почтовой службы, организаций связи, в результате технических проблем и/или мошенничества в сети Интернет и/или каналов связи, используемых при проведении Акции;",
            7: "за неисполнение либо ненадлежащее исполнение своих обязательств перед Участниками Акции вследствие сбоев в телекоммуникационных и энергетических сетях, действий вредоносных программ, а также недобросовестны х действий любых третьих лиц.",
          },
        },
      },
    },

    9: {
      title: "Особые условия",
      items: {
        1: {
          text: "Участник, в случае признания его Победителем Акции, дает свое согласие на участие в рекламных интервью об участии в Акции, в том числе для радио и телевидения, а равно для иных средств массовой информации, а также на осуществление Организатором и/или третьими лицами по заданию Организатора фото- и видеосъемки Участника (Победителя), а также на использование созданных фото- и видеозаписей с Победителем без получения дополнительного согласия на такое использование и без уплаты какого-либо вознаграждения за такое использование, в том числе в средствах массовой информации, в частности, в рекламных целях, с правом передачи права использования указанных фото- и видеозаписей с участником третьим лицам.",
        },
        2: {
          text: "Факт участия в Акции означает полное согласие Участника с настоящими Правилами.",
        },
        3: {
          text: "По всем вопросам, касающимся Акции, Участники могут обращаться по контактам, указанным в разделе «Контакты» на Сайте.",
        },
      },
    },
  },
  useWinlineError: "Вам должно быть не менее 18 лет",
  accessRestricted: "Доступ ограничен",
  useWinlineDesc: "Чтобы продолжить необходимо принять согласие и подтвердить возраст 18 или более лет.",
};
