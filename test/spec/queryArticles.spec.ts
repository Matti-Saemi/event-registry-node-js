import * as _ from "lodash";
import {
    QueryArticles,
    QueryArticlesIter,
    RequestArticlesCategoryAggr,
    RequestArticlesConceptAggr,
    RequestArticlesConceptMatrix,
    RequestArticlesConceptTrends,
    RequestArticlesInfo,
    RequestArticlesKeywordAggr,
    RequestArticlesSourceAggr,
} from "../../src/index";
import { Utils } from "./utils";

describe("Query Articles", () => {
    const er = Utils.initAPI();
    const utils = new Utils();
    let query: QueryArticles;
    let requestArticlesInfo: RequestArticlesInfo;

    beforeAll(async (done) => {
        query = new QueryArticles({conceptUri: await er.getConceptUri("Obama")});
        requestArticlesInfo = new RequestArticlesInfo({count: 30, returnInfo: utils.returnInfo});
        done();
    });

    it("should return list of articles", async (done) => {
        query.setRequestedResult(requestArticlesInfo);
        const response = await er.execQuery(query);
        expect(response).toBeValidGeneralArticleList();
        done();
    });

    it("should return list of articles with keyword search", async (done) => {
        const q1 = new QueryArticles({keywords: "iphone"});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();

        const q2 = new QueryArticles({keywords: "iphone"});
        q2.setRequestedResult(requestArticlesInfo);
        const res2 = await er.execQuery(q2);
        expect(res2).toBeValidGeneralArticleList();

        const results1 = _.sortBy(res1["articles"]["results"], "id");
        const results2 = _.sortBy(res2["articles"]["results"], "id");
        expect(_.size(results1)).toEqual(_.size(results2), "Keyword search should return responses of the same size");
        done();
    });

    it("should return list of articles with keyword title search ('iphone')", (done) => {
        const q = new QueryArticlesIter(er, {keywords: "iphone", keywordsLoc: "title", returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10});
        q.execQuery((items, errorMessage) => {
            if (errorMessage) {
                console.error(errorMessage);
                done();
            }
            _.each(items, (item) => {
                expect(_.toLower(_.get(item, "title"))).toContain("iphone");
            });
        }, () => {
            done();
        });
    });

    it("should return list of articles with keyword title search ('home')", (done) => {
        const q = new QueryArticlesIter(er, {keywords: "home", keywordsLoc: "title", returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10});
        q.execQuery((items, errorMessage) => {
            if (errorMessage) {
                console.error(errorMessage);
                done();
            }
            _.each(items, (item) => {
                expect(_.toLower(_.get(item, "title"))).toContain("home");
            });
        }, () => {
            done();
        });
    });

    it("should return list of articles with keyword body search ('home')", (done) => {
        const q = new QueryArticlesIter(er, {keywords: "home", keywordsLoc: "body", returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10});
        q.execQuery((items, errorMessage) => {
            if (errorMessage) {
                console.error(errorMessage);
                done();
            }
            _.each(items, (item) => {
                expect(item).toContainBodyText("home");
            });
        }, () => {
            done();
        });
    });

    it("should return list of articles with keyword body search ('jack')", (done) => {
        const q = new QueryArticlesIter(er, {keywords: "jack", keywordsLoc: "body", returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10});
        q.execQuery((items, errorMessage) => {
            if (errorMessage) {
                console.error(errorMessage);
                done();
            }
            _.each(items, (item) => {
               expect(item).toContainBodyText("jack");
            });
        }, () => {
            done();
        });
    });

    it("should return list with publisher search", async (done) => {
        const sourceUri = await er.getNewsSourceUri("bbc");
        const q1 = new QueryArticles({sourceUri});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();
        _.each(_.get(res1, "articles.results"), (article) => {
            expect(_.get(article, "source.uri")).toBe(sourceUri, "Article is not from the specified source");
        });

        const q2 = new QueryArticles({sourceUri});
        q2.setRequestedResult(requestArticlesInfo);
        const res2 = await er.execQuery(q2);
        expect(res2).toBeValidGeneralArticleList();

        const results1 = _.sortBy(res1["articles"]["results"], "id");
        const results2 = _.sortBy(res2["articles"]["results"], "id");
        expect(_.size(results1)).toEqual(_.size(results2), "Publisher search should return responses of the same size");
        expect(_.map(results1, "id")).toEqual(_.map(results2, "id"), "Publisher search should return equal responses");
        done();
    });

    it("should return list with category search", async () => {
        const categoryUri = await er.getCategoryUri("disa");
        const q1 = new QueryArticles({categoryUri});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();

        const q2 = new QueryArticles({categoryUri});
        q2.setRequestedResult(requestArticlesInfo);
        const res2 = await er.execQuery(q2);
        expect(res2).toBeValidGeneralArticleList();

        const results1 = _.sortBy(res1["articles"]["results"], "id");
        const results2 = _.sortBy(res2["articles"]["results"], "id");
        expect(_.size(results1)).toEqual(_.size(results2), "Category search should return responses of the same size");
        expect(_.map(results1, "id")).toEqual(_.map(results2, "id"), "Category search should return equal responses");
    });

    it("should return list with lang search", async (done) => {
        const q1 = new QueryArticles({lang: "deu"});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();
        _.each(_.get(res1, "articles.results"), (article) => {
            expect(_.get(article, "lang")).toBe("deu", "Article is not in the specified language");
        });
        done();
    });

    it("should return list with location search", async (done) => {
        const locationUri = await er.getLocationUri("united");
        const q1 = new QueryArticles({locationUri});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();

        const q2 = new QueryArticles({locationUri});
        q2.setRequestedResult(requestArticlesInfo);
        const res2 = await er.execQuery(q2);
        expect(res2).toBeValidGeneralArticleList();

        const results1 = _.sortBy(res1["articles"]["results"], "id");
        const results2 = _.sortBy(res2["articles"]["results"], "id");
        expect(_.size(results1)).toEqual(_.size(results2), "Location search should return responses of the same size");
        expect(_.map(results1, "id")).toEqual(_.map(results2, "id"), "Location search should return equal responses");
        done();
    });

    it("should return list with combined search", async (done) => {
        const keywords = "germany";
        const lang = ["eng", "deu"];
        const conceptUri = await er.getConceptUri("Merkel");
        const categoryUri = await er.getCategoryUri("Business");

        const q1 = new QueryArticles({keywords, lang, conceptUri, categoryUri});
        q1.setRequestedResult(requestArticlesInfo);
        const res1 = await er.execQuery(q1);
        expect(res1).toBeValidGeneralArticleList();

        const q2 = new QueryArticles({keywords, lang, conceptUri, categoryUri});
        q2.setRequestedResult(requestArticlesInfo);
        const res2 = await er.execQuery(q2);
        expect(res2).toBeValidGeneralArticleList();

        const results1 = _.sortBy(res1["articles"]["results"], "id");
        const results2 = _.sortBy(res2["articles"]["results"], "id");
        expect(_.size(results1)).toEqual(_.size(results2), "Combined search should return responses of the same size");
        expect(_.map(results1, "id")).toEqual(_.map(results2, "id"), "Combined search should return equal responses");
        done();
    });

    it("should return list of concept trends", async (done) => {
        const requestArticlesConceptTrends = new RequestArticlesConceptTrends({count: 5, returnInfo: utils.returnInfo});
        query.setRequestedResult(requestArticlesConceptTrends);
        const response = await er.execQuery(query);
        // Check that we get the expected properties
        expect(_.has(response, "conceptTrends")).toBeTruthy("Expected to get 'conceptTrends'");
        expect(_.has(response, "conceptTrends.trends")).toBeTruthy("Expected to get 'trends' property in conceptTrends");
        expect(_.has(response, "conceptTrends.conceptInfo")).toBeTruthy("Expected to get 'conceptInfo' property in conceptTrends");
        expect(_.size(_.get(response, "conceptTrends.conceptInfo"))).toBe(5, "Expected to get 5 concepts in concept trends");

        const trends = _.get(response, "conceptTrends.trends");
        expect(!_.isEmpty(trends)).toBeTruthy();
        _.each(trends, (trend) => {
            expect(_.has(trend, "date")).toBeTruthy("A trend should have a date");
            expect(_.has(trend, "conceptFreq")).toBeTruthy("A trend should have a conceptFreq");
            expect(_.has(trend, "totArts")).toBeTruthy("A trend should have a totArts property");
            expect(_.size(_.get(trend, "conceptFreq"))).toBeLessThanOrEqual(5, "Concept frequencies should contain 5 elements - one for each concept");
        });

        _.each(_.get(response, "conceptTrends.conceptInfo"), (concept) => {
            expect(concept).toBeValidConcept();
        });
        done();
    });

    it("should return aggregate of concepts of resulting articles", async (done) => {
        const requestArticlesConceptAggr = new RequestArticlesConceptAggr({conceptCount: 50, returnInfo: utils.returnInfo});
        query.setRequestedResult(requestArticlesConceptAggr);
        const response = await er.execQuery(query);

        expect(_.has(response, "conceptAggr")).toBeTruthy("Expected to get 'conceptAggr'");
        const concepts = _.get(response, "conceptAggr.results");
        expect(_.size(concepts)).toEqual(50, "Expected a different number of concepts in 'conceptAggr'");
        _.each(concepts, (concept) => {
            expect(concept).toBeValidConcept();
        });
        done();
    });

    it("should return aggregate of keywords of resulting articles", async (done) => {
        const requestArticlesKeywordAggr = new RequestArticlesKeywordAggr();
        query.setRequestedResult(requestArticlesKeywordAggr);
        const response = await er.execQuery(query);

        expect(_.has(response, "keywordAggr")).toBeTruthy("Expected to get 'keywordAggr'");
        const keywords = _.get(response, "keywordAggr.results", []);
        expect(_.size(keywords)).toBeGreaterThan(0, "Expected to get some keywords");
        _.each(keywords, (keyword) => {
            expect(_.has(keyword, "keyword")).toBeTruthy("Expected a keyword property");
            expect(_.has(keyword, "weight")).toBeTruthy("Expected a weight property");
        });
        done();
    });

    it("should return aggregate of categories of resulting articles", async (done) => {
        const requestArticlesCategoryAggr = new RequestArticlesCategoryAggr({returnInfo: utils.returnInfo});
        query.setRequestedResult(requestArticlesCategoryAggr);
        const response = await er.execQuery(query);

        expect(_.has(response, "categoryAggr")).toBeTruthy("Expected to get 'categoryAggr'");
        const categories = _.get(response, "categoryAggr.results", []);
        expect(_.size(categories)).toBeGreaterThan(0, "Expected to get a non empty category aggregates");
        _.each(categories, (category) => {
            expect(category).toBeValidCategory();
        });
        done();
    });

    it("should return concept matrix of resulting articles", async (done) => {
        const requestArticlesConceptMatrix = new RequestArticlesConceptMatrix({conceptCount: 20, returnInfo: utils.returnInfo});
        query.setRequestedResult(requestArticlesConceptMatrix);
        const response = await er.execQuery(query);

        expect(_.has(response, "conceptMatrix")).toBeTruthy("Expected to get 'conceptMatrix'");
        const matrix = _.get(response, "conceptMatrix");
        expect(_.has(matrix, "sampleSize")).toBeTruthy("Expecting 'sampleSize' property in conceptMatrix");
        expect(_.has(matrix, "freqMatrix")).toBeTruthy("Expecting 'freqMatrix' property in conceptMatrix");
        expect(_.has(matrix, "concepts")).toBeTruthy("Expecting 'concepts' property in conceptMatrix");
        expect(_.size(_.get(matrix, "concepts"))).toEqual(20, "Expected 20 concepts");
        _.each(_.get(matrix, "concepts"), (concept) => {
            expect(concept).toBeValidConcept();
        });
        done();
    });

    it("should aggregate of sources of resulting articles", async (done) => {
        const requestArticlesSourceAggr = new RequestArticlesSourceAggr({returnInfo: utils.returnInfo});
        query.setRequestedResult(requestArticlesSourceAggr);
        const response = await er.execQuery(query);

        expect(_.has(response, "sourceAggr")).toBeTruthy("Expected to get 'sourceAggr'");
        _.each(_.get(response, "sourceAggr.results"), (sourceInfo) => {
            expect(_.get(sourceInfo, "source")).toBeValidSource();
            expect(_.has(sourceInfo, "counts")).toBeTruthy("Source info should contain counts object");
            expect(_.has(sourceInfo, "counts.frequency")).toBeTruthy("Counts should contain a frequency");
            expect(_.has(sourceInfo, "counts.ratio")).toBeTruthy("Counts should contain a ratio");
        });
        done();
    });

    it("should test query articles iterator (1)", async (done) => {
        const keywords = "trump";
        const conceptUri = await er.getConceptUri("Obama");
        const q = new QueryArticlesIter(er, { keywords, conceptUri, maxItems: 150, articleBatchSize: 50});
        let articlesSize = 0;
        q.execQuery((items) => {
            articlesSize += _.size(items);
        }, async () => {
            const q2 = new QueryArticles({keywords, conceptUri});
            const requestArticlesInfo2 = new RequestArticlesInfo({count: 150});
            q2.setRequestedResult(requestArticlesInfo2);
            const response = await er.execQuery(q2);
            expect(_.size(_.get(response, "articles.results"))).toEqual(articlesSize);
            done();
        });
    });

    it("should test query articles iterator (2)", async (done) => {
        const keywords = "trump";
        const conceptUri = await er.getConceptUri("Obama");
        const sourceUri = await er.getNewsSourceUri("bbc");
        const q = new QueryArticlesIter(er, { keywords, conceptUri, sourceUri, returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10 });
        q.execQuery((items, error) => {
           _.each(items, (item) => {
               expect(item).toContainConcept(conceptUri);
               expect(item).toContainSource(sourceUri);
               expect(item).toContainBodyText("trump");
           });
        }, () => {
            done();
        });
    });

    it("should test query articles iterator (3)", async (done) => {
        const keywords = "trump";
        const conceptUri = await er.getConceptUri("Obama");
        const sourceUri = await er.getNewsSourceUri("bbc");
        const categoryUri = await er.getCategoryUri("business");
        const q = new QueryArticlesIter(er, { conceptUri, sourceUri, categoryUri, returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10 });
        q.execQuery((items, error) => {
           _.each(items, (item) => {
               expect(item).toContainConcept(conceptUri);
               expect(item).toContainSource(sourceUri);
               expect(item).toContainCategory(categoryUri);
           });
        }, () => {
            done();
        });
    });

    it("should test query articles iterator (4)", async (done) => {
        const conceptUri = await er.getConceptUri("Obama");
        const ignoreConceptUri = [await er.getConceptUri("politics"), await er.getConceptUri("china"), await er.getConceptUri("united states")];
        const ignoreKeywords = ["trump", "politics", "michelle"];
        const ignoreSourceUri = [await er.getNewsSourceUri("daily caller"), await er.getNewsSourceUri("aawsat"), await er.getNewsSourceUri("svodka")];
        const ignoreCategoryUri = [await er.getCategoryUri("business"), await er.getCategoryUri("politics")];
        const q = new QueryArticlesIter(er, { conceptUri, ignoreConceptUri, ignoreKeywords, ignoreSourceUri, ignoreCategoryUri, returnInfo: utils.returnInfo, maxItems: 50, articleBatchSize: 10 });
        q.execQuery((items, error) => {
            _.each(items, (item) => {
                expect(item).toContainConcept(conceptUri);
                _.each(ignoreConceptUri, (uri) => {
                    expect(item).not.toContainConcept(uri);
                });
                _.each(ignoreKeywords, (text) => {
                    expect(item).not.toContainBodyText(text);
                });
                _.each(ignoreSourceUri, (uri) => {
                    expect(item).not.toContainSource(uri);
                });
                _.each(ignoreCategoryUri, (uri) => {
                    expect(item).not.toContainCategory(uri);
                });
            });
        }, () => {
            done();
        });
    });

});