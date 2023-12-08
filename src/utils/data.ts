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
  },
  {
    question: "Which of the folllowing Ethernet standards defines Gigabit "+
              "Ethernet over UTP cabling?",
    choices: [
      {
        text: "10GBASE-T",
        isCorrect: false
      },
      {
        text: "100GBASE-T",
        isCorrect: false
      },
      {
        text: "1000GBASE-T",
        isCorrect: true
      },
      {
        text: "None of the other answers is correct",
        isCorrect: false
      }
    ]
  },
  {
    question: "Which of the following is true about Ethernet crossover "+
              "cables for Fast Ethernet?",
    choices: [
      {
        text: "Pins 1 and 2 are reversed on the other end of the cable.",
        isCorrect: false
      },
      {
        text: "Pins 1 and 2 on one end of the cable connect to pins 3 and "+
              "6 on the other end of the cable.",
        isCorrect: true
      },
      {
        text: "Pins 1 and 2 on one end of the cable connect to pins 3 and "+
              "4 on the other end of the cable.",
        isCorrect: false
      },
      {
        text: "The cable can be up to 1000 meters long to cross over between "+
              "buildings.",
        isCorrect: false
      },
      {
        text: "None of the other answers is correct.",              
        isCorrect: false
      },
    ]
  },
  {
    question: "Each answer lists two types of devices used in a 100BASE-T "+
              "network. If these devices were connected with UTP Ethernet "+
              "cables, which pairs of devices would require a "+
              "straight-through cable? (Choose three answers.)",
    choices: [
      {
        text: "PC and router",
        isCorrect: false
      },
      {
        text: "PC and switch",
        isCorrect: true
      },
      {
        text: "Hub and switch",
        isCorrect: false
      },
      {
        text: "Router and hub",
        isCorrect: true
      },
      {
        text: "Wireless access point (Ethernet port) and switch",
        isCorrect: true
      },
    ]
  },
  {
    question: "Which of the following are advantages of using multimode "+
              "fiber for an Ethernet link instead of UTP of single-mode fiber.",
    choices: [
      {
        text: "To achieve the longest distance possible for that single link.",
        isCorrect: false
      },
      {
        text: "To extend the link beyond 100 meters while keeping initial costs as low as possible.",
        isCorrect: true
      },
      {
        text: "To make use of an existing stock of laser-based SFP/SFP+ modules.",
        isCorrect: false
      },
      {
        text: "To make use of an existing stock of LED-based SFP/SFP+ modules.",
        isCorrect: false
      }
    ]
  },
  {
    question: "Which of the following is true about the CSMA/CD algorithm?",
    choices: [
      {
        text: "The algorithm never allows collisions to occur.",
        isCorrect: false
      },
      {
        text: "Collisions can happen, but the algorithm defines how the "+
              "computers should notice a collision and how to recover.",
        isCorrect: true
      },
      {
        text: "The algorithm works with only two devices on the same Ethernet.",
        isCorrect: false
      },
      {
        text: "None of the other answers is correct.",
        isCorrect: false
      },
    ]
  },
  {
    question: "Which of the following is true about the Ethernet FCS field?",
    choices: [
      {
        text: "Ethernet uses FCS for error recovery.",
        isCorrect: false
      },
      {
        text: "It is 2 bytes long.",
        isCorrect: false
      },
      {
        text: "It ressides in the Ethernet trailer. not the Ethernet header.",
        isCorrect: true
      },
      {
        text: "It is used for encryption.",
        isCorrect: false
      },
    ]
  },
  {
    question: "Which of the following are true about the format of Ethernet "+
              "addresses? (Choose three answers)",
    choices: [
      {
        text: "Each manufacturer puts a unique OUI code into the first 2 bytes of the address.",
        isCorrect: false
      },
      {
        text: "Each manufacturer puts a unique OUI code into the first 3 bytes of the address.",
        isCorrect: true
      },
      {
        text: "Each manufacturer puts a unique OUI code into the first half of the address.",
        isCorrect: false
      },
      {
        text: "The part of the address that holds this manufacturer's code is called the MAC.",
        isCorrect: true
      },
      {
        text: "The part of the address that holds this manufacturer's code is called the OUI.",
        isCorrect: true
      },
      {
        text: "The part of the address that holds this manufacturer's code has no specific name.",
        isCorrect: false
      }
    ]
  },
  {
    question: "Which of the following terms describe Ethernet addresses that "+
              "can be used to send one frame that is delivered to multiple "+
              "devices on the LAN? (Choose two answers)",
    choices: [
      {
        text: "Burned-in address",
        isCorrect: false
      },
      {
        text: "Unicast address",
        isCorrect: false
      },
      {
        text: "Broadcast address",
        isCorrect: true
      },
      {
        text: "Multicast address",
        isCorrect: true
      },
    ]
  }
]


export default Questions