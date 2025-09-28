code = document.getElementById('code')
result = document.getElementById('result')
language = document.getElementById("language")
document.querySelector('form').addEventListener("submit", async(e)=>{
    e.preventDefault()
    data = await fetch("http://localhost:8080/api/compile", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({codes:code.value,lang:language.value})
    })
    data = await data.json()
    result.scrollIntoView({
        behaviour:'smooth',
        block:'center'
    })
    
    result.value = data.data
})