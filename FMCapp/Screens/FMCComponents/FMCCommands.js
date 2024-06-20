const fmcButtons = {
    "initRef": "laminar/B738/button/fmc1_init_ref",
    // all values start with "laminar/B738/button/fmc1_" and end with the key
    rte: "laminar/B738/button/fmc1_rte",
    clb: "laminar/B738/button/fmc1_clb",
    crz: "laminar/B738/button/fmc1_crz",
    des: "laminar/B738/button/fmc1_des",
    menu: "laminar/B738/button/fmc1_menu",
    legs: "laminar/B738/button/fmc1_legs",
    depArr: "laminar/B738/button/fmc1_dep_app",
    hold: "laminar/B738/button/fmc1_hold",
    prog: "laminar/B738/button/fmc1_prog",
    exec: "laminar/B738/button/fmc1_exec",
    n1Limit: "laminar/B738/button/fmc1_n1_lim",
    fix: "laminar/B738/button/fmc1_fix",
    prevPage: "laminar/B738/button/fmc1_prev_page",
    nextPage: "laminar/B738/button/fmc1_next_page",
    // The letters in the key are the same as the letters in the FMC with capitalization
    a: "laminar/B738/button/fmc1_A",
    b: "laminar/B738/button/fmc1_B",
    c: "laminar/B738/button/fmc1_C",
    d: "laminar/B738/button/fmc1_D",
    e: "laminar/B738/button/fmc1_E",
    f: "laminar/B738/button/fmc1_F",
    g: "laminar/B738/button/fmc1_G",
    h: "laminar/B738/button/fmc1_H",
    i: "laminar/B738/button/fmc1_I",
    j: "laminar/B738/button/fmc1_J",
    k: "laminar/B738/button/fmc1_K",
    l: "laminar/B738/button/fmc1_L",
    m: "laminar/B738/button/fmc1_M",
    n: "laminar/B738/button/fmc1_N",
    o: "laminar/B738/button/fmc1_O",
    p: "laminar/B738/button/fmc1_P",
    q: "laminar/B738/button/fmc1_Q",
    r: "laminar/B738/button/fmc1_R",
    s: "laminar/B738/button/fmc1_S",
    t: "laminar/B738/button/fmc1_T",
    u: "laminar/B738/button/fmc1_U",
    v: "laminar/B738/button/fmc1_V",
    w: "laminar/B738/button/fmc1_W",
    x: "laminar/B738/button/fmc1_X",
    y: "laminar/B738/button/fmc1_Y",
    z: "laminar/B738/button/fmc1_Z",
    
    // numbers
    zero: "laminar/B738/button/fmc1_0",
    one: "laminar/B738/button/fmc1_1",
    two: "laminar/B738/button/fmc1_2",
    three: "laminar/B738/button/fmc1_3",
    four: "laminar/B738/button/fmc1_4",
    five: "laminar/B738/button/fmc1_5",
    six: "laminar/B738/button/fmc1_6",
    seven: "laminar/B738/button/fmc1_7",
    eight: "laminar/B738/button/fmc1_8",
    nine: "laminar/B738/button/fmc1_9",

    // special characters
    slash: "laminar/B738/button/fmc1_slash",
    period: "laminar/B738/button/fmc1_period",
    plusminus: "laminar/B738/button/fmc1_minus",
    space: "laminar/B738/button/fmc1_SP",
    delete: "laminar/B738/button/fmc1_del",
    clear: "laminar/B738/button/fmc1_clr",

    // Side buttons
    l1: "laminar/B738/button/fmc1_1L",
    l2: "laminar/B738/button/fmc1_2L",
    l3: "laminar/B738/button/fmc1_3L",
    l4: "laminar/B738/button/fmc1_4L",
    l5: "laminar/B738/button/fmc1_5L",
    l6: "laminar/B738/button/fmc1_6L",
    r1: "laminar/B738/button/fmc1_1R",
    r2: "laminar/B738/button/fmc1_2R",
    r3: "laminar/B738/button/fmc1_3R",
    r4: "laminar/B738/button/fmc1_4R",
    r5: "laminar/B738/button/fmc1_5R",
    r6: "laminar/B738/button/fmc1_6R",
};


// Create a map of all the buttons to their values
const fmcButtonsMap = new Map();
for (const key in fmcButtons) {
    fmcButtonsMap.set(key, fmcButtons[key]);
}

// Export the map
module.exports = fmcButtonsMap;

