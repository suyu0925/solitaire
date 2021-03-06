"use strict";

var FreecellCardSprite = cc.Sprite.extend({
    card: null,

    ctor: function (card) {
        this._super();

        this.card = card;
        this.initRes();

        // 添加触摸事件监听
        this.touchListener = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE});
        this.touchListener.swallowTouches = true;
        this.touchListener.onTouchBegan = this.onTouchBegan;
        this.touchListener.onTouchMoved = this.onTouchMoved;
        this.touchListener.onTouchEnded = this.onTouchEnded;
        cc.eventManager.addListener(this.touchListener, this);
    },

    getGame: function () {
        var layer = this.getParent().getParent();
        return layer.game;
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        var draggable = target.getGame().isDraggable(target.card.id);

        if (cc.rectContainsPoint(rect, locationInNode) && draggable) {
            cc.log(target.card.serialize() + ': onTouchStart');
            target.setLocalZOrder(Z_ORDER.dragged);
            return true;
        }
        return false;
    },

    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        target.x += delta.x;
        target.y += delta.y;
        //cc.log(target.card.serialize() + ': onTouchMoved');
    },

    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log(target.card.serialize() + ': onTouchEnded');
    },

    initRes: function () {
        var offset = 10;
        var card = this.card;

        // 扑克的牌底，原始大小是156x223
        this.initWithSpriteFrameName('poker_d.png');
        this.setAnchorPoint(0, 0);
        this.setScale(0.5);
        var cardSize = this.getContentSize();

        // 扑克上方的牌值
        var valueFrameName = 'poker_{0}{1}_d.png'.format(
            card.colour === 'red' ? 'r' : 'b',
            card.value === 13 ? 'k' : (
                card.value === 12 ? 'q' : (
                    card.value === 11 ? 'j' : (
                        card.value === 1 ? 'a' : (
                            card.value === 10 ? 't' : card.value
                        )
                    )
                )
            )
        );
        var valueSprite = new cc.Sprite();
        valueSprite.initWithSpriteFrameName(valueFrameName);
        var valueSize = valueSprite.getContentSize();
        var valuePos = cc.p(2 + valueSize.width / 2, cardSize.height - valueSize.height / 2 - offset);
        valueSprite.setPosition(valuePos);
        this.addChild(valueSprite);

        // 扑克上方的花色
        var suitSprite = new cc.Sprite();
        suitSprite.initWithSpriteFrameName('{0}_d.png'.format(CARD_COLOURS_INDEX[card.suit]));
        var suitSize = suitSprite.getContentSize();
        suitSprite.setPosition(cc.p(valuePos.x, cardSize.height - valueSize.height - suitSize.height / 2 - offset));
        this.addChild(suitSprite);

        // 扑克下方的牌值
        valueSprite = new cc.Sprite();
        valueSprite.initWithSpriteFrameName(valueFrameName);
        valueSize = valueSprite.getContentSize();
        valueSprite.setRotation(180);
        valuePos = cc.p(cardSize.width - 2 - valueSize.width / 2, valueSize.height / 2 + offset);
        valueSprite.setPosition(valuePos);
        this.addChild(valueSprite);

        suitSprite = new cc.Sprite();
        suitSprite.initWithSpriteFrameName('{0}_d.png'.format(CARD_COLOURS_INDEX[card.suit]));
        suitSprite.setRotation(180);
        suitSize = suitSprite.getContentSize();
        suitSprite.setPosition(cc.p(cardSize.width - 2 - suitSize.width / 2 - 4, valueSize.height + suitSize.height / 2 + offset));
        this.addChild(suitSprite);
    }
});