const permute = function (nums) {
    const res = []
    const len = nums.length

    const currPath = []

    function dfs(nth) {
        if (nth === len) {
            res.push([...currPath])
            return
        }

        nums
            .filter(num=>!currPath.includes(num))
            .forEach(num => {
                currPath.push(num)
                dfs(nth + 1)
                currPath.pop()

            })
    }
    dfs(0)

    return res

}


console.log(
    permute([1, 2, 3])

);