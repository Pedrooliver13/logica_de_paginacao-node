const Instructors = require('db')

module.exports = {
  index(req , res){
    const { filter ,page , limit } = req.query // ?alguma=value
                                              // &page=value
                                             // &limit=value
                                             //esses são as formas das variaveis no query
    
    //para caso o usuario não clique em nada , daremos um valor padrão!
    page = page || 1
    limit = limit || 2
    
    //o page vai receber um valor (que por padrão é 1) , e vai subtrair -1
    //e vai fazer um a multiplicação
    //e assim offset vai receber
    
    let offset = limit * (page - 1)
   
    //LIMIT = o número de id que pode aparecer
    //OFFSET = começa a contar de um determinado número
    
    //agruparemos tudo em uma variavel para ficar mais organizado
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors){
        return res.render('instructors/index' , { instructors , filter})
      }
    
    Instructors.paginate(params) // fazendo a chamada da função que faz a ligação com o banco de dados
}
}
