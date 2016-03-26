var res = {
    game_poker_png: "res/common/poker.png",
    background_jpg: "res/common/background.jpg",

    // 主菜单
    main: {
        button_bg_png: "res/main/button_bg.png",
        freecell_button: "res/main/freecell_button.png"
    },

    // 空当接龙
    freecell: {
        free_jpg: "res/freecell/free.jpg",
        suits_jpg: "res/freecell/suits.jpg"
    }
};

var plist = {
    game_poker_plist: "res/common/poker.plist"
};

var g_resources = [];

(function () {
    var i, j;

    for (i in res) {
        if (res[i] instanceof Object) {
            for (j in res[i]) {
                g_resources.push(res[i][j]);
            }
        } else {
            g_resources.push(res[i]);
        }
    }

    for (i in plist) {
        g_resources.push(plist[i]);
    }
})();
