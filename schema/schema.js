const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");
// MODELS
const Video = require("../models/Video");
const Instance = require("../models/Instance");

// TYPES
const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    duration: { type: GraphQLInt },
    thumbnailImg: { type: GraphQLString },
    instance: { type: InstanceType,
                resolve(parent, args) {
                  return Instance.findOne({host: parent.instance})
                }  }
    // instance: {
    //   type: InstanceType,
    //   resolve(parent, args) {
    //     return Instance.findB
    //   } }
  }),
});

const InstanceType = new GraphQLObjectType({
  name: "Instance",
  fields: () => ({
    host: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    title: { type: GraphQLString },
  }),
});

// QUERIES
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    videos: {
      type: new GraphQLList(VideoType),
      resolve(parent, args) {
        // return Video.find().limit(12);
        return Video.aggregate([{ $sample: { size: 12 } }]);
      },
    },
    instance: {
      type: InstanceType,
      args: { host: { type: GraphQLString } },
      resolve(parent, args) {
        return Instance.findOne({ host: args.host })
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
