document.addEventListener("DOMContentLoaded", () =>{


 const  a =   [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [7,5,3],
]


  
  const winning_array = [1, 2, 3]


  const combination_array = [1, 5, 2, 3]


  let difference = combination_array.filter(a => winning_array.includes(a))
  // wenn a in array dann adde es zu diffrence, wenn nicht skip
  // Verneit umgehkert

  console.log(difference)



  // const winning_array = [1, 2, 3]


  // const combination_array = [1, 5, 2, 3]

  // let difference = combination_array.filter(x => !winning_array.includes(x));

  // let difference_x = array1.filter(x => !array ) 



  // let intersection = combination_array.filter(x => winning_array.includes(x));

  // let difference2 = combination_array
  //                .filter(x => !winning_array.includes(x))
  //                .concat(winning_array.filter(x => !combination_array.includes(x)))


  // console.log(intersection,)













})