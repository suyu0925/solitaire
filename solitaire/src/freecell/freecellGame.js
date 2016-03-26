"use strict";

/**
 * 空当接龙的游戏模型对象
 * @class Freecell
 * @property {Deck} deck - 牌组
 * @property {[[int]]} columns
 * @property {[int]} free
 * @property {[int]} suits
 * @constructor
 */
var FreecellGame = function () {
    // the deck of cards
    this.deck = new Deck();
    // the columns of cards
    this.columns = [[], [], [], [], [], [], [], []];
    // the empty slots of moving cards
    this.free = [null, null, null, null];
    // the spaces to hold the complete suits
    this.suits = [null, null, null, null];
};

/**
 * @description 初始化游戏
 */
FreecellGame.prototype.init = function () {
    var card;

    // shuffle the deck
    this.deck.shuffle();

    for (var i = 0; i < 52; i++) {
        // add the cards to the columns
        card = this.deck.cards[i];
        this.columns[i % 8].push(card);
    }
};

/**
 * @description 重置游戏
 */
FreecellGame.prototype.reset = function () {
    var i, col;

    this.free = [null, null, null, null];
    this.suits = [null, null, null, null];

    for (i = 0; i < 8; i++) {
        col = this.columns[i];
        col.length = 0;
    }

    this.init();
};

/**
 * @description 判断某一张牌是不是可移动
 * @param {int} card_id - 牌的id
 * @returns {boolean}
 */
FreecellGame.prototype.isDraggable = function (card_id) {
    var i, card, col, col_len;

    // 先判断是不是在交换区
    for (i = 0; i < 4; i++) {
        card = this.free[i];
        if (card && card.id === card_id) {
            return true;
        }
    }

    // 再判断是不是8列中最后一个
    for (i = 0; i < 8; i++) {
        col = this.columns[i];
        col_len = col.length;
        if (col_len > 0) {
            card = col[col_len - 1];
            if (card.id === card_id) {
                return true;
            }
        }
    }

    return false;
};

FreecellGame.prototype.validDragIds = function () {
    var drag_ids, i, card, col, col_len;

    drag_ids = [];

    // add cards in freecell spaces
    for (i = 0; i < 4; i++) {
        card = this.free[i];
        if (card !== null) {
            drag_ids.push(card.id);
        }
    }
    // add cards at the bottom of columns
    for (i = 0; i < 8; i++) {
        col = this.columns[i];
        col_len = col.length;
        if (col_len > 0) {
            card = col[col_len - 1];
            drag_ids.push(card.id);
        }
    }

    return drag_ids;
};

/**
 * @description 是否已经完成
 * @returns {boolean}
 */
FreecellGame.prototype.isGameWon = function () {
    var i, card;

    for (i = 0; i < 4; i++) {
        card = this.suits[i];
        if (card === null || card.value !== 13) {
            return false;
        }
    }
    return true;
};
