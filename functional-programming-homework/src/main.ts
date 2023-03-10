import { Either, fromPromise, ap, right, getOrElse, flatten, left } from './fp/either';
import {  pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser } from './types';
import { fromNullable, none, some } from './fp/maybe';
import { map, sort } from './fp/array';
import { fromCompare, Ordering, revert } from './fp/ord';
import { distance } from './utils';

type Response<R> = Promise<Either<string, R>>
 

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise<string, Array<ClientUser>>(fetchClient().then((v) => {
  return pipe(v, (arr) => map<typeof arr[number], ClientUser>((it) => ({...it, demands: fromNullable(it.demands)}))(arr))
}));

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const ord = fromCompare((first: ClientUser, second: ClientUser) => {
    distance(first.position, second.position)
    return first.position.x === second[sortBy] ? Ordering.equal : first[sortBy] === second[sortBy] ? Ordering.greater : Ordering.less
  })
  
  return right('') 
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
