"use strict";

var Deck = function () {
    var values, i, suit, value;

    this.cards = [];

    values = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    for (i = 0; i < 52; i++) {
        suit = CARD_SUITS[i % 4];
        value = values[Math.floor(i / 4)];
        var card = new Card(i + 1, suit, value);
        this.cards.push(card);
    }
};

/**
 * @description 洗牌
 */
Deck.prototype.shuffle = function () {
    var len, i, j, item_j;

    len = this.cards.length;
    for (i = 0; i < len; i++) {
        j = Math.floor(len * Math.random());
        item_j = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = item_j;
    }
};

/**
 * @description 通过card标识来在牌堆中找到某一张牌
 * @param {int} card_id - 牌的标识
 * @returns {Card|null}
 */
Deck.prototype.getCard = function (card_id) {
    var i, card;

    for (i = 0; i < this.cards.length; i++) {
        card = this.cards[i];
        if (card_id === card.id) {
            return card;
        }
    }

    // only reach this if invalid card_id is supplied
    cc.error('error in Deck.getCard()');
    return null;
};
