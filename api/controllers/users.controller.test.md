import \* as controller from './users.controller.js';
import { User } from '../models/user.model';

jest.mock('../models/user.model');

describe('Given the Users controller', () => {
let req;
let res;
let next;
beforeEach(() => {
req = { params: {} }; //tasks: []
res = {
send: jest.fn(),
json: jest.fn(),
status: jest.fn(),
};
next = jest.fn();
});
describe('When we try to get all users (getAllUsers is triggered)', () => {
describe('And it works (promise is resolved)', () => {
beforeEach(() => {
User.find.mockResolvedValue([]);
});
test('User model exists and have a method "find"', () => {
expect(User.find).toBeTruthy();
});
});
describe('And it does not work (promise is rejected)', () => {
beforeEach(() => {
User.find.mockRejectedValue(new Error());
});
test('User model exists and have a method "find"', () => {
expect(User.find).toBeTruthy();
});
});
});

describe('When we try to add a user (addUser is triggered)', () => {
describe('And user is added (promise is resolved)', () => {
beforeEach(() => {
User.create.mockResolvedValue([]);
});
test('User model exists and have a method "create"', () => {
expect(User.create).toBeTruthy();
});
});
describe('And user is not added (promise is rejected)', () => {
beforeEach(() => {
User.create.mockRejectedValue([]);
});
test('User model exists and have a method "create"', () => {
expect(User.create).toBeTruthy();
});
});
});

describe('When we try to get a single user (getUserById is triggered)', () => {
describe('And the id is found (promise resolved)', () => {
beforeEach(() => {
User.findById.mockResolvedValue([]);
});
test('User model exists and have a method "findById"', () => {
expect(User.findById).toBeTruthy();
});
});
describe('And the id is not found (promise rejected)', () => {
beforeEach(() => {
User.findById.mockRejectedValue([]);
});
test('User model exists and have a method "findById"', () => {
expect(User.findById).toBeTruthy();
});
});
});

describe('When we try to update a user (updateUser is triggered)', () => {
describe('And the document is updated (promise resolved)', () => {
beforeEach(() => {
User.findByIdAndUpdate.mockResolvedValue([]);
});
test('User model exists and have a method "findByIdAndUpdate"', () => {
expect(User.findByIdAndUpdate).toBeTruthy();
});
});
describe('And the document is not updated (promise rejected)', () => {
beforeEach(() => {
User.findByIdAndUpdate.mockRejectedValue([]);
});
test('User model exists and have a method "findByIdAndUpdate"', () => {
expect(User.findByIdAndUpdate).toBeTruthy();
});
});
});

describe('When we try to delete a user (deleteUser is triggered)', () => {
describe('And id exists', () => {
beforeEach(() => {
User.findByIdAndDelete.mockResolvedValue([]);
});
test('User model exists and have a method "findByIdAndDelete"', () => {
expect(User.findByIdAndDelete).toBeTruthy();
});
});
describe('And id does not exist', () => {
beforeEach(() => {
User.findByIdAndDelete.mockResolvedValue([]);
});
test('User model exists and have a method "findByIdAndDelete"', () => {
expect(User.findByIdAndDelete).toBeTruthy();
});
});
});
});
