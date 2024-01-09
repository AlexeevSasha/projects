import { formatDate } from "../../../../assets/constants/date";
import { votingRU } from "./votingRU";

export const votingEN: typeof votingRU = {
  monthModalHeader: "Winline Player of the Month!",
  matchModalHeader: "Winline Player of the Match!",
  seasonModalHeader: "Winline Player of the Season!",
  seasonText1: (date: string) =>
    `Выберите лучшего игрока сезона и лично вручите награду победителю! Вы решаете, какой футболист внёс наибольший вклад в успех команды за прошедший сезон. Голосование завершится ${formatDate(
      date,
      "dd MMMM",
      "en"
    )} в  ${formatDate(date, "HH:mm", "en")}.`,
  seasonText2:
    "Каждый, кто выполнит все условия голосования, может получить шанс лично вручить награду лучшему игроку сезона. Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать!",
  monthText1: (date) =>
    `Выберите лучшего игрока месяца и лично вручите награду победителю! Вы решаете, какой футболист внёс наибольший вклад в успех команды за прошедший месяц. Голосование завершится ${formatDate(
      date,
      "dd MMMM",
      "en"
    )} в ${formatDate(date, "HH:mm", "en")}.`,
  monthText2:
    "Каждый, кто выполнит все условия голосования, может получить шанс лично вручить награду лучшему игроку месяца. Фото, автограф и личное общение с любимым игроком – воспоминания на всю жизнь и шанс, который нельзя упускать!",
  matchText1:
    "Choose the best player of the match from the list of red and white nominees: to do this, register in your personal account and vote for your favorite. Who do you think was the best in the last game? ! Decide now!",
  matchText2:
    "An even more important vote is held for the title of the best player of the month: about once every 30 days, the red and white family chooses the most valuable player. According to the voting results, one of the fans, randomly selected among those who fulfilled all the conditions on the Winline website, will personally present the MVP of the month award and chat with their idol right at the Otkritie Bank Arena.",
  timerTitle: "Until the end of voting",
  timerDesignations: {
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
  },
  votingEnded: "Голосование окончено",
  month: {
    presentTheAward: {
      title: "Personally present the award to the player",
      list: [
        "Decide who contributed the most to the team's success over the past month",
        "Fulfill all voting conditions and get a chance to PERSONALLY present the award to the best player of the month",
        "A photo, autograph and personal interaction with your favorite player - memories to last a lifetime and a chance not to be missed",
      ],
    },
    conditions: [
      "Login to your account and vote for player of the month",
      'Register on the website or in the <a href="">winline</a>',
      'Place <a href="">any bet</a> on the next Spartak match',
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
      "Login to your account and vote for player of the season",
      'Register on the website or in the <a href="">winline</a>',
      'Place <a href="">any bet</a> on the next Spartak match',
    ],
  },
  conditionsTitle: "Conditions",
  voteToPlayer: 'Vote <span class="button_text">for the player</span>',
  playersBlockTitle: "Select a player",
  activeChoose: "Your choose",
  textAfterVoting:
    "Your vote counts. Complete the remaining 2 conditions and get a chance to present an award to the best player in person!",
  newsTitle: "How was it",
  matchFooterHeader: "About the action",
  matchFooterText1:
    "Choose the best player of the match from the list of red and white nominees: to do this, register in your personal cabinet and vote for your favorite. Who in your opinion was the best in the last game? ! Decide now!",
  matchFooterText2:
    "Even more important is the voting for the title of the best player of the month: approximately every 30 days the Red and White family chooses the most valuable player. According to the voting results, one of the fans, chosen randomly among those who fulfilled all the conditions on the <a href='https://winline.ru' rel='nofollow' target='__blank'>Winline</a> website, will personally present the MVP of the month award and communicate with his idol directly at «Otkritie Bank Arena»",
  vote: "vote",
  rulesTitle: "Promotion Rules",
  edition: "Edition as amended on March 23, 2021",
  rules: {
    1: {
      title: "General Provisions",
      items: {
        1: {
          text: "The action «The best player. Without options» (hereinafter referred to as the Action) is carried out as part of the marketing policy of the Company, aimed at increasing awareness, increasing the level of awareness of the target audience and increasing loyalty to the WINLINE brand (trademark) (a means of individualizing the organizer of gambling in betting shop).",
        },
        2: {
          text: "The promotion is held on the website and in the winline mobile application (hereinafter referred to as the Website).",
        },
        3: {
          text: "The organization and conduct of the Promotion are regulated by the legislation of the Russian Federation, as well as these rules and conditions for participation in the Promotion (in the text - the Rules) and the Order of the General Director of the Company, putting them into effect.",
        },
        4: {
          text: "The Promotion is for marketing purposes only, is not a lottery, is not based on risk and does not require participation fees. Participation in the Promotion is voluntary.",
        },
      },
    },

    2: {
      title: "Information about the organizer of the Promotion",
      items: {
        1: {
          text: "The Organizer of the Promotion is the Limited Liability Company «Managing Company of the National Horse Breeding Union» (hereinafter referred to as the Organizer, bookmaker's office WINLINE), which has the following details: address: 123112, Moscow, Presnenskaya embankment, 8, building 1, floor 11; TIN 7714707736, OGRN 1077758954635, trademarks: «WINLINE», «PAY WITH NO OPTIONS».",
        },
        2: {
          text: "The source of information about the Organizer, the rules of the Promotion, the number of prizes based on the results of the Promotion, the timing, place and procedure for obtaining them is the website (hereinafter referred to as the Website).",
        },
      },
    },

    3: {
      title: "3. Terms of the Promotion",
      items: {
        1: {
          text: "The promotion is held from March 02, 2019 to June 30, 2022 inclusive, including the period for determining the winners and issuing prizes.",
        },
      },
    },

    4: {
      title: "4. Terms of Participation in the Promotion",
      items: {
        1: {
          text: "Any client of the Organizer who simultaneously meets the following conditions (hereinafter referred to as the Participant) can become a Participant of the Promotion: ",
          list: {
            1: "the client registered on the Site earlier or during the Promotion period;",
            2: "client authenticated;",
            3: "the client made at least one interactive bet on the Site during the period of the Promotion;",
            4: "the client confirmed his consent to participate in the Promotion by clicking the «vote» button on the Site.",
          },
          2: {
            text: "By participating in the Promotion, the Participant expresses his consent to these Rules, the Policy regarding the processing of personal data, the Rules for accepting bets and paying out winnings, the Rules of gambling.",
          },
        },
      },
    },

    5: {
      title: "List of Promotion Prizes",
      items: {
        1: {
          text: "List of prizes (hereinafter referred to as the Prize): The right to personally present the award to the best football player of FC «Spartak» (according to the results of the month).",
        },
        2: {
          text: "Payment of the cash equivalent of the value of the Prize, or its replacement with another prize, is not made. The Organizer does not return or exchange the Prize.",
        },
        3: {
          text: "The list of prizes can be changed unilaterally at the discretion of the Organizer.",
        },
      },
    },

    6: {
      title: "Determining the winners",
      items: {
        1: {
          text: "The winners of the Promotion (hereinafter referred to as the Winners) are the Participants who voted during the Promotion period for the football player of FC Spartak, who received the most votes for the first part of the season, for the season, for the match, for the month and who made at least one interactive bet on the Site during the period of the Promotion. Winners are determined by the Organizer randomly.",
        },
        2: {
          text: "The period for determining the Winners: from March 02, 2019 to June 30, 2022.",
        },
      },
    },

    7: {
      title: "Prize Rules",
      items: {
        1: {
          text: "Winners will receive Prizes in the following order:",
          items: {
            1: {
              text: "1st place - the right to personally present the award to the best football player of FC Spartak.",
            },
          },
        },
        2: {
          text: "The Organizer does not reimburse (does not compensate) the Winners for expenses (costs) incurred by the Winners to receive the Prize or in connection with its receipt (travel, accommodation, etc.).",
        },
      },
    },

    8: {
      title: "Rights and Obligations of the Participants and the Promotion Organizer",
      items: {
        1: {
          text: "Participant is entitled to:",
          list: {
            1: "take part in the Promotion in accordance with these Rules;",
            2: "to receive information about the terms and conditions of the Promotion;",
            3: "to receive the Prize if the Participant is recognized as the Winner (provided that the Participant meets all the requirements specified in these Rules);",
            4: "refuse to participate in the Promotion.",
          },
        },
        2: {
          text: "Member must:",
          list: {
            1: "comply with all the conditions of these Rules",
          },
        },
        3: {
          text: "The organizer has the right:",
          list: {
            1: "require the Participant to comply with these Rules;",
            2: "refuse any person to participate in the Promotion in case of violation of the Rules;",
            3: "make changes to the Rules during the Promotion (all changes come into force from the moment they are published on the Website);",
            4: "refuse to issue the Prize to the Winner in case of establishing the fact of non-compliance with the Rules;",
            5: "give Prizes to the Winners;",
            6: "expand or change the list of Prizes.",
          },
        },
        4: {
          text: "The organizer is not responsible:",
          list: {
            1: "for postponements and failures in the Promotion;",
            2: "for non-performance (untimely performance) by the Participants of their obligations under these Rules;",
            3: "for not familiarizing the Participants with the Promotion Rules;",
            4: "for failures in work and other technical problems of communication operators (telephone and Internet), directly serving the Participants and the Organizer;",
            5: "for receiving from the Participants incomplete and/or incorrect contact and/or other information necessary for the purpose of the Promotion;",
            6: "for non-receipt of letters, calls, facsimile and/or electronic messages from the Participants, including through the fault of the postal service, communication organizations, as a result of technical problems and/or fraud on the Internet and/or communication channels used during the Promotion ;",
            7: "for non-fulfillment or improper fulfillment of their obligations to the Participants of the Promotion due to failures in telecommunications and energy networks, actions of malicious programs, as well as dishonest actions of any third parties.",
          },
        },
      },
    },

    9: {
      title: "Special Conditions",
      items: {
        1: {
          text: "The Participant, if recognized as the Winner of the Promotion, agrees to participate in advertising interviews about participation in the Promotion, including for radio and television, as well as for other media, as well as for the Organizer and/or third parties to by persons on the instructions of the Organizer of the photo and video shooting of the Participant (the Winner), as well as the use of the created photo and video recordings with the Winner without obtaining additional consent for such use and without paying any remuneration for such use, including in the media, in particular, for advertising purposes, with the right to transfer the right to use the specified photo and video recordings with the participant to third parties.",
        },
        2: {
          text: "The fact of participation in the Promotion means the full consent of the Participant with these Rules.",
        },
        3: {
          text: "For all questions regarding the Promotion, Participants can contact the contacts listed in the «Contacts» section on the Site.",
        },
      },
    },
  },
  useWinlineError: "You must be at least 18",
  accessRestricted: "Access is restricted",
  useWinlineDesc: "You must accept consent and verify you are 18 years of age or older to continue.",
};
