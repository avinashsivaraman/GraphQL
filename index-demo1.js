'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`

    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Query {
        video: Video,
        videos: [Video]
    }

    type Schema {
        query: Query
    }

`);

const videos = [
    {
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true,
    },
    {
        id: '2',
        title: 'Foo Boo',
        duration: 180,
        watched: false,
    }
];
const resolvers = {
    video: () => ({
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true,
    }),
    videos: () => videos,

}

const query = `
    query myFirst {
        videos {
            id,
            title
        }
    }
`;

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error));
