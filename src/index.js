// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
window.$fxhashFeatures = {
  "Panel Number": panelNum,
  "Strand Amount": strand_num_name,
  "Strand Thickness": thickness_name,
  "Speed": speed_name,
  "Cycle Length": cycle_name,
  "Noise Variance": noise_name
}

// this code writes the values to the DOM as an example
const container = document.createElement("div")
container.innerText = `
  random hash: ${fxhash}\n
  Panel Number: ${window.$fxhashFeatures["Panel Number"]}\n
  Strand Amount: ${window.$fxhashFeatures["Strand Amount"]}\n
  Stand Thickness: ${window.$fxhashFeatures["Strand Thickness"]}\n
  Speed: ${window.$fxhashFeatures["Speed"]}\n
  Noise Variance: ${window.$fxhashFeatures["Noise Variance"]}\n
  Cycle Length: ${window.$fxhashFeatures["Cycle Length"]}\n
`
//document.body.prepend(container)
