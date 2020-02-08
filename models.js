paginate(params){
         let { filter , offset, limit , callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*)
                FROM instructors
            ) AS total
            ` // usamos um select dentro de outro select
        if(filter){
            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%' 
            `
            totalQuery = `(
                SELECT count(*)
                FROM instructors
                ${filterQuery}
            )AS total` //para a paginação funcionar quando tiver um filtro
        }
        //e adicionamos tudo dinamicamente
        query = `
        SELECT instructors.*,${totalQuery} ,count(members) AS total_instructors 
        FROM instructors 
        LEFT JOIN members ON ( instructors.id = members.instructors_id )
        ${filterQuery}
        GROUP BY instructors.id
        LIMIT $1 OFFSET $2
        `
        db.query(query , [limit ,offset] , (err ,results)=>{
            if(err) throw `Database ${err}`

            callback(results.rows)
        })
    }
