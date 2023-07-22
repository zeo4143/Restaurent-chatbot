import { data } from "../rawData/data";
import { response } from "./Response";

let flag = false;

export const usersResponse = (input) => {

  let elemRemovArray = input;
  let botResponse = {type: "response", content: "As an Learning AI Chatbot i can't understand Every Request So kindly type in capitalize format / Follow my lead", buttons: ["Follow my lead"]};
  let CartItem = [];

  

  //Extracting Name
  const nameExtract = (array) =>
    array.forEach((element) => {
      const extract = data.map((item) => item.name);
      extract.forEach((name) => {
        if (element.toLowerCase() == name.toLowerCase()) {
          array = array.filter((item) => item.toLowerCase() != name);
          console.log(array);
          const result = response(element)
          botResponse = result.botResponse
          CartItem = result.CartItem
          flag = true;
          return;
        }
        if (flag) {
          return;
        }
      });
    });

  //Extracting Category
  const categoryExtract = (array) =>
    array.forEach((element) => {
      const extract = data.map((item) => item.category);
      extract.forEach((category) => {
        if (element.toLowerCase() == category.toLowerCase()) {
          array = array.filter((item) => item.toLowerCase() != category);
          console.log(array);
          const result = response(element)
          botResponse = result.botResponse
          console.log(botResponse);
          flag = true;
          return;
        }

        if (flag) {
          return;
        }
      });
    });

  console.log(elemRemovArray);
  elemRemovArray.forEach((element) => {
    if (
      element.toLowerCase() === "order food" ||
      element.toLowerCase() === "order"
    ) {
      elemRemovArray = elemRemovArray.filter(
        (item) => item.toLowerCase() != element
      );
      categoryExtract(elemRemovArray);
      nameExtract(elemRemovArray);  
    }
    return;
  });

  return {
    botResponse: botResponse,
    CartItem: CartItem,
  };
};

