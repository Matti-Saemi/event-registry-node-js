import { QueryItems, CombinedQuery, BaseQuery, ReturnInfo, QueryArticles, RequestArticles, RequestEvents } from "./index";

export module ER {

    export interface Config {
        /**
         * API key that should be used to make the requests to the Event Registry.
         * API key is assigned to each user account and can be obtained on this page:
         * http://eventregistry.org/me?tab=settings
         */
        apiKey?: string;
        /**
         *  Host to use to access the Event Registry backend
         */
        host?: string;
        /**
         * log all requests
         */
        logging?: boolean;
        /**
         * The minimum number of seconds between individual api calls
         */
        minDelayBetweenRequests?: number;
        /**
         * if a request fails (for example, because ER is down),
         * what is the max number of times the request should be repeated
         */
        repeatFailedRequestCount?: number;
        /**
         * if true, additional info about query times etc will be printed to console
         */
        verboseOutput?: boolean;
        settingsFName?: string;
    }    

    export type ConceptType = "person" | "loc" | "org" | "wiki" | "entities" | "concepts"  | "conceptClass" | "conceptFolder";
    
    export type SourceType = "place" | "country";
    
    export type ConceptClassType = "dbpedia" | "custom";

    export interface SuggestConceptsArguments {
        /**
         * What types of concepts should be returned
         */
        sources?: ER.ConceptType[];
        /**
         * Language in which the prefix is specified
         */
        lang?: string;
        /**
         * Languages in which the label(s) for the concepts are to be returned
         */
        conceptLang?: string;
        /**
         * Page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * Number of returned suggestions per page
         */
        count?: number;
        /**
         * What details about concepts should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface SuggestCategoriesArguments {
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned suggestions
         */
        count?: number;
        /**
         * what details about categories should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface SuggestNewsSourcesArguments {
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned suggestions
         */
        count?: number;
    }
    
    export interface SuggestSourceGroupsArguments {
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned suggestions
         */
        count?: number;
    }
    
    export interface SuggestLocationsArguments {
        /**
         * What types of locations are we interested in.
         */
        sources?: ER.SourceType[];
        /**
         * Language in which the prefix is specified
         */
        lang?: string;
        /**
         * Number of returned suggestions
         */
        count?: number;
        /**
         * If provided, then return only those locations that are inside the specified country
         */
        countryUri?: string;
        /**
         * If provided, then return the locations sorted by the distance to the (lat, long) provided in the tuple
         */
        sortByDistanceTo?: number[];
        /**
         * What details about locations should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface SuggestLocationsAtCoordinateArguments {
        /**
         * Limit the set of results only to cities (true) or also to general places (false)
         */
        limitToCities?: boolean;
        /**
         * Language in which the location label should be returned
         */
        lang?: string;
        /**
         * Number of returned suggestions
         */
        count?: number;
        /**
         * Ignore locations that don't have a wiki page and can not be used for concept search
         */
        ignoreNonWiki?: boolean;
        /**
         * What details about locations should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface SuggestSourcesAtPlaceArguments {
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned sources
         */
        count?: number;
    }
    
    export interface SuggestConceptClassesArguments {
        /**
         * language in which the prefix is specified
         */
        lang?: string;
        /**
         * languages in which the label(s) for the concepts are to be returned
         */
        conceptLang?: string;
        /**
         * what types of concepts classes should be returned.
         */
        source?: ER.ConceptClassType[];
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned suggestions
         */
        count?: number;
        /**
         * what details about categories should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface SuggestCustomConceptsArguments {
        /**
         * language in which the prefix is specified
         */
        lang?: string;
        /**
         * languages in which the label(s) for the concepts are to be returned
         */
        conceptLang?: string;
        /**
         * page of the results (1, 2, ...)
         */
        page?: number;
        /**
         * number of returned suggestions
         */
        count?: number;
        /**
         * what details about categories should be included in the returned information
         */
        returnInfo?: ReturnInfo;
    }
    
    export interface GetConceptUriArguments {
        /**
         * language in which the prefix is specified
         */
        lang?: string;
        /**
         * what types of concepts should be returned.
         */
        sources?: ER.ConceptType[];
    }
    
    export interface GetLocationUriArguments {
        /**
         * language in which the prefix is specified
         */
        lang?: string;
        /**
         * what types of locations are we interested in.
         */
        sources?: ER.SourceType[];
        /**
         * if set, then filter the possible locations to the locations from that country
         */
        countryUri?: string;
        /**
         * sort candidates by distance to the given (lat, long) pair
         */
        sortByDistanceTo?: number[];
    }
    
    export interface GetStatsArguments {
        addDailyArticles?: boolean;
        addDailyAnnArticles?: boolean;
        addDailyDuplArticles?: boolean;
        addDailyEvents?: boolean;
    }

    export namespace Correlations {
        export interface TopConceptArguments {
            /**
             * An instance of QueryArticles that can be used to limit the space of concept candidates
             */
            candidateConceptsQuery?: QueryArticles;
            /**
             * If candidateConceptsQuery is provided, then this number of concepts for each valid type will be return as candidates
             */
            candidatesPerType?: number;
            /**
             *  A string or an array containing the concept types that are valid candidates on which to compute top correlations
             *     valid values are "person", "org", "loc" and/or "wiki"
             */
            conceptType?: string | string[];
            /**
             * the number of returned concepts for which the exact value of the correlation is computed
             */
            exactCount?: number;
            /**
             * the number of returned concepts for which only an approximate value of the correlation is computed
             */
            approxCount?: number;
            /**
             * specifies the details about the concepts that should be returned in the output result
             */
            returnInfo?: ReturnInfo;
        }
        
        export interface TopCategoryArguments {
            /**
             * the number of returned categories for which the exact value of the correlation is computed
             */
            exactCount?: number;
            /**
             * the number of returned categories for which only an approximate value of the correlation is computed
             */
            approxCount?: number;
            /**
             * specifies the details about the categories that should be returned in the output result
             */
            returnInfo?: ReturnInfo;
        }
    }

    export namespace Counts {
        export interface Arguments {
            /**
             * input source information from which to compute top trends.
             */
            source?: "news" | "social" | "custom" | "geo" | "sentiment";
            /**
             * What do the uris represent?
             */
            type?: "concept" | "category";
            /**
             * Starting date from which to provide counts onwards (format: YYYY-MM-DD).
             */
            startDate?: string | Date;
            /**
             * Ending date until which to provide counts (format: YYYY-MM-DD).
             */
            endDate?: string;
            /**
             * What details should be included in the returned information.
             */
            returnInfo?: ReturnInfo;
        }
    }

    export namespace DailyShares {
        export interface Arguments {
            /**
             * Specify the date for which to return top shared articles. If undefined then today is used.
             */
            date?: string;
            /**
             * Number of top shared articles to return
             */
            count?: number;
            /**
             * Specifies the details that should be returned in the output result
             */
            returnInfo?: ReturnInfo;
        }
    }

    export namespace Info {
        export interface GetSourceInfoArguments {
            /**
             * single source uri or a list of source uris for which to return information
             */
            uriOrUriList?: string | string[];
            /**
             * what details about the source should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
        
        export interface GetConceptInfoArguments {
            /**
             * single concept uri or a list of concept uris for which to return information
             */
            uriOrUriList?: string | string[];
            /**
             * what details about the source should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
        
        export interface  GetCategoryInfoArguments {
            /**
             * single category uri or a list of category uris for which to return information
             */
            uriOrUriList?: string | string[];
            /**
             * what details about the source should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
    }

    export namespace Query {
        export interface BaseQueryArguments {
            /**
             * Keyword(s) to query. Either undefined, string or QueryItems.
             */
            keyword?: string | QueryItems;
            /**
             * Concept(s) to query. Either undefined, string or QueryItems.
             */
            conceptUri?: string | QueryItems;
            /**
             * Source(s) to query. Either undefined, string or QueryItems.
             */
            sourceUri?: string | QueryItems;
            /**
             * Location(s) to query. Either undefined, string or QueryItems.
             */
            locationUri?: string | QueryItems;
            /**
             * CategoryUri categories to query. Either undefined, string or QueryItems.
             */
            categoryUri?: string | QueryItems;
            /**
             * Language(s) to query. Either undefined, string or QueryItems.
             */
            lang?: string | QueryItems;
            /**
             * Starting date. Either undefined, string or date.
             */
            dateStart?: string | Date;
            /**
             * Ending date. Either undefined, string or date.
             */
            dateEnd?: string | Date;
            /**
             * Search by mentioned dates - Either undefined, string or date or a list of these types.
             */
            dateMention?: string | string[];
            /**
             * Find content generated by news sources at the specified geographic location - can be a city URI or a country URI. Multiple items can be provided using a list.
             */
            sourceLocationUri?: string | string[];
            /**
             * A single or multiple source group URIs. A source group is a group of news sources, commonly defined based on common topic or importance.
             */
            sourceGroupUri?: string | string[];
            /**
             * Should we include the subcategories of the searched categories?
             */
            categoryIncludeSub?: boolean;
            /**
             * Where should we look when searching using the keywords provided by "keyword" parameter. "body" (default), "title", or "body,title".
             */
            keywordLoc?: "body" | "title" | "body,title";
            /**
             * A tuple containing the minimum and maximum number of articles that should be in the resulting events. Parameter relevant only if querying events.
             */
            minMaxArticlesInEvent?: [number, number];
            /**
             * A instance of BaseQuery, CombinedQuery or undefined. Used to filter out results matching the other criteria specified in this query.
             */
            exclude?: BaseQuery | CombinedQuery;
        }
        
        export interface ComplexArticleQueryArguments {
            /**
             * Some articles can be duplicates of other articles. What should be done with them.
             * Possible values are:
             *  - "skipDuplicates" (skip the resulting articles that are duplicates of other articles)
             *  - "keepOnlyDuplicates" (return only the duplicate articles)
             *  - "keepAll" (no filtering, default)
             */
            isDuplicateFilter?: "skipDuplicates" | "keepOnlyDuplicates" | "keepAll";
            /**
             * some articles are later copied by others. What should be done with such articles.
             * Possible values are:
             *  - "skipHasDuplicates" (skip the resulting articles that have been later copied by others)
             *  - "keepOnlyHasDuplicates" (return only the articles that have been later copied by others)
             *  - "keepAll" (no filtering, default)
             */
            hasDuplicateFilter?: "skipDuplicates" | "keepOnlyDuplicates" | "keepAll";
            /**
             * Some articles describe a known event and some don't. This filter allows you to filter the resulting articles based on this criteria.
             * Possible values are:
             *  - "skipArticlesWithoutEvent" (skip articles that are not describing any known event in ER)
             *  - "keepOnlyArticlesWithoutEvent" (return only the articles that are not describing any known event in ER)
             *  - "keepAll" (no filtering, default)
             */
            eventFilter?: "skipArticlesWithoutEvent" | "keepOnlyArticlesWithoutEvent" | "keepAll";
        }
    }

    export namespace QueryArticle {
        export interface RequestArticleSimilarArticlesArguments {
            /**
             * page of the articles
             */
            page?: number;
            /**
             * number of articles to return (at most 200)
             */
            count?: number;
            /**
             * in which language(s) should be the similar articles
             */
            lang?: string[];
            /**
             * max number of articles per language to return (-1 for no limit)
             */
            limitPerLang?: number;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestArticleDuplicatedArticlesArguments {
            /**
             * page of the articles
             */
            page?: number;
            /**
             * number of articles to return (at most 200)
             */
            count?: number;
            /**
             * how are the articles sorted.
             */
            sortBy?: "id" | "date" | "cosSim" | "fq" | "socialScore" | "facebookShares" | "twitterShares";
            /**
             * should the results be sorted in ascending order (true) or descending (false)
             */
            sortByAsc?: boolean;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
    }

    export namespace QueryArticles {
        interface Arguments {
            keywords?: string | string[] | QueryItems;
            conceptUri?: string | string[] | QueryItems;
            categoryUri?: string | string[] | QueryItems;
            sourceUri?: string | string[] | QueryItems;
            sourceLocationUri?: string | string[] | QueryItems;
            sourceGroupUri?: string | string[] | QueryItems;
            locationUri?: string | string[] | QueryItems;
            lang?: string | string[];
            dateStart?: string | Date;
            dateEnd?: string | Date;
            dateMentionStart?: string | Date;
            dateMentionEnd?: string | Date;
            ignoreKeywords?: string | string[] | QueryItems;
            ignoreConceptUri?: string | string[] | QueryItems;
            ignoreCategoryUri?: string | string[] | QueryItems;
            ignoreSourceUri?: string | string[] | QueryItems;
            ignoreSourceLocationUri?: string | string[] | QueryItems;
            ignoreSourceGroupUri?: string | string[] | QueryItems;
            ignoreLocationUri?: string | string[] | QueryItems;
            ignoreLang?: string | string[] | QueryItems;
            keywordsLoc?: "body" | "title" | "body,title";
            ignoreKeywordsLoc?: "body" | "title" | "body,title";
            categoryIncludeSub?: boolean;
            ignoreCategoryIncludeSub?: boolean;
            isDuplicateFilter?: "skipDuplicates" | "keepOnlyDuplicates" | "keepAll";
            hasDuplicateFilter?: "skipHasDuplicates" | "keepOnlyHasDuplicates" | "keepAll";
            eventFilter?: "skipArticlesWithoutEvent" | "keepOnlyArticlesWithoutEvent" | "keepAll";
            requestedResult?: RequestArticles;
        }
    }

    export namespace QueryEvent {

        /**
         * Sorting options: 
         *  - undefined (no specific sorting), 
         *  - id (internal id), date (published date), 
         *  - cosSim (closeness to event centroid), 
         *  - sourceImportance (manually curated score of source importance - high value, 
         *  - high importance), sourceImportanceRank (reverse of sourceImportance), 
         *  - sourceAlexaGlobalRank (global rank of the news source), 
         *  - sourceAlexaCountryRank (country rank of the news source), 
         *  - socialScore (total shares on social media), 
         *  - facebookShares (shares on Facebook only)
         */
        export type SortByOptions = "id" | "date" | "cosSim" | "sourceImportance" | "sourceImportanceRank" | "sourceAlexaGlobalRank" | "sourceAlexaCountryRank" | "socialScore" | "facebookShares";

        export interface IteratorArguments {
            /**
             * Array or a single language in which to return the list of matching articles
             */
            lang?: string | string[];
            /**
             * Order in which event articles are sorted.
             */
            sortBy?: SortByOptions;
            /**
             * Should the results be sorted in ascending order (True) or descending (False)
             */
            sortByAsc?: boolean;
            /**
             * What details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
            /**
             * Number of articles to download at once (we are not downloading article by article) (at most 200)
             */
            articleBatchSize?: number;
            /**
             * Maximum number of items to be returned. Used to stop iteration sooner than results run out
             */
            maxItems?: number;
        }

        export interface RequestEventArticlesArguments {
            /**
             * page of the articles to return (1, 2, ...)
             */
            page?: number;
            /**
             * number of articles to return per page (at most 200)
             */
            count?: number;
            /**
             * a single language or an array of languages in which to return the articles
             */
            lang?: string | string[];
            /**
             * order in which event articles are sorted.
             */
            sortBy?: SortByOptions;
            /**
             * should the articles be sorted in ascending order (True) or descending (False) based on sortBy value
             */
            sortByAsc?: boolean;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventArticleUrisArguments {
            /**
             * a single language or an array of languages in which to return the articles
             */
            lang?: string | string[];
            /**
             * order in which event articles are sorted.
             */
            sortBy?: SortByOptions;
            /**
             * should the articles be sorted in ascending order (True) or descending (False) based on sortBy value
             */
            sortByAsc?: boolean;
        }

        export interface RequestEventArticleTrendArguments {
            /**
             * languages for which to compute the trends
             */
            lang?: string | string[];
            /**
             * page of the articles for which to return information (1, 2, ...)
             */
            page?: number;
            /**
             * number of articles returned per page (at most 200)
             */
            count?: number;
            /**
             * ignore articles that have cos similarity to centroid lower than the specified value (-1 for no limit)
             */
            minArticleCosSim?: number;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventSimilarEventsArguments {
            /**
             * number of similar events to return (at most 200)
             */
            count?: number;
            /**
             * find only those events that are at most maxDayDiff days apart from the tested event
             */
            maxDayDiff?: number;
            /**
             * for the returned events compute how they were trending (intensity of reporting) in different time periods
             */
            addArticleTrendInfo?: boolean;
            /**
             * time span that is used as a unit when computing the trending info
             */
            aggrHours?: number;
            /**
             * include also the tested event in the results (True or False)
             */
            includeSelf?: boolean;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
        export interface RequestEventSimilarStoriesArguments {
            /**
             * number of similar stories to return (at most 200)
             */
            count?: number;
            /**
             * show is the similarity with other stories computed.
             */
            source?: "concept" | "cca";
            /**
             * in what language(s) should be the returned stories
             */
            lang?: string | string[];
            /**
             * maximum difference in days between the returned stories and the tested event
             */
            maxDayDiff?: number;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
    }
    export namespace QueryEvents {
        export interface Arguments {
            /**
             * find events where articles mention all the specified keywords.
             * A single keyword/phrase can be provided as a string, 
             * multiple keywords/phrases can be provided as a list of strings.
             * Use QueryItems.AND() if *all* provided keywords/phrases should be mentioned, 
             * or QueryItems.OR() if *any* of the keywords/phrases should be mentioned.
             */
            keywords?: string | string[] | QueryItems;
            /**
             *  find events where the concept with concept uri is important.
             * A single concept uri can be provided as a string, multiple concept uris 
             * can be provided as a list of strings.
             * Use QueryItems.AND() if *all* provided concepts should be mentioned, or QueryItems.OR() 
             * if *any* of the concepts should be mentioned.
             * To obtain a concept uri using a concept label use EventRegistry.getConceptUri().
             */
            conceptUri?: string | string[] | QueryItems;
            /**
             * find events that are assigned into a particular category.
             * A single category uri can be provided as a string, multiple category uris 
             * can be provided as a list of strings.
             * Use QueryItems.AND() if *all* provided categories should be mentioned, or QueryItems.OR() 
             * if *any* of the categories should be mentioned.
             * A category uri can be obtained from a category name using EventRegistry.getCategoryUri().
             */
            categoryUri?: string | string[] | QueryItems;
            /**
             * find events that contain one or more articles that have been written by a news source sourceUri.
             * If multiple sources should be considered use QueryItems.OR() to provide the list of sources.
             * Source uri for a given news source name can be obtained using EventRegistry.getNewsSourceUri().
             */
            sourceUri?: string | string[] | QueryItems;
            /**
             * find events that contain one or more articles that were written 
             * by news sources located in the given geographic location.
             * If multiple source locations are provided, then put them into a list inside QueryItems.OR()
             * Location uri can either be a city or a country. 
             * Location uri for a given name can be obtained using EventRegistry.getLocationUri().
             */
            sourceLocationUri?: string | string[] | QueryItems;
            /**
             * find events that contain one or more articles that were written 
             * by news sources that are assigned to the specified source group.
             * If multiple source groups are provided, then put them into a list inside QueryItems.OR()
             * Source group uri for a given name can be obtained using EventRegistry.getSourceGroupUri().
             */
            sourceGroupUri?: string | string[] | QueryItems;
            /**
             * find events that occurred at a particular location.
             * If value can be a string or a list of strings provided in QueryItems.OR().
             * Location uri can either be a city or a country. 
             * Location uri for a given name can be obtained using EventRegistry.getLocationUri().
             */
            locationUri?: string | string[] | QueryItems;
            /**
             * find events for which we found articles in the specified language.
             * If more than one language is specified, resulting events has to be reported in *any* of the languages.
             */
            lang?: string | string[];
            /**
             * find events that occurred on or after dateStart. Date should be provided in YYYY-MM-DD format.
             */
            dateStart?: string | Date;
            /**
             * find events that occurred before or on dateEnd. Date should be provided in YYYY-MM-DD format.
             */
            dateEnd?: string | Date;
            /**
             * find events that have been reported in at least minArticlesInEvent articles (regardless of language)
             */
            minArticlesInEvent?: number;
            /**
             * find events that have not been reported in more than maxArticlesInEvent articles (regardless of language)
             */
            maxArticlesInEvent?: number;
            /**
             * find events where articles explicitly mention a date that is equal or greater than dateMentionStart.
             */
            dateMentionStart?: string | Date;
            /**
             * find events where articles explicitly mention a date that is lower or equal to dateMentionEnd.
             */
            dateMentionEnd?: string | Date;
            /**
             * ignore events where articles about the event mention any of the provided keywords
             */
            ignoreKeywords?: string | string[] | QueryItems;
            /**
             * ignore events that are about any of the provided concepts
             */
            ignoreConceptUri?: string | string[] | QueryItems;
            /**
             * ignore events that are about any of the provided categories
             */
            ignoreCategoryUri?: string | string[] | QueryItems;
            /**
             * ignore events that have have articles which have been written by any of the specified news sources
             */
            ignoreSourceUri?: string | string[] | QueryItems;
            /**
             * ignore events that have articles which been written by sources located at *any* of the specified locations
             */
            ignoreSourceLocationUri?: string | string[] | QueryItems;
            /**
             * ignore events that have articles which have been written by sources in *any* of the specified source groups
             */
            ignoreSourceGroupUri?: string | string[] | QueryItems;
            /**
             * ignore events that occurred in any of the provided locations. A location can be a city or a place
             */
            ignoreLocationUri?: string | string[] | QueryItems;
            /**
             * ignore events that are reported in any of the provided languages
             */
            ignoreLang?: string | string[];
            /**
             * what data should be used when searching using the keywords provided by "keywords" parameter.
             */
            keywordsLoc?: "body" | "title" | "body,title";
            /**
             *  what data should be used when searching using the keywords provided by "ignoreKeywords" parameter.
             */
            ignoreKeywordsLoc?: "body" | "title" | "body,title";
            /**
             * when a category is specified using categoryUri, should also all subcategories be included?
             */
            categoryIncludeSub?: boolean;
            /**
             * when a category is specified using ignoreCategoryUri, should also all subcategories be included?
             */
            ignoreCategoryIncludeSub?: boolean;
            /**
             *  the information to return as the result of the query. By default return the list of matching events
             */
            requestedResult?: RequestEvents;
        }
        export interface IteratorArguments extends Arguments {
            /**
             * how should the resulting events be sorted. Options: 
             *  - none (no specific sorting),
             *  - date (by event date), 
             *  - rel (relevance to the query), 
             *  - size (number of articles),
             *  - socialScore (amount of shares in social media)
             */
            sortBy?: "none" | "rel" | "date" | "size" | "socialScore";
            /**
             * should the results be sorted in ascending order (true) or descending (false)
             */
            sortByAsc?: boolean;
            /**
             * number of events to download at once (we are not downloading event by event)
             */
            eventBatchSize?: number;
            /**
             * maximum number of items to be returned. Used to stop iteration sooner than results run out
             */
            maxItems?: number;
            returnInfo?: ReturnInfo;
        }
        export interface RequestEventsInfoArguments {
            /**
             * page of the results to return (1, 2, ...)
             */
            page?: number;
            /**
             * number of results to return per page
             */
            count?: number;
            /**
             * how should the resulting events be sorted. Options: 
             *  - none (no specific sorting),
             *  - date (by event date), 
             *  - rel (relevance to the query), 
             *  - size (number of articles),
             *  - socialScore (amount of shares in social media)
             */
            sortBy?: "none" |  "rel" | "date" | "size" | "socialScore";
            /**
             * should the results be sorted in ascending order (true) or descending (false)
             */
            sortByAsc?: boolean;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
        export interface RequestEventsUriListArguments {
            /**
             * page of the results to return (1, 2, ...)
             */
            page?: number;
            /**
             * number of results to return per page
             */
            count?: number;
            /**
             * how should the resulting events be sorted. Options: 
             *  - none (no specific sorting),
             *  - date (by event date), 
             *  - rel (relevance to the query), 
             *  - size (number of articles),
             *  - socialScore (amount of shares in social media)
             */
            sortBy?: "none" |  "rel" | "date" | "size" | "socialScore";
            /**
             * should the results be sorted in ascending order (true) or descending (false)
             */
            sortByAsc?: boolean;
        }

        export interface RequestEventsUriWgtListArguments {
            /**
             * page of the results to return (1, 2, ...)
             */
            page?: number;
            /**
             * number of results to return per page
             */
            count?: number;
            /**
             * how should the resulting events be sorted. Options: 
             *  - none (no specific sorting),
             *  - date (by event date), 
             *  - rel (relevance to the query), 
             *  - size (number of articles),
             *  - socialScore (amount of shares in social media)
             */
            sortBy?: "none" | "rel" | "date" | "size" | "socialScore";
            /**
             * should the results be sorted in ascending order (true) or descending (false)
             */
            sortByAsc?: boolean;
        }

        export interface RequestEventsLocAggrArguments {
            /**
             * sample of events to use to compute the location aggregate
             */
            eventsSampleSize?: number;
            /**
             * what details (about locations) should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsLocTimeAggrArguments {
            /**
             * sample of events to use to compute the location aggregate
             */
            eventsSampleSize?: number;
            /**
             * what details (about locations) should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsConceptAggrArguments {
            /**
             * number of top concepts to return
             */
            conceptCount?: number;
            /**
             * on what sample of results should the aggregate be computed
             */
            eventsSampleSize?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
        export interface RequestEventsConceptGraphArguments {
            /**
             * number of top concepts to return
             */
            conceptCount?: number;
            /**
             * number of links between the concepts to return
             */
            linkCount?: number;
            /**
             * on what sample of results should the aggregate be computed
             */
            eventsSampleSize?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsConceptMatrixArguments {
            /**
             * number of top concepts to return
             */
            conceptCount?: number;
            /**
             * how should the interestingness between the selected pairs of concepts be computed. Options: pmi (pointwise mutual information), pairTfIdf (pair frequence * IDF of individual concepts), chiSquare
             */
            measure?: "pmi" | "pairTfIdf" | "chiSquare"
            /**
             * on what sample of results should the aggregate be computed
             */
            eventsSampleSize?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsConceptTrendsArguments {
            /**
             * number of top concepts to return
             */
            conceptCount?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsSourceAggrArguments {
            /**
             * number of top sources to return
             */
            sourceCount?: number;
            /**
             * on what sample of results should the aggregate be computed
             */
            eventsSampleSize?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsDateMentionAggrArguments {
            /**
             * ignore events that don't have a date that is more than this number of days apart from the tested event
             */
            minDaysApart?: number;
            /**
             *  report only dates that are mentioned at least this number of times
             */
            minDateMentionCount?: number;
            /**
             * on what sample of results should the aggregate be computed
             */
            eventsSampleSize?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsEventClustersArguments {
            /**
             * number of keywords to report in each of the clusters 
             */
            keywordCount?: number;
            /**
             * try to cluster at most this number of events
             */
            maxEventsToCluster?: number;
            /**
             * what details about the concepts should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }

        export interface RequestEventsRecentActivityArguments {
            /**
             * max events to return 
             */
            maxEventCount?: number;
            /**
             * the time after which the events were added/updated (returned by previous call to the same method)
             */
            updatesAfterTm?: string | Date;
            /**
             * how many minutes into the past should we check (set either this or updatesAfterTm property, but not both)
             */
            updatesAfterMinsAgo?: number;
            /**
             * return only events that have a geographic location assigned to them
             */
            mandatoryLocation?: boolean;
            /**
             * limit the results to events that are described in the selected language (None if not filtered by any language)
             */
            lang?: string | string[];
            /**
             * the minimum avg cos sim of the events to be returned (events with lower quality should not be included)
             */
            minAvgCosSim?: number;
            /**
             * what details should be included in the returned information
             */
            returnInfo?: ReturnInfo;
        }
    }
    export namespace ReturnInfo {
        interface ArticleInfo {
            bodyLen?: number;
            basicInfo?: boolean;
            title?: boolean;
            body?: boolean;
            url?: boolean;
            eventUri?: boolean;
            concepts?: boolean;
            categories?: boolean;
            videos?: boolean;
            image?: boolean;
            socialScore?: boolean;
            location?: boolean;
            dates?: boolean;
            extractedDates?: boolean;
            duplicateList?: boolean;
            originalArticle?: boolean;
            storyUri?: boolean;
            details?: boolean;
        }
        
        interface ArticleInfoFlags {
            ArticleBodyLen?: number;
            IncludeArticleBasicInfo?: boolean;
            IncludeArticleTitle?: boolean;
            IncludeArticleBody?: boolean;
            IncludeArticleUrl?: boolean;
            IncludeArticleEventUri?: boolean;
            IncludeArticleConcepts?: boolean;
            IncludeArticleCategories?: boolean;
            IncludeArticleVideos?: boolean;
            IncludeArticleImage?: boolean;
            IncludeArticleSocialScore?: boolean;
            IncludeArticleLocation?: boolean;
            IncludeArticleDates?: boolean;
            IncludeArticleExtractedDates?: boolean;
            IncludeArticleDuplicateList?: boolean;
            IncludeArticleOriginalArticle?: boolean;
            IncludeArticleStoryUri?: boolean;
            IncludeArticleDetails?: boolean;
        }
        
        interface StoryInfoFlags {
            IncludeStoryBasicStats?: boolean;
            IncludeStoryLocation?: boolean;
            IncludeStoryCategories?: boolean;
            IncludeStoryDate?: boolean;
            IncludeStoryConcepts?: boolean;
            IncludeStoryTitle?: boolean;
            IncludeStorySummary?: boolean;
            IncludeStoryMedoidArticle?: boolean;
            IncludeStoryCommonDates?: boolean;
            IncludeStorySocialScore?: boolean;
            IncludeStoryDetails?: boolean;
            StoryImageCount?: number;
        }
        
        interface StoryInfo {
            basicStats?: boolean;
            location?: boolean;
            categories?: boolean;
            date?: boolean;
            concepts?: boolean;
            title?: boolean;
            summary?: boolean;
            medoidArticle?: boolean;
            commonDates?: boolean;
            socialScore?: boolean;
            details?: boolean;
            imageCount?: number;
        }
        
        interface EventInfoFlags {
            IncludeEventTitle?: boolean;
            IncludeEventSummary?: boolean;
            IncludeEventArticleCounts?: boolean;
            IncludeEventConcepts?: boolean;
            IncludeEventCategories?: boolean;
            IncludeEventLocation?: boolean;
            IncludeEventDate?: boolean;
            IncludeEventCommonDates?: boolean;
            IncludeEventStories?: boolean;
            IncludeEventSocialScore?: boolean;
            IncludeEventDetails?: boolean;
            EventImageCount?: number;
        }
        
        interface EventInfo {
            title?: boolean;
            summary?: boolean;
            articleCounts?: boolean;
            concepts?: boolean;
            categories?: boolean;
            location?: boolean;
            date?: boolean;
            commonDates?: boolean;
            stories?: boolean;
            socialScore?: boolean;
            details?: boolean;
            imageCount?: number;
        }
        
        interface SourceInfoFlags {
            IncludeSourceTitle?: boolean;
            IncludeSourceDescription?: boolean;
            IncludeSourceLocation?: boolean;
            IncludeSourceRanking?: boolean;
            IncludeSourceImage?: boolean;
            IncludeSourceArticleCount?: boolean;
            IncludeSourceSourceGroups?: boolean;
            IncludeSourceDetails?: boolean;
        }
        
        interface SourceInfo {
            title?: boolean;
            description?: boolean;
            location?: boolean;
            ranking?: boolean;
            image?: boolean;
            articleCount?: boolean;
            sourceGroups?: boolean;
            details?: boolean;
        }
        
        interface CategoryInfoFlags {
            IncludeCategoryParentUri?: boolean;
            IncludeCategoryChildrenUris?: boolean;
            IncludeCategoryTrendingScore?: boolean;
            IncludeCategoryTrendingHistory?: boolean;
            IncludeCategoryDetails?: boolean;
            CategoryTrendingSource?: string | string[];
        }
        
        interface CategoryInfo {
            parentUri?: boolean;
            childrenUris?: boolean;
            trendingScore?: boolean;
            trendingHistory?: boolean;
            details?: boolean;
            trendingSource?: string | string[];
        }
        
        interface ConceptInfoFlags {
            ConceptType?: ConceptType;
            lang?: string | string[];
            IncludeConceptLabel?: boolean;
            IncludeConceptSynonyms?: boolean;
            IncludeConceptImage?: boolean;
            IncludeConceptDescription?: boolean;
            IncludeConceptDetails?: boolean;
            IncludeConceptConceptClassMembership?: boolean;
            IncludeConceptConceptClassMembershipFull?: boolean;
            IncludeConceptTrendingScore?: boolean;
            IncludeConceptTrendingHistory?: boolean;
            IncludeConceptTotalCount?: boolean;
            ConceptTrendingSource?: string | string[];
            MaxConceptsPerType?: number;
        }
        
        interface ConceptInfo {
            type?: ConceptType;
            lang?: string | string[];
            label?: boolean;
            synonyms?: boolean;
            image?: boolean;
            description?: boolean;
            details?: boolean;
            conceptClassMembership?: boolean;
            conceptClassMembershipFull?: boolean;
            trendingScore?: boolean;
            trendingHistory?: boolean;
            totalCount?: boolean;
            trendingSource?: string | string[];
            maxConceptsPerType?: number;
        }
        
        interface LocationInfoFlags {
            label?: boolean;
            wikiUri?: boolean;
            geoNamesId?: boolean;
            population?: boolean;
            geoLocation?: boolean;
            countryArea?: boolean;
            countryDetails?: boolean;
            countryContinent?: boolean;
            placeFeatureCode?: boolean;
            placeCountry?: boolean;
        }
        
        interface LocationInfo {
            label?: boolean;
            wikiUri?: boolean;
            geoNamesId?: boolean;
            population?: boolean;
            geoLocation?: boolean;
            countryArea?: boolean;
            countryDetails?: boolean;
            countryContinent?: boolean;
            placeFeatureCode?: boolean;
            placeCountry?: boolean;
        }
        
        interface ConceptClassInfoFlags {
            IncludeConceptClassParentLabels?: boolean;
            IncludeConceptClassConcepts?: boolean;
            IncludeConceptClassDetails?: boolean;
        }
        
        interface ConceptClassInfo {
            parentLabels?: boolean;
            concepts?: boolean;
            details?: boolean;
        }
        
        interface ConceptFolderInfoFlags {
            IncludeConceptFolderDefinition?: boolean;
            IncludeConceptFolderOwner?: boolean;
            IncludeConceptFolderDetails?: boolean;
        }
        
        interface ConceptFolderInfo {
            definition?: boolean;
            owner?: boolean;
            details?: boolean;
        }
    }

}