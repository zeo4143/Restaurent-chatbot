import { data } from "../rawData/data";
import { response } from "./Response";

let flag = false;

export const usersResponse = (input) => {
  let elemRemovArray = input;
  let botResponse = {
    type: "response",
    content:
      "As an Learning AI Chatbot I don't have direct access to do such operations so kindly lemme guide you with my responses",
    buttons: ["Follow my lead"],
  };

  //Extracting Name
  const nameExtract = (array) =>
    array.map((element) => {
      const extract = data.map((item) => item.name);
      extract.map((name) => {
        let nameLowerCase = name.toLowerCase();
        if (element === nameLowerCase) {
          array = array.filter((item) => item !== nameLowerCase);
          console.log(array);
          const result = response(name);
          botResponse = result;
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
        let categoryLowerCase = category.toLowerCase();
        if (element === categoryLowerCase) {
          array = array.filter((item) => item !== categoryLowerCase);
          console.log(array);
          const result = response(category);
          botResponse = result;
          flag = true;
          return;
        }

        if (flag) {
          return;
        }
      });
    });

  elemRemovArray.map((element) => {
    if (element === "update") {
      elemRemovArray = elemRemovArray.filter((item) => item != element);
      botResponse = response("Update Order");
    }

    if (element === "cancel") {
      elemRemovArray = elemRemovArray.filter((item) => item != element);
      botResponse = response("Cancel Order");
    }

    if (element === "order") {
      elemRemovArray = elemRemovArray.filter((item) => item != element);
      categoryExtract(elemRemovArray);
      nameExtract(elemRemovArray);
    }
    return;
  });

  return botResponse;
};
