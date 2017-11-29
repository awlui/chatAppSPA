import React from 'react';
import ReactDOM from 'react-dom';
import {emailVal, usernameVal, passwordVal, notEmptyVal} from './signup';


describe('Email validation', () => {
  it('Email Validation passes valid email', () => {
    expect(emailVal('awlui2014@gmail.com')).toEqual(true);
    
  });
  it('Email validation catches invalid email', () => {
    expect(emailVal('awlui2014')).toEqual(false);
  });
});

describe('Username Validation', () => {
  it('usernameVal returns false if given nonstring', () => {
    expect(usernameVal(22314)).toEqual(false);
    expect(usernameVal('Awlui2014')).toEqual(true);
  }) 
  it('usernameVal returns true for usernames between 6 to 20 characters', () => {
    expect(usernameVal('awlui')).toEqual(false);
    expect(usernameVal('awlui2014')).toEqual(true);
  }) 
});

describe('Password Validation' , () => {
  it(' passwordVal returns false if given nonstring', () => {
    expect(passwordVal(22314)).toEqual(false);
    expect(passwordVal('password')).toEqual(true);
  });
  it('passwordVal returns true for  passwords between 6 to 20 characters', () => {
    expect(passwordVal('pass')).toEqual(false);
    expect(passwordVal('password')).toEqual(true);
  });
});

describe('Not Empty Validation', () => {
  it('notEmptyVal returns false for falsy values', () => {
    expect(notEmptyVal('')).toEqual(false);
    expect(notEmptyVal(0)).toEqual(false);
    expect(notEmptyVal()).toEqual(false);
  });
  it('notEmptyVal returns true for non-falsy values', () => {
    expect(notEmptyVal("Andy")).toEqual(true);
  })
})