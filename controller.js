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
    
    let offset = limit * (page - 1) // vai sempre aumentando de 2 em 2
   
    //LIMIT = o número de id que pode aparecer
    //OFFSET = começa a contar de um determinado número
    
    //agruparemos tudo em uma variavel para ficar mais organizado
   const params  = {
            filter,
            page,
            limit,
            offset,
            callback(instructors){
                const pagination = {
                    page, //page já temos tiramos do req.query
                    total: Math.ceil(instructors[0].total / limit)//aqui iremos receber  o total do back-end
                                                                  //ceil = do Math ele arredonda sempre para cima 1.1 == 2
                                                                  //round = do math arredondamento flexivel 1.49 == 1 || 1.5 == 2
                                                                  //floor = do math arredondamento sempre para baixo 1.5 == 1 
                }
                return res.render('instructors/index' , {
                    instructors,
                    filter,
                    pagination
                })
            }
        }
    
    Instructors.paginate(params) // fazendo a chamada da função que faz a ligação com o banco de dados
}
}
