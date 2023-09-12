class OnCast {
    calcOnCast(AD, ench) {
        if (ench === true) {
            AD = Math.floor(AD * 1.175);
        } else {
            AD = Math.floor(AD * 1.125);
        }

        return AD;
    }
}

module.exports = OnCast;