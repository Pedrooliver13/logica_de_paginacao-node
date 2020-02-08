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
            if (oldPage && currentPage - oldPage == 2) {//caso o oldpage não seja maior que 2
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
let pagination = document.querySelector(".pagination")

const page = +pagination.dataset.page//pegando os dados no html atraves da variavel que pega a div 
const total = +pagination.dataset.total

const pages = paginate(page, total)//chamnado a função

let elemetns = ""//elemento vazio por inicio

for(let page of pages){//repetição
    if(String(page).includes('...')){//o includes só funciona com strings portanto
                                    //tranformaremos o que foi passado as info em string
                                    //e usaremos o includes para procurar os pontinhos
        elemetns += `<span>${page}</span>`

    }else{
        elemetns += `<a href="?page=${page}">${page}</a>`

    }
}

pagination.innerHTML = elemetns//adicionando ha div(com class pagination) a let elements quem tem as quantidades de pages
