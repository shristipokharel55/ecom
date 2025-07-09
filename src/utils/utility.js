

export const hashPassword = (password)=>{
    return bcrypt.hashSync(data.password,10)
}
