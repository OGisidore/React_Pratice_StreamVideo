

export const slugyfy = (name:string):string =>{
    const randomNumber = Math.ceil(Math.random()*1000)
    let slugbase = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g,'-')
    .replace(/--/g,'-')
    .trim()

    return `${slugbase}-${randomNumber}`

}