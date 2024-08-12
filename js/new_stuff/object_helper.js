function create_object(crit) {
    if (crit === true) {
        let damage_object = {
            non_crit: {
                min_hit: 0,
                var_hit: 0,
                crit: false
            },
            crit: {
                min_hit: 0,
                var_hit: 0,
                crit: true
            }
        }
    }

    else {
        let damage_object = {
            non_crit: {
                min_hit: 0,
                var_hit: 0,
                crit: false
                },
        }
    }
}

export default create_object;