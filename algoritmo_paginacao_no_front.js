let totalPage = 20,
    SelectedPage = 15,
    page = [] ,\\no final tem de estar tudo aqui no array
    oldPage
    
    //QUEREMOS ASSIM(DUAS CASAS APÓS E ANTES DA PAG SELECIONADA)
    //E QUANDO FOR MAIOR!! QUE DOIS(2) ELE COLOQUE OS PONTINHOS (...)
    //[1, ... , 13, 14 , 15 , 16 , 17 , ... , 20]
    
    for(let currentPage = 1; currentPage <= totalPage ; currentPage ++){
    
      const firstAndLastPages = currentPage == 1 || currentPage == totalPage;//a primeira e 
      const pageAfterSelectedPage = currentPage <= SelectedPage + 2 //duas paginas após a selecionada
      const pagesBeforeSelectedPage = currentPage >= SelectedPage - 2 // duas antes a selecionada
      
      if(firstAndLastPages || pagesAfterSelectedPage && pagesBeforeSelectedPage){
        if(oldPage && currentPage - oldPage > 2){//a primeira condição é para ver se essa variavel tem algum valor ou existe
          page.push('...')//adicionamos os pontinhos quando ele 
        }
        
        //caso o selected page seja 16 , vai estar assim [1 , ... , 14, 15, 16 ,17 ,18 , 20]
        //não ter os pontinhos pq não vai estar maior que dois , vai estar igual
        if(oldPage && currentPage - oldPage == 2){
          page.push(oldPage + 1)// e adicionamos um valor a mais ao page
                                // 18 - 20 = 2  , 2 == 2 TRUE essa é a ideia
        }

        page.push(currentPage)
        oldPage = currentPage // ele sempre vai estar um passo atras do currentPage , pq ele é sempre colocado por ultimo
                              //lembrando o 1 passa direto pq não tem valor na variavel 'oldPage'
      }
  }
