"use strict";

/**
 * @class Card
 * @param {int} id - 标识
 * @param {string} suit - 花色，取值为'clubs', 'spades', 'hearts', 'diamonds'
 * @param {int} value - 牌值
 * @constructor
 */
var Card = function (id, suit, value) {
    this.id = id;
    this.suit = suit;
    this.value = value;
    this.colour = CARD_COLOURS[suit];
};

Card.prototype.sameSuit = function (other) {
    return this.suit === other.suit;
};

Card.prototype.sameColour = function (other) {
    return this.colour = other.colour;
};

Card.prototype.sameValue = function (other) {
    return this.value === other.value;
};

Card.prototype.serialize = function () {
    return this.suit + '_' + this.value;
};

