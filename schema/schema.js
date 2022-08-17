// const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLFloat } = require('graphql');
const Video = require('../models/Video');

// TYPES
const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    duration: { type: GraphQLInt },
    // instance: { 
    //   type: InstanceType,
    //   resolve(parent, args) {
    //     return Instance.findB
    //   } }
  })
});

const InstanceType = new GraphQLObjectType({
  name: 'Instance',
  fields: () => ({
    host: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    title: { type: GraphQLString }
  })
});

// QUERIES 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    videos: {
      type: new GraphQLList(VideoType),
      resolve(parent, args) {
        return Video.find().limit(12);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});