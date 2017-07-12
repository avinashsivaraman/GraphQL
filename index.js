'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { 
    GraphQLSchema, 
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,  
} = require('graphql');

const { 
    getVideoById,
    getAllVideos,
    createVideo,
} = require('./src/data');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video from GraphQL',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video',
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video',
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video',
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether they watched or not',
        }
    }
})
const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
           type: videoType,
           args: {
               id: {
                   type: new GraphQLNonNull(GraphQLID),
                   description: 'The id of the video',
               }
           },
           resolve: (_, args) => {
               return getVideoById(args.id);
           } 
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: getAllVideos,
        }
    }
});

const videoInputType = new GraphQLInputObjectType({
    name: 'videoInputType',
    description: 'Root video Input type',
    fields:{
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the video',
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The duration of the video( in seconds),'
        },
        watched: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Whether or not the video is watched',
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root Mutaton type',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                video: {
                    type: new GraphQLNonNull(videoInputType),
                    description: 'This is the video type'
                }
            },
            resolve: (_, args) => {
                return createVideo(args.video);
            }
        }
    }
});
const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})


