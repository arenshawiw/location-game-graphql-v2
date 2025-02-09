import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from '../types/DataSourceContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: any; output: any; }
};

export type Challenge = {
  description?: Maybe<Scalars['String']['output']>;
  maxPts?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ChallengeInput = {
  multipleChoice?: InputMaybe<Ch_MultipleChoiceInput>;
  multipleChoiceImage?: InputMaybe<Ch_MultipleChoiceImageInput>;
  numeric?: InputMaybe<Ch_NumericInput>;
  timed?: InputMaybe<Ch_TimedInput>;
  trust?: InputMaybe<Ch_TrustInput>;
  type: ChallengeType;
};

export enum ChallengeType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultipleChoiceImage = 'MULTIPLE_CHOICE_IMAGE',
  NoChallenge = 'NO_CHALLENGE',
  Numeric = 'NUMERIC',
  Timed = 'TIMED',
  Trust = 'TRUST'
}

export type Clue = {
  __typename?: 'Clue';
  clueImageObjectKey: Scalars['String']['output'];
  clueImagePts?: Maybe<Scalars['Int']['output']>;
  clueOne: Scalars['String']['output'];
  clueOnePts: Scalars['Int']['output'];
  clueTwo?: Maybe<Scalars['String']['output']>;
  clueTwoPts: Scalars['Int']['output'];
  signedImageUrl: Scalars['String']['output'];
};

export type CreateLocationInput = {
  challenge: ChallengeInput;
  clueImageObjectKey: Scalars['String']['input'];
  clueImagePts: Scalars['Int']['input'];
  clueOne: Scalars['String']['input'];
  clueOnePts: Scalars['Int']['input'];
  clueTwo: Scalars['String']['input'];
  clueTwoPts: Scalars['Int']['input'];
  colour: LocationColour;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  safetyInformation?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRouteInput = {
  endLocation: Scalars['String']['input'];
  intermediateLocations: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startLocation: Scalars['String']['input'];
};

export type CreateTeamInput = {
  difficulty: Difficulty;
  name: Scalars['String']['input'];
  primaryGroup: Scalars['String']['input'];
  runTimeMinutes: Scalars['Int']['input'];
  secondaryGroup?: InputMaybe<Scalars['String']['input']>;
};

export type CreateThing = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum Difficulty {
  Easy = 'EASY',
  Standard = 'STANDARD'
}

export type FilterLocation = {
  _id?: InputMaybe<Scalars['String']['input']>;
  challengeType?: InputMaybe<ChallengeType>;
  colour?: InputMaybe<LocationColour>;
  nameSearchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<LocationSortOptions>;
  sortDirection?: InputMaybe<Sort>;
};

export type FilterTeamsInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Difficulty>;
  name?: InputMaybe<Scalars['String']['input']>;
  primaryGroupName?: InputMaybe<Scalars['String']['input']>;
  runTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  secondaryGroupName?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<TeamsSortOptions>;
  sortDirection?: InputMaybe<Sort>;
};

export type Game = {
  __typename?: 'Game';
  difficulty: Difficulty;
  routeId?: Maybe<Scalars['ID']['output']>;
  routeName?: Maybe<Scalars['String']['output']>;
  runTimeMinutes: Scalars['Int']['output'];
};

export type GameInput = {
  name: Scalars['String']['input'];
  teams: Array<TeamRouteInput>;
};

export type GameInstance = {
  __typename?: 'GameInstance';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: Status;
  teams: Array<GameTeamRoute>;
};

export type GameTeamRoute = {
  __typename?: 'GameTeamRoute';
  difficulty: Difficulty;
  endLocation: Location;
  endTimeEpochSeconds?: Maybe<Scalars['Int']['output']>;
  intermediateLocations: Array<Location>;
  name: Scalars['String']['output'];
  primaryGroup: Scalars['String']['output'];
  routeId: Scalars['ID']['output'];
  routeName: Scalars['String']['output'];
  runTimeMinutes: Scalars['Int']['output'];
  secondaryGroup?: Maybe<Scalars['String']['output']>;
  startLocation: Location;
  teamId: Scalars['ID']['output'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID']['output'];
  challenge?: Maybe<Challenge>;
  challengeType: ChallengeType;
  clue: Clue;
  colour: LocationColour;
  lat: Scalars['String']['output'];
  lng: Scalars['String']['output'];
  name: Scalars['String']['output'];
  safetyInformation?: Maybe<Scalars['String']['output']>;
};

export enum LocationColour {
  Brown = 'BROWN',
  DarkBlue = 'DARK_BLUE',
  DarkPurple = 'DARK_PURPLE',
  Green = 'GREEN',
  LightBlue = 'LIGHT_BLUE',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export enum LocationSortOptions {
  ChallengeType = 'challengeType',
  ClueOnePts = 'clueOnePts',
  Colour = 'colour',
  Name = 'name'
}

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Scalars['ID']['output'];
  createLocation: Location;
  createRoute: RouteCreateResponse;
  createTeam: Team;
  deleteLocation: Scalars['Boolean']['output'];
  deleteRoute: Scalars['Boolean']['output'];
  deleteTeam: Scalars['Boolean']['output'];
  editGame: Scalars['ID']['output'];
  editLocation: Location;
  editRoute: RouteCreateResponse;
  generateUsers: Scalars['Boolean']['output'];
  updateGameStatus: Scalars['ID']['output'];
  updateTeam: Team;
};


export type MutationCreateGameArgs = {
  input?: InputMaybe<GameInput>;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


export type MutationCreateRouteArgs = {
  input: CreateRouteInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationDeleteLocationArgs = {
  locationId: Scalars['ID']['input'];
};


export type MutationDeleteRouteArgs = {
  routeId: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationEditGameArgs = {
  gameId: Scalars['ID']['input'];
  input?: InputMaybe<GameInput>;
};


export type MutationEditLocationArgs = {
  input: CreateLocationInput;
  locationId: Scalars['ID']['input'];
};


export type MutationEditRouteArgs = {
  input: CreateRouteInput;
  routeId: Scalars['ID']['input'];
};


export type MutationUpdateGameStatusArgs = {
  gameId: Scalars['ID']['input'];
  status: Status;
};


export type MutationUpdateTeamArgs = {
  input: CreateTeamInput;
  teamId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  fetchUploadSignedUrl: Scalars['String']['output'];
  fetchUsers: Array<User>;
  filterTeams: Array<Team>;
  getGames: Array<GameInstance>;
  locationChallengeTypes?: Maybe<Array<Maybe<ChallengeType>>>;
  locationColours?: Maybe<Array<Maybe<LocationColour>>>;
  locations?: Maybe<Array<Maybe<Location>>>;
  primaryGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  routes: Array<Route>;
  secondaryGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
};


export type QueryFetchUploadSignedUrlArgs = {
  filename: Scalars['String']['input'];
};


export type QueryFetchUsersArgs = {
  _id?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFilterTeamsArgs = {
  difficulty?: InputMaybe<Difficulty>;
  id?: InputMaybe<Scalars['String']['input']>;
  primaryGroupName?: InputMaybe<Scalars['String']['input']>;
  runTimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  secondaryGroupName?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<TeamsSortOptions>;
  sortDirection?: InputMaybe<Sort>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
};


export type QueryRoutesArgs = {
  routeId?: InputMaybe<Scalars['ID']['input']>;
  routeName?: InputMaybe<Scalars['String']['input']>;
};

export type Route = {
  __typename?: 'Route';
  _id: Scalars['ID']['output'];
  endLocation: Location;
  intermediateLocations: Array<Location>;
  name: Scalars['String']['output'];
  startLocation: Location;
};

export type RouteCreateResponse = {
  __typename?: 'RouteCreateResponse';
  _id: Scalars['ID']['output'];
  endLocation: Scalars['ID']['output'];
  intermediateLocations: Array<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  startLocation: Scalars['ID']['output'];
};

export enum SomeEnum {
  One = 'one',
  Three = 'three',
  Two = 'two'
}

export type SomeType = {
  __typename?: 'SomeType';
  enumStuff?: Maybe<SomeEnum>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Status {
  Ended = 'ENDED',
  Hidden = 'HIDDEN',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type Team = {
  __typename?: 'Team';
  _id: Scalars['ID']['output'];
  game?: Maybe<Game>;
  name?: Maybe<Scalars['String']['output']>;
  primaryGroup?: Maybe<Scalars['String']['output']>;
  secondaryGroup?: Maybe<Scalars['String']['output']>;
};

export type TeamRouteInput = {
  routeId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export enum TeamsSortOptions {
  Difficulty = 'difficulty',
  Name = 'name',
  PrimaryGroup = 'primaryGroup',
  RunTimeMinutes = 'runTimeMinutes',
  SecondaryGroup = 'secondaryGroup'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  teamId?: Maybe<Scalars['ID']['output']>;
  teamName?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Ch_MultipleChoice = Challenge & {
  __typename?: 'ch_MultipleChoice';
  answer: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  maxPts?: Maybe<Scalars['Int']['output']>;
  options: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Ch_MultipleChoiceImage = Challenge & {
  __typename?: 'ch_MultipleChoiceImage';
  answer: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  imageObjectKey: Scalars['String']['output'];
  maxPts?: Maybe<Scalars['Int']['output']>;
  options: Array<Scalars['String']['output']>;
  signedUrl: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Ch_MultipleChoiceImageInput = {
  answer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageObjectKey: Scalars['String']['input'];
  maxPts: Scalars['Int']['input'];
  options: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Ch_MultipleChoiceInput = {
  answer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  maxPts: Scalars['Int']['input'];
  options: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Ch_Numeric = Challenge & {
  __typename?: 'ch_Numeric';
  description?: Maybe<Scalars['String']['output']>;
  maxPts?: Maybe<Scalars['Int']['output']>;
  numericAnswer: Scalars['Int']['output'];
  tenPercentPts: Scalars['Int']['output'];
  thirtyPercentPts: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  twentyPercentPts: Scalars['Int']['output'];
};

export type Ch_NumericInput = {
  description: Scalars['String']['input'];
  maxPts: Scalars['Int']['input'];
  numericAnswer: Scalars['Int']['input'];
  tenPercentPts: Scalars['Int']['input'];
  thirtyPercentPts: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  twentyPercentPts: Scalars['Int']['input'];
};

export type Ch_Timed = Challenge & {
  __typename?: 'ch_Timed';
  description?: Maybe<Scalars['String']['output']>;
  maxPts?: Maybe<Scalars['Int']['output']>;
  minutes: Scalars['Int']['output'];
  seconds: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Ch_TimedInput = {
  description: Scalars['String']['input'];
  maxPts: Scalars['Int']['input'];
  minutes: Scalars['Int']['input'];
  seconds: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Ch_Trust = Challenge & {
  __typename?: 'ch_Trust';
  description?: Maybe<Scalars['String']['output']>;
  maxPts?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Ch_TrustInput = {
  description: Scalars['String']['input'];
  maxPts: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Challenge: ( Ch_MultipleChoice ) | ( Ch_MultipleChoiceImage ) | ( Ch_Numeric ) | ( Ch_Timed ) | ( Ch_Trust );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Challenge: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Challenge']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ChallengeInput: ChallengeInput;
  ChallengeType: ChallengeType;
  Clue: ResolverTypeWrapper<Clue>;
  CreateLocationInput: CreateLocationInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  CreateRouteInput: CreateRouteInput;
  CreateTeamInput: CreateTeamInput;
  CreateThing: CreateThing;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Difficulty: Difficulty;
  FilterLocation: FilterLocation;
  FilterTeamsInput: FilterTeamsInput;
  Game: ResolverTypeWrapper<Game>;
  GameInput: GameInput;
  GameInstance: ResolverTypeWrapper<Omit<GameInstance, 'teams'> & { teams: Array<ResolversTypes['GameTeamRoute']> }>;
  GameTeamRoute: ResolverTypeWrapper<Omit<GameTeamRoute, 'endLocation' | 'intermediateLocations' | 'startLocation'> & { endLocation: ResolversTypes['Location'], intermediateLocations: Array<ResolversTypes['Location']>, startLocation: ResolversTypes['Location'] }>;
  Location: ResolverTypeWrapper<Omit<Location, 'challenge'> & { challenge?: Maybe<ResolversTypes['Challenge']> }>;
  LocationColour: LocationColour;
  LocationSortOptions: LocationSortOptions;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Route: ResolverTypeWrapper<Omit<Route, 'endLocation' | 'intermediateLocations' | 'startLocation'> & { endLocation: ResolversTypes['Location'], intermediateLocations: Array<ResolversTypes['Location']>, startLocation: ResolversTypes['Location'] }>;
  RouteCreateResponse: ResolverTypeWrapper<RouteCreateResponse>;
  SomeEnum: SomeEnum;
  SomeType: ResolverTypeWrapper<SomeType>;
  Sort: Sort;
  Status: Status;
  Team: ResolverTypeWrapper<Team>;
  TeamRouteInput: TeamRouteInput;
  TeamsSortOptions: TeamsSortOptions;
  User: ResolverTypeWrapper<User>;
  ch_MultipleChoice: ResolverTypeWrapper<Ch_MultipleChoice>;
  ch_MultipleChoiceImage: ResolverTypeWrapper<Ch_MultipleChoiceImage>;
  ch_MultipleChoiceImageInput: Ch_MultipleChoiceImageInput;
  ch_MultipleChoiceInput: Ch_MultipleChoiceInput;
  ch_Numeric: ResolverTypeWrapper<Ch_Numeric>;
  ch_NumericInput: Ch_NumericInput;
  ch_Timed: ResolverTypeWrapper<Ch_Timed>;
  ch_TimedInput: Ch_TimedInput;
  ch_Trust: ResolverTypeWrapper<Ch_Trust>;
  ch_TrustInput: Ch_TrustInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Challenge: ResolversInterfaceTypes<ResolversParentTypes>['Challenge'];
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  ChallengeInput: ChallengeInput;
  Clue: Clue;
  CreateLocationInput: CreateLocationInput;
  Float: Scalars['Float']['output'];
  CreateRouteInput: CreateRouteInput;
  CreateTeamInput: CreateTeamInput;
  CreateThing: CreateThing;
  ID: Scalars['ID']['output'];
  FilterLocation: FilterLocation;
  FilterTeamsInput: FilterTeamsInput;
  Game: Game;
  GameInput: GameInput;
  GameInstance: Omit<GameInstance, 'teams'> & { teams: Array<ResolversParentTypes['GameTeamRoute']> };
  GameTeamRoute: Omit<GameTeamRoute, 'endLocation' | 'intermediateLocations' | 'startLocation'> & { endLocation: ResolversParentTypes['Location'], intermediateLocations: Array<ResolversParentTypes['Location']>, startLocation: ResolversParentTypes['Location'] };
  Location: Omit<Location, 'challenge'> & { challenge?: Maybe<ResolversParentTypes['Challenge']> };
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  Query: {};
  Route: Omit<Route, 'endLocation' | 'intermediateLocations' | 'startLocation'> & { endLocation: ResolversParentTypes['Location'], intermediateLocations: Array<ResolversParentTypes['Location']>, startLocation: ResolversParentTypes['Location'] };
  RouteCreateResponse: RouteCreateResponse;
  SomeType: SomeType;
  Team: Team;
  TeamRouteInput: TeamRouteInput;
  User: User;
  ch_MultipleChoice: Ch_MultipleChoice;
  ch_MultipleChoiceImage: Ch_MultipleChoiceImage;
  ch_MultipleChoiceImageInput: Ch_MultipleChoiceImageInput;
  ch_MultipleChoiceInput: Ch_MultipleChoiceInput;
  ch_Numeric: Ch_Numeric;
  ch_NumericInput: Ch_NumericInput;
  ch_Timed: Ch_Timed;
  ch_TimedInput: Ch_TimedInput;
  ch_Trust: Ch_Trust;
  ch_TrustInput: Ch_TrustInput;
}>;

export type ChallengeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ch_MultipleChoice' | 'ch_MultipleChoiceImage' | 'ch_Numeric' | 'ch_Timed' | 'ch_Trust', ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ClueResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Clue'] = ResolversParentTypes['Clue']> = ResolversObject<{
  clueImageObjectKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clueImagePts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clueOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clueOnePts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  clueTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clueTwoPts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signedImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
  routeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  routeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runTimeMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameInstanceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GameInstance'] = ResolversParentTypes['GameInstance']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['GameTeamRoute']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameTeamRouteResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GameTeamRoute'] = ResolversParentTypes['GameTeamRoute']> = ResolversObject<{
  difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
  endLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  endTimeEpochSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  intermediateLocations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primaryGroup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  routeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  routeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runTimeMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  secondaryGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['Challenge']>, ParentType, ContextType>;
  challengeType?: Resolver<ResolversTypes['ChallengeType'], ParentType, ContextType>;
  clue?: Resolver<ResolversTypes['Clue'], ParentType, ContextType>;
  colour?: Resolver<ResolversTypes['LocationColour'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  safetyInformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createGame?: Resolver<ResolversTypes['ID'], ParentType, ContextType, Partial<MutationCreateGameArgs>>;
  createLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType, RequireFields<MutationCreateLocationArgs, 'input'>>;
  createRoute?: Resolver<ResolversTypes['RouteCreateResponse'], ParentType, ContextType, RequireFields<MutationCreateRouteArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  deleteLocation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLocationArgs, 'locationId'>>;
  deleteRoute?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRouteArgs, 'routeId'>>;
  deleteTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'teamId'>>;
  editGame?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationEditGameArgs, 'gameId'>>;
  editLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType, RequireFields<MutationEditLocationArgs, 'input' | 'locationId'>>;
  editRoute?: Resolver<ResolversTypes['RouteCreateResponse'], ParentType, ContextType, RequireFields<MutationEditRouteArgs, 'input' | 'routeId'>>;
  generateUsers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateGameStatus?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUpdateGameStatusArgs, 'gameId' | 'status'>>;
  updateTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'input' | 'teamId'>>;
}>;

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  fetchUploadSignedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryFetchUploadSignedUrlArgs, 'filename'>>;
  fetchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryFetchUsersArgs>>;
  filterTeams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType, Partial<QueryFilterTeamsArgs>>;
  getGames?: Resolver<Array<ResolversTypes['GameInstance']>, ParentType, ContextType>;
  locationChallengeTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChallengeType']>>>, ParentType, ContextType>;
  locationColours?: Resolver<Maybe<Array<Maybe<ResolversTypes['LocationColour']>>>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType, Partial<QueryLocationsArgs>>;
  primaryGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  routes?: Resolver<Array<ResolversTypes['Route']>, ParentType, ContextType, Partial<QueryRoutesArgs>>;
  secondaryGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
}>;

export type RouteResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Route'] = ResolversParentTypes['Route']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  intermediateLocations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RouteCreateResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['RouteCreateResponse'] = ResolversParentTypes['RouteCreateResponse']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endLocation?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  intermediateLocations?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startLocation?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SomeTypeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SomeType'] = ResolversParentTypes['SomeType']> = ResolversObject<{
  enumStuff?: Resolver<Maybe<ResolversTypes['SomeEnum']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeamResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondaryGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  teamName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Ch_MultipleChoiceResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ch_MultipleChoice'] = ResolversParentTypes['ch_MultipleChoice']> = ResolversObject<{
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Ch_MultipleChoiceImageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ch_MultipleChoiceImage'] = ResolversParentTypes['ch_MultipleChoiceImage']> = ResolversObject<{
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageObjectKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  signedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Ch_NumericResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ch_Numeric'] = ResolversParentTypes['ch_Numeric']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numericAnswer?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tenPercentPts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thirtyPercentPts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twentyPercentPts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Ch_TimedResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ch_Timed'] = ResolversParentTypes['ch_Timed']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Ch_TrustResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ch_Trust'] = ResolversParentTypes['ch_Trust']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  Challenge?: ChallengeResolvers<ContextType>;
  Clue?: ClueResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  GameInstance?: GameInstanceResolvers<ContextType>;
  GameTeamRoute?: GameTeamRouteResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Route?: RouteResolvers<ContextType>;
  RouteCreateResponse?: RouteCreateResponseResolvers<ContextType>;
  SomeType?: SomeTypeResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ch_MultipleChoice?: Ch_MultipleChoiceResolvers<ContextType>;
  ch_MultipleChoiceImage?: Ch_MultipleChoiceImageResolvers<ContextType>;
  ch_Numeric?: Ch_NumericResolvers<ContextType>;
  ch_Timed?: Ch_TimedResolvers<ContextType>;
  ch_Trust?: Ch_TrustResolvers<ContextType>;
}>;

