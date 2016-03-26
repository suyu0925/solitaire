"use strict";

var FreeCellGameLayer = cc.Layer.extend({
    game: null,
    cardSprites: null,

    ctor: function () {
        this._super();

        this.game = new FreecellGame();
        this.game.init();
        var drag_ids = this.game.validDragIds();
        for (var i = 0; i < drag_ids.length; i++) {
            cc.log(this.game.deck.getCard(drag_ids[i]).serizalize());
        }

        this.cardSprites = {};
    },

    onEnter: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(plist.game_poker_plist);

        // 添加背景
        var bg = new cc.Sprite(res.background_jpg);
        bg.setPosition(0, 0);
        bg.setAnchorPoint(0, 0);
        this.addChild(bg);

        // 添加牌组
        this.addCards();

        // 添加交换区
        var i, sprite;
        for (i = 0; i < 4; i++) {
            sprite = new cc.Sprite(res.freecell.free_jpg);
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition(i * (78 + 9), 100);
            this.addChild(sprite);
        }

        // 添加归档区
        for (i = 0; i < 4; i++) {
            sprite = new cc.Sprite(res.freecell.suits_jpg);
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition((i + 4) * (78 + 9), 100);
            this.addChild(sprite);
        }
    },

    onExit: function () {
        this._super();

        cc.spriteFrameCache.removeSpriteFrames(plist.game_poker_plist);
    },

    addCards: function () {
        var i, j, card, cards, num_cards;
        for (i = 0; i < 8; i++) {
            cards = this.game.columns[i];
            num_cards = cards.length;

            for (j = 0; j < num_cards; j++) {
                card = cards[j];
                var cardSprite = new CardSprite(card);
                cardSprite.setAnchorPoint(0, 0);
                this.addChild(cardSprite, j);
                cardSprite.setPosition(i * (78 + 9), 900 - j * (112 * 0.4));
                this.cardSprites[card.id] = cardSprite;
            }
        }
    }
});

var FreeCellGameScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        var layer = new FreeCellGameLayer();
        this.addChild(layer);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }
});