function create_object(crit) {
    let damage_object = {};
    if (crit === true) {
        damage_object = {
            non_crit: {
                'min_hit': 0,
                'var_hit': 0,
                'crit': false,

                'probability': 0.9
            },
            crit: {
                min_hit: 0,
                var_hit: 0,
                crit: true,

                'probability': 0.1
            }
        }
    }

    else {
        damage_object = {
            non_crit: {
                min_hit: 0,
                var_hit: 0,
                crit: false,

                'probability': 1
                },
        }
    }
    return damage_object;
}

export default create_object;