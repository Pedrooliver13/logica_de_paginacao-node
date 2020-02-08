function paginate(SelectedPage , totalPages) {//algoritmo de paginação no front
    let page = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) { //ele ta repetindo um por um 
        //<--- DUAS PAGES ANTES
        // [ 1 , ... , 13,14, 15 ,16,17 , ... , 20]
        //                      DUAS PAGES DEPOIS --->
        const FirstAndLastPages = currentPage == 1 || currentPage == totalPages;
        const pageAfterSelectedPage = currentPage <= SelectedPage + 2; //pag depois
        const pageBeforeSelectedPage = currentPage >= SelectedPage - 2; //pages antes

        if (FirstAndLastPages || pageAfterSelectedPage && pageBeforeSelectedPage) {//ENTÃO VAMOS SEPARAR OS NÚMEROS QUE NÓS QUEREMOS 
            if (oldPage && currentPage - oldPage > 2) {//adicionando os pontinhos
                page.push('...')
            }
            if (oldPage && currentPage - oldPage == 2) {//caso o oldpage não seja maior que 2 assim:
                                                        // [ 1 , ... , 14,15, 16 ,17,18 , 20]
                                                        //iremos adicionar mais um assim
                                                        //[ 1 , ... , 14,15, 16 ,17,18 , 19,20]
                page.push(oldPage + 1)
            }

            page.push(currentPage)
            oldPage = currentPage//ele atualiza por ultimo
        }
    }
    return page
    }

//enviamos através do back-end as infos
//e vamos influenciar o front atraves do javascript

function createPagination(pagination){
    const page = +pagination.dataset.page//pegando os dados no html atraves da data-(no javascript é dataset) que pega a div 
    const total = +pagination.dataset.total

    const pages = paginate(page, total)//chamnado a função

    let elemetns = ""//elemento vazio por inicio

    for(let page of pages){//repetição
        if(String(page).includes('...')){//o includes só funciona com strings portanto
                                        //tranformaremos o que foi passado as info em string
                                        //e usaremos o includes para procurar os pontinhos
                                        //e mudamos de um links para algo que não seja clicavel
            elemetns += `<span>${page}</span>`

        }else{
            elemetns += `<a href="?page=${page}">${page}</a>`

        }
     }
pagination.innerHTML = elemetns//adicionando ha div(com class pagination) a let elements quem tem as quantidades de pages
    
}

let pagination = document.querySelector(".pagination")//pagination é uma div


if(pagination){
    createPagination(pagination)
}
