'use strict';

const { transactionModel, walletModel, debtModel } = require('../models');

const transactionService = {};


transactionService.create = async (payload) => await transactionModel.create(payload);
transactionService.findAndUpdateOne = async (criteria, toUpdate, options) =>
    await transactionModel.findOneAndUpdate(criteria, toUpdate, options);

transactionService.findOneTransaction = async (criteria) => await transactionModel.findOne(criteria);
transactionService.findTransactions = async (criteria, index, limit) =>
    await transactionModel.find(criteria)
        .sort({ createdAt: -1 })
        .skip(index)
        .limit(limit);


// Wallet Operations
transactionService.createWallet = async (payload) => await walletModel.create(payload)
transactionService.updateWallet = async (criteria, toUpdate, options) =>
    await walletModel.findOneAndUpdate(criteria, toUpdate, options);

transactionService.findWallet = async (criteria) =>
    await walletModel.findOne(criteria);

module.exports = transactionService


// Debt Operation
transactionService.createDebt = async (payload) => await debtModel.create(payload);