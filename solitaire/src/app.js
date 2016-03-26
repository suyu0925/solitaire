var HelloWorldLayer = cc.Layer.extend({
    cardBatchNode: null,

    ctor: function () {
        this._super();

        // 扑克的图片
        cc.spriteFrameCache.addSpriteFrames(plist.game_poker_plist);

        // cards batch node
        this.cardBatchNode = cc.SpriteBatchNode.create(res.game_poker_png, 30);
        this.addChild(this.cardBatchNode);

        var card = new Card('1', 'hearts', 9);
        card.setPosition(300, 300);
        this.cardBatchNode.addChild(card);

        return true;
    },

    onExit: function () {
        this._super();

        cc.spriteFrameCache.removeSpriteFramesFromFile(plist.game_poker_plist);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

