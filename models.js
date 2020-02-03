paginate(params){
        const { filter , limit , offset , callback } = params//desestruturando os valores

        let query = `
        SELECT instructors.*, count(members) AS total_members
        FROM instructors
        `
        if(filter){
            query = `${query}
            WHERE instructors.name ILIKE '%${filter}%'
            `
        }
        query = `${query} 
        GROUP BY instructors.id LIMIT $1 OFFSET $2
        `
        db.query(query , [limit ,offset] , (err ,results)=>{
            if(err) throw `Database is ${err}`

            callback(results.rows)
        })
    }
