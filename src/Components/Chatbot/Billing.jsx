// import { categories, data } from "../rawData/data";

export const billing = (input, state, setSate) => {
  let botResponse = {};
  let CartItem = [];

//   input.forEach(element => {
//     const name = data.map(item => item.name)
//     name.forEach(item => {
//         if(element == item) {
//             setSate([...state, state.name = element])
//         }
//     })
//     const price = data.map(item => item.price)
//     price.forEach(item => {
//         if (element == item) {
//             setSate([...state, state.price = element])
//         }
//     })
//     const AddONs = data.map(item => item.addONs)
//     AddONs.forEach(item => {
//         if(element == item) {
//             setSate([...state, state.price = element])
//         }
//     })
//     setSate([...state, state.itemQty = ])


    
//   })

//   const category = data.filter((item) => item.category === input);
//   const { categoryName } =
//     categories.find((item) => item.categoryName === input) || "";

//   //showing the specific item
//   const specificItem = data.find((item) => item.name === input) || "";
//   const specificItemExtract = specificItem.name || "";



//   //AddONs
//   const selfAddONS = [
//     "Make it a meal",
//     "Pepsi",
//     "Coke",
//     "Fries",
//     "MayoDip",
//     "TandooriDip",
//     "CheesyDip",
//     "Review My Order",
//   ];
//   const addingSelfAddONs = selfAddONS.find((item) => item === input)
//     ? input
//     : "";

//   //adding Quantity
//   const quantity = ["1", "2", "3", "4", "5"];
//   const stringQuantity = quantity.find((item) => item === input) || "";

//   //Meal Size
//   const mealSize = [
//     { size: "Small", price: 120 },
//     { size: "Medium", price: 180 },
//     { size: "Large", price: 240 },
//   ];

//   const { size } = mealSize.find((item) => item.size === input) || "";
//   console.log(input);
  return {
    botResponse: botResponse,
    CartItem: CartItem,
  };
};
