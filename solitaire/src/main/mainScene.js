"use strict";

var MainLayer = cc.Layer.extend({
    menus: null,
    freecell: null,

    ctor: function () {
        this._super();

        // 创建菜单
        this.menus = new cc.Menu();
        this.menus.setPosition(0, 0);

        // 添加空当接龙的按钮
        var sprite = new cc.Sprite(res.main.freecell_button);
        this.freecell = new cc.MenuItemSprite(sprite, null, null, this.menuClick, this);
        this.freecell.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.menus.addChild(this.freecell);

        this.addChild(this.menus);
    },

    menuClick: function (sender) {
        if (sender === this.freecell) {
            cc.director.runScene(new FreeCellGameScene());
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});
