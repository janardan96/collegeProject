const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
});

// prepare documents data
const documents = [
    { id: '1000001', content: 'Why studying javascript is fun?', type: "Stuudent" },
    { id: '1000002', content: 'The trend for javascript in machine learning', type: "Stuudent" },
    { id: '1000003', content: 'The most insightful stories about JavaScript', type: "Stuudent" },
    { id: '1000004', content: 'Introduction to Machine Learning', type: "Stuudent" },
    { id: '1000005', content: 'Machine learning and its application', type: "Stuudent" },
    { id: '1000006', content: 'Python vs Javascript, which is better?', type: "Stuudent" },
    { id: '100000asa', content: 'How Python saved my life?', type: "Stuudent" },
    { id: '1000008', content: 'The future of Bitcoin technology', type: "Stuudent" },
    { id: '1000009', content: 'Is it possible to use javascript for machine learning?', type: "Stuudent" }
];

// start training
recommender.train(documents);

//get top 10 similar items to document 1000002
const similarDocuments = recommender.getSimilarDocuments('100000asa', 0, 2);

console.log(similarDocuments);