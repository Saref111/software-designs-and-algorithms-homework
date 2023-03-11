import { Either, fromPromise, ap, right, flatten, left, getOrElse } from './fp/either';
import {  flow, matcher, pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser, Demand } from './types';
import { fromNullable, isNone, isSome, none, some, getOrElse as getOrElseMaybe } from './fp/maybe';
import { map, sort } from './fp/array';
import { fromCompare, Ordering, ordNumber, revert } from './fp/ord';
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
  const rewardPred = (x: ClientUser, y: ClientUser) => x.reward === y.reward ? Ordering.equal 
                                                    :  x.reward < y.reward ? Ordering.greater : Ordering.less
  const distancePred = (x: ClientUser, y: ClientUser) => distance(x.position, executor.position) === distance(y.position, executor.position) ? Ordering.equal 
                                                    : distance(x.position, executor.position) > distance(y.position, executor.position) ? Ordering.greater : Ordering.less;
  const predicate = sortBy === SortBy.reward ? rewardPred : distancePred                            
  const ordClient = fromCompare(predicate)
  const sortedClients = sort(ordClient)(clients);
  
  const filtered = sortedClients.filter((c: ClientUser) => 
    isNone(c.demands) || getOrElseMaybe(() => [])(c.demands).some(
      (v: Demand) => executor.possibilities.some((vp) => v === vp)
    ) 
  )

const meetMatcher = matcher(
  [(l: number) => !l, () => 'cannot meet the demands of any client!'],
                [(l: number) => l === sortedClients.length, () => 'meets all demands of all clients!'],
                [(l: number) => l < sortedClients.length, (l) => `meets the demands of only ${l} out of ${sortedClients.length} clients`]
)

const sortByMatcher = matcher(
  [(s: SortBy) => s === SortBy.reward, (s) => 'highest reward'],
                [(s: SortBy) => s === SortBy.distance, (s) => 'distance to executor'],
)

return pipe(
  'This executor ', 
  (str) => str + meetMatcher(filtered.length),
  (str) => str + (filtered.length ? '\n\nAvailable clients sorted by ' + sortByMatcher(sortBy) + ':\n' : ''),
  (str) => str + map((el: ClientUser) => `name: ${el.name}, distance: ${distance(el.position, executor.position)}, reward: ${el.reward}`)(filtered).join('\n'),
    (str) => filtered.length ? right(str) : left(str)
  )
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
