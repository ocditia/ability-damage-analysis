class OnCast {
    calcOnCast(AD, ench) {
        if (ench === true) {
            AD = Math.floor(th * 1.175);
        } else {
            AD = Math.floor(th * 1.125);
        }

        return AD;
    }
}

module.exports = OnCast;