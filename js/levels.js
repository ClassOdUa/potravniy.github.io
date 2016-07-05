define([], function () {
    //  It is just a visual map of bricks. Number corresponds the type ob brick. Apply for manual level construction.
    //  Valid values - variable defined below or for brick absence - 0, space, empty string, NaN, undefined and so on.
    var b = "basic";
    var m = "multiHit";
    var s = "surprise";
    var u = "unbreakable";
    var t = "tnt";

    var levels = [];        //  Index of array means level number.
    levels[0] = undefined;  //  Level 0 is absent.

    //  First row in table must have non-empty last element. Element "" does not mean any brick and will not snown on the screen.
    //levels[1] = [
    //        [b, b, b, b, u, b, b, u, b, b, b, b],
    //        [b, b, b, b, u, b, b, u, b, b, b, b],
    //        [b, b, b, b, u, b, b, u, b, b, b, b],
    //        [b, b, b, b, u, b, b, u, b, b, b, b],
    //        [b, b, b, b, u, b, b, u, b, b, b, b],
    //        [b, b, m, b, u, b, b, u, b, m, b, b],
    //        [b, b, b, s, t, b, b, t, s, b, b, b],
    //        [u, u, u, u, u, m, m, u, u, u, u, u],
    //        [b, b,  ,  ,  , b, b,  ,  ,  , b, b],
    //        [b, b, b,  , s, b, b, s,  , b, b, b],
    //        [b, b, b, b, b, m, m, b, b, b, b, b],
    //        [ ,  ,  ,  , m, b, b, m,  ,  ,  ,  ],
    // ];
    // levels[2] = [
    //         [, , , , , , , , , , , ""],
    //         [, , , , , , , , , , , ],
    //         [,  , , , ,  ,  , , , ,  , ],
    //         [,  ,  , ,  ,  ,  ,  , ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    //         [b, , , , , , , , , , ,  ],
    // ];
    levels[1] = [
           [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],    //  First row in table must have non-empty last element. Element "" does not mean any brick and will not snown on the screen.
           [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
           [ , b, b, b, b, b, b, b, b, b, b, ],
           [ , b, b, b, b, b, b, b, b, b, b, ],
           [ , b, b, s, b, b, b, b, s, b, b, ],
           [ , b, b, b, s, m, m, s, b, b, b, ],
           [ , b, b, b, m, b, b, m, b, b, b, ],
           [ , b, b, b, s, m, m, s, b, b, b, ],
           [ , b, b, s, b, b, b, b, s, b, b, ],
           [ , b, b, b, b, b, b, b, b, b, b, ],
           [ , b, b, b, b, b, b, b, b, b, b, ],
           [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
    ];
    levels[2] = [  
           [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
           [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
           [ , b,  ,  ,  , b, b,  ,  ,  , b,  ],
           [ , b, b,  , b, b, b, b,  , b, b,  ],
           [ , b, b,  , b, b, b, b,  , b, b,  ],
           [ , b, b, s, b, b, b, b, s, b, b,  ],
           [ , m, m, m, m, m, m, m, m, m, m,  ],
           [ , b, b, s, m, s, s, m, s, b, b,  ],
           [ , b, b, m, b, b, b, b, m, b, b,  ],
           [ , b, u, b, b, u, u, b, b, u, b,  ],
           [ , m, b, b, b, b, b, b, b, b, m,  ],
           [m,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , m],
    ];
    levels[3] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  , m, m,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  , u, s, b, b, s, u,  ,  ,  ],
            [ , b, b, s, s, b, b, s, s, b, b,  ],
            [ , m, b, b, m, b, b, m, b, b, m,  ],
            [ ,  , m, m, b, b, b, b, m, m,  ,  ],
            [ ,  ,  , m, b, b, b, b, m,  ,  ,  ],
            [ ,  ,  ,  , m, b, b, m,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[4] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , b,  ,  ,  ,  ,  ,  ,  ,  , b,  ],
            [ , b, b,  ,  ,  ,  ,  ,  , b, b,  ],
            [ , b, b, b, b, b, b, b, b, b, b,  ],
            [ , b, b, b, s, b, b, s, b, b, b,  ],
            [ , m, m, m, m, m, m, m, m, m, m,  ],
            [ , b, b, b, m, s, s, m, b, b, b,  ],
            [ , b, b, s, b, b, b, b, s, b, b,  ],
            [ , b, s, u, b, b, b, b, u, s, b,  ],
            [ , m, m, m, m, m, m, m, m, m, m,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[5] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , m, m, m, m, m, m, b,  ,  ,  ,  ],
            [ , m, m, m, m, m, m, b, b,  ,  ,  ],
            [ , m, m, m, m, m, m, b,  , b,  ,  ],
            [ , m, s, s, s, m, m, s,  ,  , b,  ],
            [ , m, m, m, m, m, m, b, b, b, b,  ],
            [ , u, b, b, u, b, b, u, b, b, u,  ],
            [ , b, b, m, b, b, b, b, m, b, b,  ],
            [ , b, m, s, m, b, b, m, s, m, b,  ],
            [ ,  ,  , m,  ,  ,  ,  , m,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[6] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [ , b,  ,  ,  ,  ,  , b,  ,  ,  ,  ],
            [ , b, b,  ,  ,  , b, b, b,  ,  ,  ],
            [ , b, b, b,  , b, b, b, b, b,  ,  ],
            [ ,  , b, b, m, b, b, b, m, s, b,  ],
            [ ,  , b, b, m, b, b, b, m, m, b,  ],
            [ , b, b, b,  , b, b, b, b, b,  ,  ],
            [ , b, b,  ,  ,  , b, b, b,  ,  ,  ],
            [ , s,  ,  ,  ,  ,  , s,  ,  ,  ,  ],
            [m, m, m, m, m, m, m, m, m, m, m, m],
            [m, m, m, m, m, m, m, m, m, m, m, m],
    ];
    levels[7] = [
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  , m, m,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  , s, b, b, s,  ,  ,  ,  ],
            [ , b, b, s, u, b, b, u, s, b, b,  ],
            [ , u, b, b, m, b, b, m, b, b, u,  ],
            [ ,  , m, m, b, b, b, b, m, m,  ,  ],
            [ ,  ,  , u, b, b, b, b, u,  ,  ,  ],
            [ ,  ,  ,  , m, u, u, m,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
    ];
    levels[8] = [
            [m,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , ""],
            [b, m,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [b, b, m,  ,  ,  ,  ,  ,  ,  ,  ,  ],
            [b, b, b, m,  ,  ,  ,  ,  ,  ,  ,  ],
            [b, m, s, b, m,  ,  ,  ,  ,  ,  ,  ],
            [b, m, b, m, s, m,  ,  ,  ,  ,  ,  ],
            [b, b, b, s, u, b, m,  ,  ,  ,  ,  ],
            [b, u, b, b, m, b, b, m,  ,  ,  ,  ],
            [b, s, m, m, b, b, b, b, m,  ,  ,  ],
            [b, b, b, s, b, b, b, s, b, m,  ,  ],
            [m, m, m, m, m, m, m, m, m, m, m,  ],
            [u, m, u, m, u, m, u, m, u, m, u, m],
    ];
    levels[9] = [
            [ ,  ,  ,  ,  , s, s,  ,  ,  ,  , ""],
            [ ,  ,  ,  , m, u, u, m,  ,  ,  ,  ],
            [ ,  ,  , u, b, b, b, b, u,  ,  ,  ],
            [ ,  , m, m, b, b, b, b, m, m,  ,  ],
            [ , u, b, b, m, b, b, m, b, b, u,  ],
            [m, b, b, s, u, b, b, u, s, b, b, m],
            [ ,  ,  ,  ,  , m, m,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , u, u,  ,  ,  ,  ,  ],
    ];
    levels[10] = [
            [ ,  ,  ,  ,  ,  , b,  ,  ,  ,  ,  , ""],
            [ ,  ,  ,  ,  , b, u, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  , b,  , s,  , b,  ,  ,  ,  ],
            [ ,  ,  , b,  ,  , b,  ,  , b,  ,  ,  ],
            [ ,  , b,  ,  , b, m, b,  ,  , b,  ,  ],
            [ , b,  ,  , b, m, u, m, b,  ,  , b,  ],
            [b, u, s, b, m, u, u, u, m, b, s, u, b],
            [ , b,  ,  , b, m, u, m, b,  ,  , b,  ],
            [ ,  , b,  ,  , b, m, b,  ,  , b,  ,  ],
            [ ,  ,  , b,  ,  , b,  ,  , b,  ,  ,  ],
            [ ,  ,  ,  , b,  , s,  , b,  ,  ,  ,  ],
            [ ,  ,  ,  ,  , b, u, b,  ,  ,  ,  ,  ],
            [ ,  ,  ,  ,  ,  , b,  ,  ,  ,  ,  ,  ],
    ];
    levels[11] = [
            [ ,  ,  , b,  ,  ,  ,  ,  , b,  ,  , ""],
            [ , u, u, b, b,  ,  ,  , b, b, u, u,  ],
            [ , u, u, b, b, b,  , b, b, b, u, u,  ],
            [b, b, b, s, b, b, u, b, b, s, b, b, b],
            [ , b, b, b, m, b, u, b, m, b, b, b,  ],
            [ ,  , b, b, b, m, m, m, b, b, b,  ,  ],
            [ ,  ,  , u, u, m, s, m, u, u,  ,  ,  ],
            [ ,  , b, b, b, m, m, m, b, b, b,  ,  ],
            [ , b, b, b, m, b, u, b, m, b, b, b,  ],
            [b, b, b, s, b, b, u, b, b, s, b, b, b],
            [ , u, u, b, b, b,  , b, b, b, u, u,  ],
            [ , u, u, b, b,  ,  ,  , b, b, u, u,  ],
            [ ,  ,  , b,  ,  ,  ,  ,  , b,  ,  ,  ],
    ];
    levels[12] = [
            [b, b, b, b, u, b, b, u, b, b, b, b],
            [b, b, b, b, u, b, b, u, b, b, b, b],
            [b, b, b, b, u, b, b, u, b, b, b, b],
            [b, b, b, b, u, b, b, u, b, b, b, b],
            [b, b, b, b, u, b, b, u, b, b, b, b],
            [b, b, m, b, u, b, b, u, b, m, b, b],
            [b, b, b, s, t, b, b, t, s, b, b, b],
            [u, u, u, u, u, m, m, u, u, u, u, u],
            [b, b,  ,  ,  , b, b,  ,  ,  , b, b],
            [b, b, b,  , s, b, b, s,  , b, b, b],
            [b, b, b, b, b, m, m, b, b, b, b, b],
            [ ,  ,  ,  , m, b, b, m,  ,  ,  ,  ],
    ];
    levels[13] = [
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, t, s, b, b, b, u, b],
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, t, s, b, b, b, u, b],
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, s, s, b, b, b, u, b],
            [b, u, b, b, b, s, t, s, b, b, b, u, b],
            [b, t, b, b, b, s, s, s, b, b, b, t, b],
            [b, u, u, u, u, u, u, u, u, u, u, u, b],
            [m, m, m, m, m, m, m, m, m, m, m, m, m],
            [m, m, m, m, m, m, m, m, m, m, m, m, m],
    ];

    return levels;
})
