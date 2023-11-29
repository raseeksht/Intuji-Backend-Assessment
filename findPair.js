const nums = [8,7,2,5,3,1]
const target = 10
// const nums = [5,2,6,8,1,9]
// const target = 12
const pairs = []

for (let i=0;i<nums.length;i++){
    for (let j=i+1;j<nums.length;j++){
        const total = nums[i]+nums[j]
        if (total == target){
            pairs.push([nums[i], nums[j]])
        }

    }
}

console.log("Input:")
console.log(`nums =`,nums)
console.log(`target = ${target}\n`)
console.log("Output:")

if (pairs.length > 0){
    for (let pair of pairs){
        pairIndex = pairs.indexOf(pair)
        const suffix = (pairIndex == pairs.length - 1) ? "":"or" 
        console.log(`Pair found (${pair[0]}, ${pair[1]}) ${suffix}`)
    }
}
else{
    console.log("Pair not found.")
}