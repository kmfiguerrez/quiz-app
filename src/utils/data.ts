import { TQuestions } from "./definition";

const Questions: TQuestions = [
  {
    question: "In the LAN for a small office, some user devices connect to the "+
              "LAN using a cable, while others connect using wireless technology "+
              "(and no cable). Which of the following is true regarding the use of "+
              "Ethernet in this LAN?"  
              ,
    choices: [
      {
        prefixSymbol: "a",
        text: "Only the devices that use cables are using Ethernet",
        isCorrect: true
      },
      {
        prefixSymbol: "b",
        text: "Only the devices that use wireless are using Ethernet",
        isCorrect: false

      },
      {
        prefixSymbol: "c",
        text: "Both the devices using cables and those using wireless are using Ethernet.",
        isCorrect: false
      },
      {
        prefixSymbol: "d",
        text: "None of the devices are using Ethernet.",
        isCorrect: false
      },
    ],    
  }
]


export default Questions