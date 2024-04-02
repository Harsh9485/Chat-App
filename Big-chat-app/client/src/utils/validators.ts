export const InputValidation = (str: string) => {
  // if (str.length < 8) {
  //   return { error: true, massage: "menimum 8 characters required" };
  // }
  // const SC = [
  //   "!",
  //   "$",
  //   "%",
  //   "^",
  //   "&",
  //   "*",
  //   "<",
  //   ">",
  //   "(",
  //   ")",
  //   "*",
  //   "+",
  //   ",",
  //   "-",
  //   ".",
  //   "/",
  // ];
  // // for (let i = 0; i < str.length; i++) {
  // //   const result = SC.find((char) => char === str[i]);
  // //   if (result) {
  // //     return {
  // //       error: true,
  // //       massage: "Spashal characters is not sutabal Like (!#$%^&*<>?/)",
  // //     };
  // //   }
  // // }
  // for (let i = 0; i < str.length; i++) {
  //   for (let j = 0; j < SC.length; j++) {
  //     if (str[i] === SC[j]) {
  //       return {
  //         error: true,
  //         massage: "Spashal characters is not sutabal Like (!#$%^&*<>?/)",
  //       };
  //     }
  //   }
  // }
  return { error: false, message: "" };
};
