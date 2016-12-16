import Rx from 'rx';

export const queueSubject = new Rx.ReplaySubject(1);
export const scheduleSubject = new Rx.ReplaySubject(1);