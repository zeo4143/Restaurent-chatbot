import { data } from "../rawData/data";
import { response } from "./Response";

let flag = false;

export const usersResponse = (input) => {

  let elemRemovArray = input;
  let botResponse = {type: "response", content: "As an Learning AI Chatbot i can't understand Every Request So kindly type in capitalize format / Follow my lead", buttons: ["Follow my lead"]};
  let CartItem = [];

  

  //Extracting Name
  const nameExtract = (array) =>
    array.map((element) => {
      const extract = data.map((item) => item.name);
      extract.map((name) => {
        if (element === name.toLowerCase()) {
          array = array.filter((item) => item !== name);
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
    array.map((element) => {
      const extract = data.map((item) => item.category);
      extract.map((category) => {
        console.log(category);
        if (element === category.toLowerCase()) {
          array = array.filter((item) => item !== category);
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
  elemRemovArray.map((element) => {
    if (
      element === "order"
    ) {
      elemRemovArray = elemRemovArray.filter(
        (item) => item != element
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

