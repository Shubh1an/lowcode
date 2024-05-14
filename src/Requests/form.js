const { default: apiInstance } = require("./instance")

const saveForm = async (data) => {
    console.log(data)
    apiInstance.post("/form", data).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}

export default saveForm