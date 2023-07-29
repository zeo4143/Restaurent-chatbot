import { categories, data } from "../rawData/data";

export const response = (input, state, setState) => {
  let botResponse = {};

  //Retreiving Category and Their catalog
  const category = data.filter((item) => item.category === input);
  const { categoryName } =
    categories.find((item) => item.categoryName === input) || "";

  //showing the specific item
  const specificItem = data.find((item) => item.name === input) || "";
  const specificItemExtract = specificItem.name || "";

  //adding Quantity
  const quantity = [1, 2, 3, 4, 5];
  const stringQuantity = quantity.find((item) => item === parseInt(input)) || 0;
  const strQtyConv = `${stringQuantity}`;

  //Meal Size
  const mealSize = [
    { size: "Small", price: 120 },
    { size: "Medium", price: 180 },
    { size: "Large", price: 240 },
  ];
  const { size } = mealSize.find((item) => item.size === input) || "";

  // view Cart
  const cart = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = 0;
  cart.map((item) => {
    totalAmount += item.itemTotal;
    return totalAmount;
  });

  //fetching Order details from local storage
  const order = JSON.parse(localStorage.getItem("currentOrder"));
  let totalBill = 0;
  order.map((item) => {
    totalBill += item.itemTotal;
    return totalBill;
  });
  const removeItem = order.map((item) => `${item.itemQty} ${item.itemName}`);
  const removeSpecificItem = removeItem.find((remove) => remove == input);

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

    case "Go to Cart":
      console.log(cart);
      console.log(cart);
      botResponse = {
        type: "response",
        content:
          `${cart.map(
            (item, index) =>
              `Item No : ${index + 1}. ${item.itemName}(${item.itemPrice} X ${
                item.itemQty
              }) = ${item.itemTotal}/-`
          )}` || `Your Cart is Empty..☹️ Add Items to View Cart`,
        buttons:
          cart.length == 0
            ? ["Explore More"]
            : ["Add More Items", "Review my order"],
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
      setState({});
      setState({
        itemName: specificItem.name,
        itemPrice: specificItem.price,
        itemQty: 0,
        itemTotal: 0,
      });
      botResponse = {
        type: "response",
        content: `Here's the detailed information about ${specificItem.name} & the price - Rs.${specificItem.price}/-`,
        buttons:
          specificItem.category === "pizza" ||
          specificItem.category === "Burger"
            ? ["Make it a meal", "Add to Cart", "Explore More"]
            : ["Add to Cart", "Explore More"],
      };
      break;

    case "Add to Cart":
      botResponse = {
        type: "response",
        content: `Choose Quantity`,
        buttons: quantity,
      };
      break;

    case "Explore More":
      botResponse = {
        type: "response",
        content: "Sure here we go.. what kind of food you'd love to prefer",
        buttons: categories.map((item) => item.categoryName),
      };
      break;

    case "Add More Items":
      botResponse = {
        type: "response",
        content: "Sure here we go.. what kind of food you'd love to prefer",
        buttons: categories.map((item) => item.categoryName),
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
      if (size == "Small") {
        state.itemPrice = state.itemPrice + 130;
      }
      if (size == "Medium") {
        state.itemPrice = state.itemPrice + 180;
      }
      if (size == "Large") {
        state.itemPrice = state.itemPrice + 240;
      }

      botResponse = {
        type: "response",
        content: "Selct No.of Meals",
        buttons: quantity,
      };
      break;

    case strQtyConv:
      state.itemTotal = state.itemPrice * stringQuantity;
      state.itemQty = stringQuantity;
      const setCart = [...cart, state];
      console.log(state);
      localStorage.setItem("cart", JSON.stringify(setCart));
      setState({});
      botResponse = {
        type: "response",
        content: `${stringQuantity} item/meal Added to your Order`,
        buttons: ["Add More Items", "Review my order"],
      };
      break;

    case "Review my order":
      botResponse = {
        type: "response",
        content: `Order summary ${cart.map(
          (item, index) =>
            `Item No : ${index + 1}. ${item.itemName}(${item.itemQty} X ${
              item.itemPrice
            }) = ${item.itemTotal}/- `
        )} and the Total Bill is Rs.${totalAmount}/-`,
        buttons: ["Place Order", "Add More Items"],
      };
      break;

    case "Place Order":
      localStorage.setItem("currentOrder", JSON.stringify(cart));
      localStorage.setItem("cart", JSON.stringify([]));
      botResponse = {
        type: "response",
        content: `Hurray..🥳🥳 your Order Placed Successfully`,
        buttons: ["Go to Menu", "No Thanks"],
      };
      break;

    case "Go to Menu":
      botResponse = {
        type: "response",
        content: "Whats on your Mind..? 🍽️",
        buttons: ["Order Food", "Update Order", "Cancel Order", "Go to Cart"],
      };
      break;

    //Order Updation
    case "Update Order":
      localStorage.setItem("cart", JSON.stringify(order));
      const orderLength =
        order.length == 0
          ? "Uh Oh..! seems like you haven't orderd yet"
          : `Order summary ${order.map(
              (item, index) =>
                `Item No : ${index + 1}. ${item.itemName}(${item.itemQty} X ${
                  item.itemPrice
                }) = ${item.itemTotal}/- `
            )} and the Total Bill is Rs.${totalBill}/-`;
      botResponse = {
        type: "response",
        content: orderLength,
        buttons:
          order.length == 0
            ? ["Explore More"]
            : ["Add Item", "Remove Item", "Back to Menu"],
      };
      break;

    case "Add Item":
      console.log(JSON.parse(localStorage.getItem("cart")));
      botResponse = {
        type: "response",
        content:
          "I'm pleased to hear that..! what kind of food you'd love to prefer",
        buttons: categories.map((item) => item.categoryName),
      };
      break;

    case "Remove Item":
      const notEmptyCart =
        cart.length == 0
          ? "You removed All items from your order, Now either cancel your order / add some other items to order"
          : "select food Item you want to remove..🤔🤔";
      botResponse = {
        type: "response",
        content: notEmptyCart,
        buttons:
          cart.length == 0
            ? ["Cancel Order", "Add Item", "Back to Menu"]
            : cart.map((item) => `${item.itemQty} ${item.itemName}`),
      };
      break;

    case "Back to Menu":
      localStorage.setItem("cart", JSON.stringify([]));
      botResponse = {
        type: "response",
        content: "Whats on your Mind..? 🍽️",
        buttons: ["Order Food", "Update Order", "Cancel Order", "Go to Cart"],
      };
      break;

    case removeSpecificItem:
      const RemovedItem = cart.filter(
        (remove) => `${remove.itemQty} ${remove.itemName}` == removeSpecificItem
      );
      const cartAfterRemoval = cart.filter(
        (remove) =>
          `${remove.itemQty} ${remove.itemName}` !== removeSpecificItem
      );
      localStorage.setItem("cart", JSON.stringify(cartAfterRemoval));
      console.log(cartAfterRemoval);
      console.log(RemovedItem);
      botResponse = {
        type: "response",
        content: `${RemovedItem.map((item) => item.itemName)}(${RemovedItem.map(
          (item) => item.itemQty
        )} X ${RemovedItem.map(
          (item) => item.itemPrice
        )}) removed Successfully`,
        buttons: ["Review my order", "Add Item", "Remove Item"],
      };
      break;

    //Order Cancelation
    case "Cancel Order":
      order.length == 0
        ? (botResponse = {
            type: "response",
            content: "Uh Oh looks like you haven't Placed any Order Yet..☹️",
            buttons: ["Order Food", "Go to Cart"],
          })
        : confirm("Are you Sure")
        ? (localStorage.setItem(
            "cart",
            JSON.stringify(JSON.parse(localStorage.getItem("currentOrder")))
          ),
          localStorage.setItem("currentOrder", JSON.stringify([])),
          (botResponse = {
            type: "response",
            content: "Your order has been Successfully cancelled ☹️",
            buttons: ["Go to Menu", "No Thanks"],
          }))
        : (botResponse = {
            type: "response",
            content:
              "Thanks for the Confirmation Wanna update your order..? or Explore Kitchen  by Yourself",
            buttons: ["Upate Order", "Go to Menu"],
          });
      break;
    case "update order":
      break;

    case "No Thanks":
      botResponse = {
        type: "response",
        content: "Thanks you and visit again",
        buttons: [],
      };
      break;

    case "Follow my lead":
      botResponse = {
        type: "response",
        content: "I'm glad to here that Here we go Whats on your mind..🍽️",
        buttons: ["Order Food", "Cancel Order", "Update Order"],
      };
      break;

    default:
      botResponse = {
        type: "response",
        content:
          "As an Learning AI Chatbot i can't understand Every Request So kindly type in capitalize format / Follow my lead",
        buttons: ["Follow my lead"],
      };
      break;
  }

  return botResponse;
};
