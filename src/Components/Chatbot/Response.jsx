import { categories, data } from "../rawData/data";

export const response = (input, state, setState) => {
  let botResponse = {};
  let CartItem = [];

  //Retreiving Category and Their catalog
  const category = data.filter((item) => item.category === input);
  const { categoryName } =
    categories.find((item) => item.categoryName === input) || "";

  //showing the specific item
  const specificItem = data.find((item) => item.name === input) || "";
  const specificItemExtract = specificItem.name || "";

  //AddONs
  const selfAddONS = [
    "Make it a meal",
    "Pepsi",
    "Coke",
    "Fries",
    "MayoDip",
    "TandooriDip",
    "CheesyDip",
    "Review My Order",
  ];
  const addingSelfAddONs = selfAddONS.find((item) => item === input)
    ? input
    : "";

  //adding Quantity
  const quantity = ["1", "2", "3", "4", "5"];
  const stringQuantity = quantity.find((item) => item === input) || "";
  const strQtyConv = parseInt(stringQuantity);
  console.log(strQtyConv);
  console.log(typeof(strQtyConv));

  //Meal Size
  const mealSize = [
    { size: "Small", price: 120 },
    { size: "Medium", price: 180 },
    { size: "Large", price: 240 },
  ];

  const { size } = mealSize.find((item) => item.size === input) || "";

  const length = () => {
    if (data.addONs.length < state[0].addONs.length) {
      return true;
    } else {
      return false;
    }
  };

  switch (input) {
    //Ordering Food

    case "Order Food":
      botResponse = {
        type: "response",
        content:
          "I'm pleased to hear that..! what kind of food you'd love to prefer",
        buttons: categories.map((item) => item.categoryName),
      };
      break;

    case categoryName:
      botResponse = {
        type: "response",
        content: `Great Choice These are some of best and top rated ${input} items in our Restaurent`,
        buttons: category.map((item) => item.name),
      };
      break;

    case specificItemExtract:
      setState([]);
      CartItem = {
        itemName: specificItem.name,
        itemPrice: specificItem.price,
        addONs: specificItem.addONs,
      };
      setState([
        {
          itemName: specificItem.name,
          itemPrice: specificItem.price,
          addONs: specificItem.addONs,
        },
      ]);
      botResponse = {
        type: "response",
        content: `Here's the detailed information about ${specificItem.name}`,
        buttons: selfAddONS,
      };
      break;

    case "Make it a meal":
      botResponse = {
        type: "response",
        content: "Select the Size of the Meal",
        buttons: mealSize.map((item) => item.size),
      };
      break;

    case size:
      console.log(typeof(state[0].itemPrice));
      if (size == "Small") {
        state[0].itemPrice = state[0].itemPrice + 130;
      }
      if (size == "Medium") {
        state[0].itemPrice = state[0].itemPrice + 180;
      }
      if (size == "Large") {
        state[0].itemPrice = state[0].itemPrice + 240;
      }

      botResponse = {
        type: "response",
        content: "Selct No.of Meals",
        buttons: quantity,
      };
      break;

    case addingSelfAddONs:
      state[0].addONs.push(addingSelfAddONs);

      botResponse = {
        type: "response",
        content: "Choose quantity",
        buttons: quantity,
      };
      break;

    case stringQuantity:
      length
        ? (state[0].itemPrice = state[0].itemPrice + (strQtyConv * 60))
        : (state[0].itemPrice = state[0].itemPrice * strQtyConv);
      console.log();
      botResponse = {
        type: "response",
        content: `${stringQuantity} item/meal Added to your Order`,
        buttons: ["Add More items to Cart", "Review my order"],
      };
      break;

    case "Some More AddONs":
      botResponse = {
        type: "response",
        content: "Include some more AddONs to make your meal Special..😋",
        buttons: selfAddONS,
      };
      break;

    case "Review my order":
      botResponse = {
        type: "response",
        content: "Order Summary",
        buttons: ["Confirm Order", "Add More items to Cart"],
      };
      break;

    case "Add More items to Cart":
      console.log(CartItem);
      botResponse = {
        type: "response",
        content:
          "I'm pleased to hear that..! what kind of food you'd love to prefer",
        buttons: categories.map((item) => item.categoryName),
      };
      break;

    //Order Cancelation
    case "cancel order":
      confirm("Are you Sure")
        ? (botResponse = {
            type: "response",
            content: "Your order has been Successfully cancelled ☹️",
            buttons: ["Upate Order", "Explore Kitchen", "No Thanks"],
          })
        : (botResponse = {
            type: "response",
            content:
              "Thanks for the Confirmation Wanna update your order..? or Explore Kitchen  by Yourself",
            buttons: ["Upate Order", "Explore Kitchen"],
          });
      break;
    case "update order":
      break;
    case "no thanks":
      botResponse = {
        type: "response",
        content: "Thanks you and visit again",
        buttons: [],
      };
      //close the bot
      break;
    
    case "Follow my lead":
      botResponse = {
        type: "response",
        content:
          "I'm glad to here that Here we go Whats on your mind..🍽️",
        buttons: ["Order Food", "Cancel Order", "Update Order"],
      }
      break
    default:
      botResponse = {
        type: "response",
        content:
          "As an Learning AI Chatbot i can't understand Every Request So kindly type in capitalize format / Follow my lead",
        buttons: ["Follow my lead"],
      };
      break;
  }

  return {
    botResponse: botResponse,
    CartItem: CartItem,
  };
};
